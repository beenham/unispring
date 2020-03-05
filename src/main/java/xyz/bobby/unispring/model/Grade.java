package xyz.bobby.unispring.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Objects;

@Data
@Entity
@IdClass(Grade.Key.class)
@Table(name = "grades")
public class Grade {
	@Id
	@ManyToOne(optional = false)
	private Module module;

	@Id
	@ManyToOne(optional = false)
	private Student student;

	public static class Key implements Serializable {
		public Student student;
		public Module module;

		public Key() {}

		public Key(Student student, Module module) {
			this.student = student;
			this.module = module;
		}

		@Override
		public int hashCode() {
			return Objects.hash(this.student, this.module);
		}

		@Override
		public boolean equals(Object obj) {
			if (!(obj instanceof Key)) return false;
			Key other = (Key) obj;
			return other.student == this.student && other.module == this.module;
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
