package xyz.bobby.unispring.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.Year;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@EqualsAndHashCode(exclude = {"coordinator", "students", "topics", "grades"})
@Data
@Entity
@Table(name = "modules")
public class Module {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotBlank
	@Length(min = 9, max = 9)
	private String code;

	@NotBlank private String name;

	@ManyToOne(fetch = FetchType.EAGER)
	private Staff coordinator;

	@NotBlank private String description;
	private Year year;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "ENUM('SPRING', 'SUMMER', 'AUTUMN')")
	private Trimester trimester;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "ENUM('AVAILABLE', 'FULL', 'TERMINATED')")
	private Status status;

	private String password;
	@NotNull private int capacity;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			joinColumns = @JoinColumn(name = "module_id"),
			inverseJoinColumns = @JoinColumn(name = "student_id"))
	private final Set<Student> students = new HashSet<>();

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			joinColumns = @JoinColumn(name = "module_id"),
			inverseJoinColumns = @JoinColumn(name = "topic_id"))
	private List<Topic> topics = new ArrayList<>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "id.moduleId")
	private Set<Grade> grades = new HashSet<>();

	public enum Status {
		AVAILABLE, FULL, TERMINATED
	}

	public enum Trimester {
		SPRING, SUMMER, AUTUMN
	}
}
