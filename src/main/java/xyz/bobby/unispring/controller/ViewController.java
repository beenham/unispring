package xyz.bobby.unispring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
	@GetMapping(value = {"/", "/modules/**", "/dashboard/**"})
	public String home() {
		return "index";
	}
}
