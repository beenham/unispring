package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.model.Grade;
import xyz.bobby.unispring.model.Module;
import xyz.bobby.unispring.model.Student;

@RepositoryRestResource
public interface GradeRepository extends JpaRepository<Grade, Grade.Key> {
	default Grade getGrade(int student, int module) throws ResourceNotFoundException {
		Grade.Key key = new Grade.Key(student, module);
		return this.findById(key)
				.orElseThrow(() -> new ResourceNotFoundException(Grade.class.getSimpleName(),
						"user=%d, module=%d", student, module));
	}
}