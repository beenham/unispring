package xyz.bobby.unispring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class UnispringApplication {
	public static void main(String[] args) {
		SpringApplication.run(UnispringApplication.class, args);
	}
}
