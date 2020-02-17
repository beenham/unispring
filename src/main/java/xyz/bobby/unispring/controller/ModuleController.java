package xyz.bobby.unispring.controller;

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
import xyz.bobby.unispring.model.Module;
import xyz.bobby.unispring.model.Topic;
import xyz.bobby.unispring.model.User;
import xyz.bobby.unispring.repository.ModuleRepository;
import xyz.bobby.unispring.repository.TopicRepository;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/modules")
public class ModuleController {
	@Autowired
	private ModuleRepository moduleRepository;
	@Autowired
	private TopicRepository topicRepository;

	@GetMapping()
	public List<Module> getModules() {
		return moduleRepository.findAll();
	}

	@PostMapping(consumes = MediaType.ALL_VALUE)
	public Module createModule(@Valid @RequestBody Module module, HttpServletRequest req)
			throws NotLoggedInException, UnauthorizedException {
		// Only staff can create new modules
		AuthController.verifyRole(req, User.Role.STAFF);
		User user = AuthController.getSessionUser(req);
		module.setCoordinatorId(user.getId());

		return moduleRepository.save(module);
	}

	@GetMapping(value = "/{id}")
	public Module getModule(@PathVariable int id) throws ResourceNotFoundException {
		return moduleRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(Module.class.getSimpleName(), id));
	}

	@GetMapping(value = "/{id}/topics")
	public List<Topic> getTopics(@PathVariable int id) throws ResourceNotFoundException {
		Module module = getModule(id);
		return topicRepository.findAllById(module.getTopics());
	}

	@PostMapping(value = "/{id}/topics", consumes = MediaType.ALL_VALUE)
	public Topic addTopic(@Valid @RequestBody Topic topic, @PathVariable("id") int id, HttpServletRequest req)
			throws NotLoggedInException, UnauthorizedException, ResourceNotFoundException {
		// Only staff can modify modules
		AuthController.verifyRole(req, User.Role.STAFF);

		Module module = getModule(id);
		topic = topicRepository.save(topic);
		module.getTopics().add(topic.getId());
		moduleRepository.save(module);

		return topic;
	}

	@GetMapping(value = "/{id}/topics/{tId}")
	public Topic getTopic(@PathVariable int id, @PathVariable int tId) throws ResourceNotFoundException {
		Module module = getModule(id);
		if (!module.getTopics().contains(tId))
			throw new ResourceNotFoundException(Topic.class.getSimpleName(), id);
		return topicRepository.findById(tId)
				.orElseThrow(() -> new ResourceNotFoundException(Topic.class.getSimpleName(), id));
	}

	@DeleteMapping(value = "/{id}/topics/{tId}")
	public void removeTopic(@PathVariable("id") int id, @PathVariable("tId") int tId, HttpServletRequest req)
			throws NotLoggedInException, UnauthorizedException, ResourceNotFoundException {
		AuthController.verifyRole(req, User.Role.STAFF); // Todo: Verify module coordinator to edit module
		Module module = getModule(id);
		if (!module.getTopics().contains(tId))
			throw new ResourceNotFoundException(Topic.class.getSimpleName(), tId);
		module.getTopics().remove(tId);
		moduleRepository.save(module);
		topicRepository.deleteById(tId);
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

	private void setModuleEnrolled(int id, boolean enrolled, HttpServletRequest req)
			throws NotLoggedInException, UnauthorizedException, ResourceNotFoundException, ModuleUnavailableException {
		// Only students can enrol in modules
		AuthController.verifyRole(req, User.Role.STUDENT);

		User user = AuthController.getSessionUser(req);

		Module module = moduleRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(Module.class.getSimpleName(), id));

		if (module.getStatus() == Module.Status.TERMINATED || enrolled && module.getStatus() == Module.Status.FULL)
			throw new ModuleUnavailableException(module.getStatus(), id);

		if (enrolled) {
			module.getEnrolledStudents().add(user.getId());
			if (module.getEnrolledStudents().size() == module.getCapacity())
				module.setStatus(Module.Status.FULL);
		} else {
			module.getEnrolledStudents().remove(user.getId());
			if (module.getStatus() == Module.Status.FULL)
				module.setStatus(Module.Status.AVAILABLE);
		}
		moduleRepository.save(module);
	}
}
