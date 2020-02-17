package xyz.bobby.unispring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import xyz.bobby.unispring.exception.NotLoggedInException;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.exception.UnauthorizedException;
import xyz.bobby.unispring.model.Module;
import xyz.bobby.unispring.model.User;
import xyz.bobby.unispring.repository.ModuleRepository;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
public class ModuleController {
	@Autowired
	private ModuleRepository moduleRepository;

	@GetMapping("/modules")
	public List<Module> getModules() {
		return moduleRepository.findAll();
	}

	@PostMapping(value = "/modules", consumes = MediaType.ALL_VALUE)
	public Module createModule(@Valid @RequestBody Module module, HttpServletRequest req)
			throws NotLoggedInException, UnauthorizedException {
		// Only staff can create new modules
		AuthController.verifyRole(req, User.Role.STAFF);
		User user = AuthController.getSessionUser(req);
		module.setCoordinatorId(user.getId());

		return moduleRepository.save(module);
	}

	@GetMapping(value = "/modules/{id}")
	public Module getModule(@PathVariable("id") int id) throws ResourceNotFoundException {
		return moduleRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(Module.class.getSimpleName(), id));
	}

	@GetMapping(value = "/modules/{id}/enrol/")
	public void enrolModule(@PathVariable("id") int id, HttpServletRequest req)
			throws ResourceNotFoundException, NotLoggedInException, UnauthorizedException {
		setModuleEnrolled(id, true, req);
	}

	@GetMapping(value = "/modules/{id}/unenrol/")
	public void unenrolModule(@PathVariable("id") int id, HttpServletRequest req)
			throws ResourceNotFoundException, NotLoggedInException, UnauthorizedException {
		setModuleEnrolled(id, false, req);
	}

	private void setModuleEnrolled(int id, boolean enrolled, HttpServletRequest req)
			throws NotLoggedInException, UnauthorizedException, ResourceNotFoundException {
		// Only students can enrol in modules
		AuthController.verifyRole(req, User.Role.STUDENT);

		User user = AuthController.getSessionUser(req);

		Module module = moduleRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(Module.class.getSimpleName(), id));


		if (enrolled) {
			module.getEnrolledStudents().add(user.getId());
		} else {
			module.getEnrolledStudents().remove(user.getId());
		}
		moduleRepository.save(module);
	}
}
