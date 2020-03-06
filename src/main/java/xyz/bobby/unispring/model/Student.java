package xyz.bobby.unispring.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(exclude = {"modules", "grades"}, callSuper = true)
@Data
@Entity
@Table(name = "students")
public class Student extends User {
	@NotNull
	@Column(unique = true)
	@Digits(integer = 8, fraction = 0)
	@Min(1)
	private int studentNumber;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "ENUM('ONE', 'TWO', 'THREE', 'FOUR', 'MASTERS', 'DOCTORATE')")
	private Stage stage;

	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "students")
	private Set<Module> modules = new HashSet<>();

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "id.studentId")
	private Set<Grade> grades = new HashSet<>();

	public enum Stage {
		ONE("1st"), TWO("2nd"), THREE("3rd"), FOUR("4th"), MASTERS("MSc"), DOCTORATE("PhD");

		private final String s;

		Stage(String s) {
			this.s = s;
		}

		@Override
		public String toString() {
			return s;
		}
	}
}
