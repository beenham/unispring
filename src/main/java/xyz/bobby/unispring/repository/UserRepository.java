package xyz.bobby.unispring.repository;

import org.springframework.data.repository.CrudRepository;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.model.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
	Optional<User> findByEmailAddressIgnoreCase(String email);

	default User getUser(int id) throws ResourceNotFoundException {
		return this.findById(id).orElseThrow(() -> new ResourceNotFoundException(User.class.getSimpleName(), id));
	}
}