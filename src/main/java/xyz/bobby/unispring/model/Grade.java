package xyz.bobby.unispring.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

@Data
@Entity
@Table(name = "grades")
public class Grade {
	@EmbeddedId
	private Grade.Key id;

	@ManyToOne
	@JoinColumn(name = "student_id")
	@MapsId("student_id")
	private Student student;

	@ManyToOne
	@JoinColumn(name = "module_id")
	@MapsId("module_id")
	private Module module;

	@Embeddable
	public static class Key implements Serializable {
		@Column(name = "student_id")
		public int studentId;
		@Column(name = "module_id")
		public int moduleId;

		public Key() {}

		public Key(int student, int module) {
			this.studentId = student;
			this.moduleId = module;
		}

		@Override
		public int hashCode() {
			return Objects.hash(studentId, moduleId);
		}

		@Override
		public boolean equals(Object obj) {
			if (obj instanceof Grade.Key) {
				Grade.Key other = (Grade.Key) obj;
				return this.studentId == other.studentId && this.moduleId == other.moduleId;
			}
			return false;
		}
	}

	private String comment;

	@NotNull
	private int percent;

	@Enumerated(EnumType.STRING)
	@NotNull
	private LetterGrade grade;

	public Grade() {}

	public Grade(Student student, Module module, int percent) {
		this.student = student;
		this.module = module;
		this.id = new Grade.Key(student.getId(), module.getId());
		setPercent(percent);
	}

	public Grade(Student student, Module module, LetterGrade grade) {
		this.student = student;
		this.module = module;
		this.id = new Grade.Key(student.getId(), module.getId());
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
