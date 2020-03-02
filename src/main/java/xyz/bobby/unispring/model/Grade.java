package xyz.bobby.unispring.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
@Entity
@IdClass(Grade.Key.class)
@Table(name = "grades")
public class Grade {
	@Id
	@ManyToOne(optional = false)
	@JsonIgnoreProperties({"students", "grades"})
	private Module module;

	@Id
	@ManyToOne(optional = false)
	@JsonIgnoreProperties({"modules", "grades"})
	private Student student;

	public static class Key implements Serializable {
		public Student student;
		public Module module;

		public Key() {}

		public Key(Student student, Module module) {
			this.student = student;
			this.module = module;
		}
	}

	private String comment;

	@NotBlank
	private int percent;

	@NotBlank
	private LetterGrade grade;

	public Grade() {}

	public Grade(Student student, Module module) {
		this.student = student;
		this.module = module;
		this.grade = LetterGrade.A;
	}

	public enum LetterGrade {
		A, B, C, D, E, F
	}
}
