package xyz.bobby.unispring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
public class UnispringApplication {
	@RequestMapping("/")
	String home() {
		return "Hello there";
	}

	public static void main(String[] args) {
		SpringApplication.run(UnispringApplication.class, args);
	}

}
