package xyz.bobby.unispring.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
	private int id;

	@NotBlank
	@Column(unique = true, length = 32)
	@Length(max = 32)
	private String username;

	@Length(min = 4, max = 128)
	private String password;

	@NotBlank
	@Column(length = 64)
	@Length(max = 64)
	private String forename;

	@NotBlank
	@Column(length = 64)
	@Length(max = 64)
	private String surname;

	@NotBlank
	private String address;

	@NotBlank
	private String phoneNumber;

	@NotBlank
	@Column(unique = true)
	private String emailAddress;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "ENUM('MALE', 'FEMALE', 'OTHER')")
	private Gender gender;

	@NotBlank
	@Column(length = 64)
	@Length(max = 64)
	private String nationality;

	public enum Gender {
		MALE, FEMALE, OTHER
	}
}
