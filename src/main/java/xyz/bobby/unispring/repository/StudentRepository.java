package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import xyz.bobby.unispring.model.Student;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Integer> {
	List<Student> findAllByStage(Student.Stage stage);
}