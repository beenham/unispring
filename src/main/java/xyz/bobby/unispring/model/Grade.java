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

	public Grade(Student student, Module module, int percent) {
		this.student = student;
		this.module = module;
		setPercent(percent);
	}

	public Grade(Student student, Module module, LetterGrade grade) {
		this.student = student;
		this.module = module;
		setGrade(grade);
	}

	public void setPercent(int percent) {
		this.percent = percent;
		if (percent < 30)
			this.grade = LetterGrade.F;
		else if (percent < 40)
			this.grade = LetterGrade.E;
		else if (percent < 55)
			this.grade = LetterGrade.D;
		else if (percent < 70)
			this.grade = LetterGrade.C;
		else if (percent < 85)
			this.grade = LetterGrade.B;
		else
			this.grade = LetterGrade.A;
	}

	public void setGrade(LetterGrade grade) {
		switch (grade) {
			case A:
				setPercent(90);
				break;
			case B:
				setPercent(75);
				break;
			case C:
				setPercent(60);
				break;
			case D:
				setPercent(45);
				break;
			case E:
				setPercent(35);
				break;
			default:
				setPercent(25);
		}
	}

	public enum LetterGrade {
		A, B, C, D, E, F
	}
}
