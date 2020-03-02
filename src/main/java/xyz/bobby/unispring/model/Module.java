package xyz.bobby.unispring.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
	@JsonIgnoreProperties({"modules"})
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

	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "modules")
	@JsonIgnoreProperties({"modules", "grades"})
	private final Set<Student> students = new HashSet<>();

	@ManyToMany(fetch = FetchType.EAGER) private final List<Topic> topics = new ArrayList<>();

	@OneToMany(fetch = FetchType.EAGER)
	@JoinColumn(name = "module_id")
	@JsonIgnoreProperties({"module"})
	private final Set<Grade> grades = new HashSet<>();

	public enum Status {
		AVAILABLE, FULL, TERMINATED
	}

	public enum Trimester {
		SPRING, SUMMER, AUTUMN
	}
}
