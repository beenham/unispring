package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.model.Staff;
import xyz.bobby.unispring.model.User;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface UserRepository extends CrudRepository<User, Integer> {
	Optional<User> findByEmailAddressIgnoreCase(String email);

	default User getUser(int id) throws ResourceNotFoundException {
		return this.findById(id).orElseThrow(() -> new ResourceNotFoundException(User.class.getSimpleName(), id));
	}

	@RestResource(exported = false)
	@Override
	<S extends User> S save(S s);

	@PreAuthorize("principal.getId() == #id")
	@Override
	Optional<User> findById(@P("id") Integer id);

	@RestResource(exported = false)
	@Override
	Iterable<User> findAll();

	@RestResource(exported = false)
	@Override
	Iterable<User> findAllById(Iterable<Integer> iterable);

	@RestResource(exported = false)
	@Override
	void deleteById(Integer integer);

	@RestResource(exported = false)
	@Override
	void delete(User user);

	@RestResource(exported = false)
	@Override
	void deleteAll(Iterable<? extends User> iterable);

	@RestResource(exported = false)
	@Override
	void deleteAll();
}