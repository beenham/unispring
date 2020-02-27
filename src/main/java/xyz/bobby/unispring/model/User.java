package xyz.bobby.unispring.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
	@Id
	@JsonIgnore
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Getter
	private int id;

	@NotBlank
	@Column(unique = true, length = 32)
	@Length(max = 32)
	@Getter @Setter
	private String username;

	@Transient
	@Length(min = 8, max = 128)
	@Getter @Setter
	private String password;

	@Column(length = 64, nullable = false)
	@Length(max = 64)
	@Getter(onMethod = @__(@JsonIgnore)) @Setter
	private String passwordHash;

	@NotBlank
	@Column(length = 64)
	@Length(max = 64)
	@Getter @Setter
	private String forename;

	@NotBlank
	@Column(length = 64)
	@Length(max = 64)
	@Getter	@Setter
	private String surname;

	@NotNull
	@Column(unique = true)
	@Digits(integer = 8, fraction = 0)
	@Min(1)
	@Getter @Setter
	private int studentNumber;

	@NotBlank
	@Getter @Setter
	private String address;

	@NotBlank
	@Getter @Setter
	private String phoneNumber;

	@NotBlank
	@Column(unique = true)
	@Getter @Setter
	private String emailAddress;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "ENUM('STAFF', 'STUDENT')")
	@Getter @Setter
	private Role role;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "ENUM('MALE', 'FEMALE', 'OTHER')")
	@Getter @Setter
	private Gender gender;

	@NotBlank
	@Column(length = 64)
	@Length(max = 64)
	@Getter @Setter
	private String nationality;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	@JsonIgnoreProperties({"students", "grades"})
	@Getter @Setter
	private Set<Module> modules;

	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	@JsonIgnoreProperties({"user"})
	@Getter @Setter
	private Set<Grade> grades;

	public enum Role {
		STAFF, STUDENT
	}

	public enum Gender {
		MALE, FEMALE, OTHER
	}
}
