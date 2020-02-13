package xyz.bobby.unispring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.model.Module;
import xyz.bobby.unispring.repository.ModuleRepository;

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
	public Module createModule(@Valid @RequestBody Module module) {
		return moduleRepository.save(module);
	}

	@GetMapping(value = "/modules/{id}")
	public Module getModule(@PathVariable("id") int id) throws ResourceNotFoundException {
		return moduleRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(Module.class.getSimpleName(), id));
	}

	@GetMapping(value = "/modules/{id}/enrol/")
	public void enrolModule(@PathVariable("id") int id)
			throws ResourceNotFoundException {

		Module module = moduleRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(Module.class.getSimpleName(), id));


	}
}
