package xyz.bobby.unispring.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import javax.persistence.*;
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
	@JsonView(View.Public.class)
	private Stage stage;

	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "students")
	@Getter(onMethod = @__(@JsonIgnore))
	private Set<Module> modules = new HashSet<>();

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "id.studentId")
	@Getter(onMethod = @__(@JsonIgnore))
	private Set<Grade> grades = new HashSet<>();

	private boolean feesPaid;

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