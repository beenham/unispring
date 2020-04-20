package xyz.bobby.unispring.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.*;
import java.util.stream.Collectors;

@EqualsAndHashCode(exclude = {"coordinator", "students", "topics", "grades"})
@Data
@Entity
@Table(name = "modules")
public class Module {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonView(View.Public.class)
	private int id;

	@NotBlank
	@Length(min = 9, max = 9)
	@JsonView(View.Public.class)
	private String code;

	@JsonView(View.Public.class)
	@NotBlank private String name;

	@ManyToOne(fetch = FetchType.EAGER)
	@JsonView(View.Public.class)
	private Staff coordinator;

	@NotBlank
	@JsonView(View.ExtendedPublic.class)
	private String description;

	@JsonView(View.Public.class)
	private int year;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "ENUM('SPRING', 'SUMMER', 'AUTUMN')")
	@JsonView(View.Public.class)
	private Trimester trimester;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "ENUM('AVAILABLE', 'FULL', 'TERMINATED')")
	@JsonView(View.Public.class)
	private Status status;

	private String password;

	@JsonView(View.Public.class)
	private int capacity;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			joinColumns = @JoinColumn(name = "module_id"),
			inverseJoinColumns = @JoinColumn(name = "student_id"))
	private Set<Student> students = new HashSet<>();

	@JsonView(View.ExtendedPublic.class)
	public Map<User.Gender, Long> getGenderStats() {
		return students.stream()
				.collect(Collectors.groupingBy(Student::getGender, Collectors.counting()));
	}

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			joinColumns = @JoinColumn(name = "module_id"),
			inverseJoinColumns = @JoinColumn(name = "topic_id"))
	@JsonView(View.ExtendedPublic.class)
	private List<Topic> topics = new ArrayList<>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "id.moduleId")
	private Set<Grade> grades = new HashSet<>();

	@JsonView(View.ExtendedPublic.class)
	public Map<Grade.LetterGrade, Long> getGradeStats() {
		return grades.stream()
				.sorted(Comparator.comparing(Grade::getGrade).reversed())
				.collect(Collectors.groupingBy(Grade::getGrade, Collectors.counting()));
	}

	public enum Status {
		AVAILABLE, FULL, TERMINATED
	}

	public enum Trimester {
		SPRING, SUMMER, AUTUMN
	}
}
