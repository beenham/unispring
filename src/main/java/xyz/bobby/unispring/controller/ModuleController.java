package xyz.bobby.unispring.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import xyz.bobby.unispring.exception.ModuleUnavailableException;
import xyz.bobby.unispring.exception.NotLoggedInException;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.exception.UnauthorizedException;
import xyz.bobby.unispring.model.Student;
import xyz.bobby.unispring.model.View;
import xyz.bobby.unispring.repository.ModuleRepository;
import xyz.bobby.unispring.model.Module;
import xyz.bobby.unispring.repository.StudentRepository;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Set;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {
	@Autowired
	private ModuleRepository moduleRepository;
	@Autowired
	private StudentRepository studentRepository;

	@GetMapping(value = "/year/{year}")
	@JsonView(View.Public.class)
	public List<Module> getModulesByYear(@PathVariable int year) {
		return moduleRepository.findByYear(year);
	}

	@GetMapping(value = "/code/{code}")
	@JsonView(View.ExtendedPublic.class)
	public List<Module> getModulesByCode(@PathVariable String code) {
		return moduleRepository.findByCode(code);
	}

	@GetMapping(value = "/enrolled")
	@JsonView(View.Public.class)
	public Set<Module> getEnrolledModules(HttpServletRequest req) throws NotLoggedInException, UnauthorizedException {
		Student student = AuthController.requireRole(req, Student.class);
		student = studentRepository.getOne(student.getId());
		return student.getModules();
	}

	@GetMapping(value = "/{id}")
	@JsonView(View.ExtendedPublic.class)
	public Module getModule(@PathVariable int id) throws ResourceNotFoundException {
		return moduleRepository.getModule(id);
	}

	@PutMapping(value = "/{id}/enrolment")
	@JsonView(View.ExtendedPublic.class)
	public void enrolModule(HttpServletRequest req, @PathVariable int id) throws ResourceNotFoundException, NotLoggedInException, ModuleUnavailableException, UnauthorizedException {
		setModuleEnrolled(req, id, true);
	}

	@DeleteMapping(value = "/{id}/enrolment")
	@JsonView(View.ExtendedPublic.class)
	public void unenrolModule(HttpServletRequest req, @PathVariable int id) throws ResourceNotFoundException, NotLoggedInException, ModuleUnavailableException, UnauthorizedException {
		setModuleEnrolled(req, id, false);
	}

	private void setModuleEnrolled(HttpServletRequest req, int id, boolean enrol)
			throws NotLoggedInException, UnauthorizedException, ResourceNotFoundException, ModuleUnavailableException {
		// Only students can enrol in modules
		Student student = AuthController.requireRole(req, Student.class);
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
		moduleRepository.save(module);

		AuthController.refreshSessionUser(req);
	}
}
