package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.model.Grade;
import xyz.bobby.unispring.model.Module;
import xyz.bobby.unispring.model.User;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Grade.Key> {
	default Grade getGrade(User user, Module module) throws ResourceNotFoundException {
		Grade.Key key = new Grade.Key(user, module);
		return this.findById(key)
				.orElseThrow(() -> new ResourceNotFoundException(Grade.class.getSimpleName(),
						"user=%d, module=%d", user.getId(), module.getId()));
	}
}