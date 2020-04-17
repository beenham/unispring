package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import xyz.bobby.unispring.model.Staff;
import xyz.bobby.unispring.model.Student;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface StudentRepository extends CrudRepository<Student, Integer> {
	List<Student> findAllByStage(Student.Stage stage);

	@RestResource(exported = false)
	@Override
	<S extends Student> S save(S s);

	@PreAuthorize("principal.getId() == #id")
	@Override
	Optional<Student> findById(@P("id") Integer id);

	@PostFilter("principal == filterObject")
	@Override
	List<Student> findAll();

	@RestResource(exported = false)
	@Override
	Iterable<Student> findAllById(Iterable<Integer> iterable);

	@RestResource(exported = false)
	@Override
	void deleteById(Integer integer);

	@RestResource(exported = false)
	@Override
	void delete(Student student);

	@RestResource(exported = false)
	@Override
	void deleteAll(Iterable<? extends Student> iterable);

	@RestResource(exported = false)
	@Override
	void deleteAll();
}