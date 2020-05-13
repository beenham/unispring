package xyz.bobby.unispring.model;

import lombok.Data;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Table(name = "failed_logins")
@Data
public class FailedLogin {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Getter
	private int id;

	@NotBlank
	private String ipAddress;

	@CreationTimestamp
	private Date time;
}
