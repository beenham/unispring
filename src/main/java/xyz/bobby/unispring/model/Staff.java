package xyz.bobby.unispring.model;

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
	private static final GrantedAuthority ROLE = new SimpleGrantedAuthority("ROLE_STAFF");

	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "coordinator_id")
	private final Set<Module> modules = new HashSet<>();

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return new HashSet<>() {{
			add(ROLE);
			addAll(modules.stream()
					.map(module -> "MODULE_" + module.getId())
					.map(SimpleGrantedAuthority::new)
					.collect(Collectors.toList())
			);
		}};
	}
}
