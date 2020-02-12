package xyz.bobby.unispring.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class AuthController {
	@PostMapping("/auth/register")
	public String register(HttpServletRequest req) {
		return "register";
	}

	@PostMapping("/auth/login")
	public String login(HttpServletRequest req) {
		return "login";
	}

	@GetMapping("/auth/logout")
	public String logout(HttpServletRequest req) {
		req.getSession().invalidate();
		return "logout";
	}
}
