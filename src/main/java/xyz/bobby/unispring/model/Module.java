package xyz.bobby.unispring.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.Year;
import java.util.Set;

@Entity
@Table(name = "modules")
public class Module {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotBlank
	@Length(min = 9, max = 9)
	@Getter @Setter
	private String code;

	@NotBlank
	@Getter @Setter
	private String name;

	@NotNull
	@Getter @Setter
	private int coordinatorId;

	@NotBlank
	@Getter
	@Setter
	private String description;

	@Getter @Setter
	private Year year;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "ENUM('spring', 'summer', 'autumn')")
	@Getter @Setter
	private Trimester trimester;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "ENUM('available', 'terminated')")
	@Getter @Setter
	private Status status;

	@NotNull
	@Getter @Setter
	private int capacity;

	@ElementCollection(fetch = FetchType.LAZY)
	@CollectionTable(name = "user_modules", joinColumns = @JoinColumn(name = "module_id"))
	@Column(name = "user_id")
	@Getter @Setter
	private Set<Integer> enrolledStudents;

	@ElementCollection(fetch = FetchType.LAZY)
	@CollectionTable(name = "module_topics", joinColumns = @JoinColumn(name = "module_id"))
	@Column(name = "topic_id")
	@Getter @Setter
	private Set<Integer> topics;

	public enum Status {
		AVAILABLE, TERMINATED
	}

	public enum Trimester {
		SPRING, SUMMER, AUTUMN
	}
}
