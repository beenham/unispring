package xyz.bobby.unispring.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Data
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class User implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotBlank
	@Column(unique = true, length = 32)
	@Length(max = 32)
	private String username;

	@Column(length = 64, nullable = false)
	@Length(min = 8, max = 128)
	@Getter(onMethod = @__(@JsonIgnore))
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

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public enum Gender {
		MALE, FEMALE, OTHER
	}
}
