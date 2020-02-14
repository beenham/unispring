package xyz.bobby.unispring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.model.User;
import xyz.bobby.unispring.repository.UserRepository;

import javax.validation.Valid;
import java.util.List;

@RestController
public class UserController {
	@Autowired
	private UserRepository userRepository;

	@GetMapping("/users")
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	@GetMapping(value = "/users/{id}")
	public User getUser(@PathVariable("id") int id) throws ResourceNotFoundException {
		return userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(User.class.getSimpleName(), id));
	}
}
