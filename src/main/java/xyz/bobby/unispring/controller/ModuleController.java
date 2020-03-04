package xyz.bobby.unispring.controller;

import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.bobby.unispring.exception.ModuleUnavailableException;
import xyz.bobby.unispring.exception.NotLoggedInException;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.exception.UnauthorizedException;
import xyz.bobby.unispring.model.Grade;
import xyz.bobby.unispring.model.Module;
import xyz.bobby.unispring.model.Staff;
import xyz.bobby.unispring.model.Student;
import xyz.bobby.unispring.model.Topic;
import xyz.bobby.unispring.model.User;
import xyz.bobby.unispring.repository.GradeRepository;
import xyz.bobby.unispring.repository.ModuleRepository;
import xyz.bobby.unispring.repository.TopicRepository;
import xyz.bobby.unispring.repository.UserRepository;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {
	@Autowired
	private ModuleRepository moduleRepository;
	@Autowired
	private TopicRepository topicRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private GradeRepository gradeRepository;

	@GetMapping()
	public List<Module> getModules() {
		return moduleRepository.findAll();
	}

	@PostMapping(consumes = MediaType.ALL_VALUE)
	public Module createModule(@Valid @RequestBody Module module, HttpServletRequest req)
			throws NotLoggedInException, UnauthorizedException {
		// Only staff can create new modules
		AuthController.verifyRole(req, Staff.class);
		User user = AuthController.getSessionUser(req);
		module.setCoordinator((Staff) user);

		return moduleRepository.save(module);
	}

	@GetMapping(value = "/{id}")
	public Module getModule(@PathVariable int id) throws ResourceNotFoundException {
		return moduleRepository.getModule(id);
	}

	@GetMapping(value = "/{id}/students")
	public Set<Student> getEnrolledStudents(@PathVariable int id) throws ResourceNotFoundException {
		return moduleRepository.getModule(id).getStudents();
	}

	@GetMapping(value = "/{id}/grades")
	public Set<Grade> getGrades(@PathVariable int id) throws ResourceNotFoundException {
		return moduleRepository.getModule(id).getGrades();
	}

	private static class GradeParams {
		@Setter Integer percent;
		@Setter String comment;
	}

	@GetMapping(value = "/{id}/grades/{sid}")
	public Grade getStudentGrade(@PathVariable int id, @PathVariable("sid") int sId, HttpServletRequest req)
		throws ResourceNotFoundException, NotLoggedInException, UnauthorizedException {
		// Verify correct student ID or role
		try {
			AuthController.verifyId(req, sId);
		} catch (UnauthorizedException e) {
			AuthController.verifyRole(req, Staff.class);
		}

		Module module = moduleRepository.getModule(id);
		Student student = (Student) userRepository.getUser(sId);

		return gradeRepository.getGrade(student, module);
	}

	@PostMapping(value = "/{id}/grades/{sid}")
	public void setStudentGrade(@PathVariable int id, @PathVariable("sid") int sId,
			@Valid @RequestBody GradeParams params, HttpServletRequest req)
			throws ResourceNotFoundException, NotLoggedInException, UnauthorizedException {
		AuthController.verifyRole(req, Staff.class);

		Module module = moduleRepository.getModule(id);
		User user = userRepository.getUser(sId);

		// Ensure user is enrolled in module
		if (!module.getStudents().contains(user))
			throw new ResourceNotFoundException(User.class.getSimpleName(), sId); // TODO: Not enrolled exception

		Student student = (Student) user;
		// Get existing grade entry or create new
		Grade grade = gradeRepository.findById(new Grade.Key(student, module)).orElseGet(() -> new Grade(student, module));
		if (params.percent != null) grade.setPercent(params.percent);
		if (params.comment != null) grade.setComment(params.comment);
		gradeRepository.save(grade);
	}

	@GetMapping(value = "/{id}/topics")
	public List<Topic> getTopics(@PathVariable int id) throws ResourceNotFoundException {
		return moduleRepository.getModule(id).getTopics();
	}

	@PostMapping(value = "/{id}/topics/{tId}", consumes = MediaType.ALL_VALUE)
	public Topic addTopic(@PathVariable("id") int id, @PathVariable("tId") int tId, HttpServletRequest req)
			throws NotLoggedInException, UnauthorizedException, ResourceNotFoundException {
		AuthController.verifyRole(req, Staff.class);

		Module module = moduleRepository.getModule(id);
		AuthController.verifyId(req, module.getCoordinator().getId());

		Topic topic = topicRepository.getTopic(tId);

		if (module.getTopics().contains(topic)) return topic;

		module.getTopics().add(topic);
		moduleRepository.save(module);
		return topic;
	}

	@DeleteMapping(value = "/{id}/topics/{tId}")
	public void removeTopic(@PathVariable("id") int id, @PathVariable("tId") int tId, HttpServletRequest req)
			throws NotLoggedInException, UnauthorizedException, ResourceNotFoundException {
		AuthController.verifyRole(req, Staff.class);

		Module module = moduleRepository.getModule(id);
		AuthController.verifyId(req, module.getCoordinator().getId());

		Topic topic = topicRepository.getTopic(tId);
		if (!module.getTopics().contains(topic))
			throw new ResourceNotFoundException(Topic.class.getSimpleName(), tId);

		module.getTopics().remove(topic);
		moduleRepository.save(module);
	}

	@GetMapping(value = "/{id}/enrol")
	public void enrolModule(@PathVariable int id, HttpServletRequest req)
			throws ResourceNotFoundException, NotLoggedInException, UnauthorizedException, ModuleUnavailableException {
		setModuleEnrolled(id, true, req);
	}

	@GetMapping(value = "/{id}/unenrol")
	public void unenrolModule(@PathVariable int id, HttpServletRequest req)
			throws ResourceNotFoundException, NotLoggedInException, UnauthorizedException, ModuleUnavailableException {
		setModuleEnrolled(id, false, req);
	}

	private void setModuleEnrolled(int id, boolean enrol, HttpServletRequest req)
			throws NotLoggedInException, UnauthorizedException, ResourceNotFoundException, ModuleUnavailableException {
		// Only students can enrol in modules
		AuthController.verifyRole(req, Student.class);

		Student student = (Student) AuthController.getSessionUser(req);
		Module module = moduleRepository.getModule(id);

		// If current enrollment status equals requested, ignore
		if (module.getStudents().contains(student) == enrol) return;

		if (module.getStatus() == Module.Status.TERMINATED || (module.getStatus() == Module.Status.FULL && enrol))
			throw new ModuleUnavailableException(module.getStatus(), id);

		if (enrol) {
			module.getStudents().add(student);
		} else {
			module.getStudents().remove(student);
		}

		module.setStatus(module.getStudents().size() < module.getCapacity()
				? Module.Status.AVAILABLE : Module.Status.FULL);
		student.getModules().add(module);
		userRepository.save(student);
		moduleRepository.save(module);
	}
}
