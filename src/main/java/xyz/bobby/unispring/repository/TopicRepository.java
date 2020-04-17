package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.annotation.Secured;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.model.Topic;

@RepositoryRestResource
public interface TopicRepository extends JpaRepository<Topic, Integer> {
	@Secured("ROLE_STAFF")
	@Override
	void deleteById(Integer id);

	@Secured("ROLE_STAFF")
	@Override
	void delete(Topic topic);

	@Secured("ROLE_STAFF")
	@Override
	void deleteAll(Iterable<? extends Topic> topics);

	@Secured("ROLE_STAFF")
	@Override
	void deleteAll();

	@Secured("ROLE_STAFF")
	@Override
	<S extends Topic> S save(S topic);

	default Topic getTopic(int id) throws ResourceNotFoundException {
		return this.findById(id).orElseThrow(() -> new ResourceNotFoundException(Topic.class.getSimpleName(), id));
	}
}