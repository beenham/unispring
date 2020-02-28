package xyz.bobby.unispring.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
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

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "student_id")
	@JsonIgnoreProperties({"students", "grades"})
	private final Set<Module> modules = new HashSet<>();

	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "student_id")
	@JsonIgnoreProperties({"student"})
	private final Set<Grade> grades = new HashSet<>();
}
