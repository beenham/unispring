package xyz.bobby.unispring.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Year;
import java.util.Set;

@Entity
@IdClass(Grade.Key.class)
@Table(name = "grades")
public class Grade {
	@Id
	@ManyToOne(optional = false)
	@Getter @Setter
	private Module module;

	@Id
	@ManyToOne(optional = false)
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

	public Grade(User user, Module module) {
		this.user = user;
		this.module = module;
	}

	public enum LetterGrade {
		A, B, C, D, E, F
	}
}
