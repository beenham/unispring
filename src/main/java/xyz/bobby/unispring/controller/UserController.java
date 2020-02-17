package xyz.bobby.unispring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.model.User;
import xyz.bobby.unispring.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserRepository userRepository;

	@GetMapping()
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	@GetMapping(value = "/{id}")
	public User getUser(@PathVariable("id") int id) throws ResourceNotFoundException {
		return userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(User.class.getSimpleName(), id));
	}
}
