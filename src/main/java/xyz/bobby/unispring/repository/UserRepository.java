package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.model.User;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "people", path = "people")
public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByEmailAddressIgnoreCase(String email);

	default User getUser(int id) throws ResourceNotFoundException {
		return this.findById(id).orElseThrow(() -> new ResourceNotFoundException(User.class.getSimpleName(), id));
	}

	List<FilteredUser> findAllProjectedBy();

	interface FilteredUser {
		String getEmailAddress();
	}
}