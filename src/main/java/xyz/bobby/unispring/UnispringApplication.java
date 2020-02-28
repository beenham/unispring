package xyz.bobby.unispring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("xyz.bobby.unispring.repository")
public class UnispringApplication {

	public static void main(String[] args) {
		SpringApplication.run(UnispringApplication.class, args);
	}
}
