package xyz.bobby.unispring.controller;

import lombok.Setter;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import xyz.bobby.unispring.exception.LoginException;
import xyz.bobby.unispring.model.User;
import xyz.bobby.unispring.repository.UserRepository;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
public class AuthController {
	@Autowired
	private UserRepository userRepository;

	@PostMapping(value = "/auth/register", consumes = MediaType.ALL_VALUE)
	public User register(@Valid @RequestBody User user) {
		user.setPasswordHash(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
		return userRepository.save(user);
	}

	private static class LoginParams {
		@Setter
		String emailAddress;
		@Setter
		String password;
	}

	@PostMapping(value = "/auth/login", consumes = MediaType.ALL_VALUE)
	public User login(@Valid @RequestBody LoginParams loginParams, HttpServletRequest req) throws LoginException {
		User user = userRepository.findByEmailAddressIgnoreCase(loginParams.emailAddress)
				.orElseThrow(LoginException::new);

		boolean correct = BCrypt.checkpw(loginParams.password, user.getPasswordHash());
		if (!correct) throw new LoginException();

		return user;
	}

	@GetMapping("/auth/logout")
	public String logout(HttpServletRequest req) {
		req.getSession().invalidate();
		return "logout";
	}
}
