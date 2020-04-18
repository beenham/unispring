package xyz.bobby.unispring.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreFilter;
import org.springframework.security.core.parameters.P;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.model.Grade;
import xyz.bobby.unispring.model.Module;
import xyz.bobby.unispring.model.Student;
import xyz.bobby.unispring.model.Topic;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface GradeRepository extends CrudRepository<Grade, Grade.Key> {
	@PostFilter("principal == filterObject.getStudent() || hasAuthority('MODULE_' + filterObject.getModule().getId())")
	@Override
	List<Grade> findAll();

	List<Grade> findAllBy();

	@PreAuthorize("principal.getId() == #key.studentId || hasAuthority('MODULE_' + #key.moduleId)")
	@Override
	Optional<Grade> findById(@P("key") Grade.Key grade);

	@PreAuthorize("hasPermission('MODULE_' + #key.moduleId)")
	@Override
	void deleteById(Grade.Key key);

	@PreAuthorize("hasPermission('MODULE_' + #key.moduleId)")
	@Override
	void delete(@P("grade") Grade grade);

	@PreFilter("hasPermission('MODULE_' + #filterObject.getModule().getId())")
	@Override
	void deleteAll(Iterable<? extends Grade> grades);

	@RestResource(exported = false)
	@Override
	void deleteAll();

	@PreAuthorize("hasPermission('MODULE_' + #grade.getModule().getCoordinator())")
	@Override
	<S extends Grade> S save(@P("grade") S grade);
}