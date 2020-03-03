package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.model.Topic;

@RepositoryRestResource
public interface TopicRepository extends JpaRepository<Topic, Integer> {
	default Topic getTopic(int id) throws ResourceNotFoundException {
		return this.findById(id).orElseThrow(() -> new ResourceNotFoundException(Topic.class.getSimpleName(), id));
	}
}