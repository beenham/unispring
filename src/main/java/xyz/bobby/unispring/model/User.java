package xyz.bobby.unispring.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Data
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonView(View.Public.class)
	private int id;

	@NotBlank
	@Column(unique = true, length = 32)
	@Length(max = 32)
	@JsonView(View.Public.class)
	private String username;

	@Column(length = 64, nullable = false)
	@Length(min = 8, max = 128)
	@Getter(onMethod = @__(@JsonIgnore))
	private String password;

	@NotBlank
	@Column(length = 64)
	@Length(max = 64)
	@JsonView(View.Public.class)
	private String forename;

	@NotBlank
	@Column(length = 64)
	@Length(max = 64)
	@JsonView(View.Public.class)
	private String surname;

	@NotBlank
	@JsonView(View.Internal.class)
	private String address;

	@NotBlank
	@JsonView(View.Internal.class)
	private String phoneNumber;

	@NotBlank
	@Column(unique = true)
	@JsonView(View.Public.class)
	private String emailAddress;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "ENUM('MALE', 'FEMALE', 'OTHER')")
	@JsonView(View.Internal.class)
	private Gender gender;

	@NotBlank
	@Column(length = 64)
	@Length(max = 64)
	@JsonView(View.Internal.class)
	private String nationality;

	public enum Gender {
		MALE, FEMALE, OTHER
	}
}
