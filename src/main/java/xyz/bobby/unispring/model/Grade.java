package xyz.bobby.unispring.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Entity
@IdClass(Grade.Key.class)
@Table(name = "grades")
public class Grade {
	@Id
	@ManyToOne(optional = false)
	@JsonIgnoreProperties({"students", "grades"})
	@Getter @Setter
	private Module module;

	@Id
	@ManyToOne(optional = false)
	@JsonIgnoreProperties({"modules", "grades"})
	@Getter @Setter
	private User user;

	public static class Key implements Serializable {
		public User user;
		public Module module;

		public Key() {

		}

		public Key(User user, Module module) {
			this.user = user;
			this.module = module;
		}
	}

	@Getter @Setter
	private String comment;

	@NotBlank
	@Getter @Setter
	private int percent;

	@NotBlank
	@Getter @Setter
	private LetterGrade grade;

	public Grade() {}

	public Grade(User user, Module module) {
		this.user = user;
		this.module = module;
		this.grade = LetterGrade.A;
	}

	public enum LetterGrade {
		A, B, C, D, E, F
	}
}
