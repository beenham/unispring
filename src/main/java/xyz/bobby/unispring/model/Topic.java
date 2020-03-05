package xyz.bobby.unispring.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "topics")
public class Topic {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Getter
	private int id;

	@NotBlank
	@Column(unique = true, length = 32)
	@Length(max = 32)
	@Getter	@Setter
	private String name;

	@NotBlank
	@Getter @Setter
	private String description;

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "topics")
	private List<Module> modules = new ArrayList<>();
}
