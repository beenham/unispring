package xyz.bobby.unispring.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;


@EqualsAndHashCode(exclude = {"modules"}, callSuper = true)
@Data
@Entity
public class Staff extends User {
	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "coordinator_id")
	@JsonView(View.ExtendedPublic.class)
	private final Set<Module> modules = new HashSet<>();
}
