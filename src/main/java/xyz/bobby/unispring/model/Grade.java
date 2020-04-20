package xyz.bobby.unispring.model;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Arrays;
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
	@JsonView(View.ExtendedPublic.class)
	private Student student;

	@ManyToOne
	@JoinColumn(name = "module_id")
	@MapsId("module_id")
	@JsonView(View.Public.class)
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
	@JsonView(View.Public.class)
	private int percent;

	@Enumerated(EnumType.STRING)
	@NotNull
	@JsonView(View.Public.class)
	private LetterGrade grade;

	public Grade() {}

	public Grade(Student student, Module module, int percent) {
		this.student = student;
		this.module = module;
		this.id = new Grade.Key(student.getId(), module.getId());
		setPercent(percent);
	}

	public Grade(Student student, Module module, int percent, String comment) {
		this(student, module, percent);
		this.comment = comment;
	}

	public Grade(Student student, Module module, LetterGrade grade) {
		this.student = student;
		this.module = module;
		this.id = new Grade.Key(student.getId(), module.getId());
		setGrade(grade);
	}

	public Grade(Student student, Module module, LetterGrade grade, String comment) {
		this(student, module, grade);
		this.comment = comment;
	}

	public void setPercent(int percent) {
		this.percent = percent;
		for (LetterGrade grade : LetterGrade.values()) {
			if (percent >= grade.min) {
				this.grade = grade;
				this.comment = grade.comment;
				break;
			}
		}
	}

	public void setGrade(LetterGrade grade) {
		this.grade = grade;
		this.percent = grade.avg;
		this.comment = grade.comment;
	}

	public enum LetterGrade {
		A(85, 100, "Excellent"), B(70, 85, "Very Good"),
		C(55, 70, "Good"), D(40, 55, "Permissible"),
		E(25, 40, "Woeful"), F(0, 25, "Get out of college ya fool");

		int min, max, avg;
		String comment;

		LetterGrade(int min, int max, String comment) {
			this.min = min;
			this.max = max;
			this.avg = min + ((max - min) / 2);
			this.comment = comment;
		}
	}
}
