package xyz.bobby.unispring.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreFilter;
import org.springframework.security.core.parameters.P;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.model.Grade;
import xyz.bobby.unispring.model.Module;

import java.time.Year;
import java.util.List;

@RepositoryRestResource
public interface ModuleRepository extends CrudRepository<Module, Integer> {
	@RestResource(path = "year")
	List<Module> findByYear(Year year);

	@RestResource(path = "code", rel = "code")
	List<Module> findByCode(@Param("code") String code, Pageable p);

	@RestResource(exported = false)
	@Override
	void deleteById(Integer id);

	@RestResource(exported = false)
	@Override
	void delete(Module module);

	@RestResource(exported = false)
	@Override
	void deleteAll(Iterable<? extends Module> modules);

	@RestResource(exported = false)
	@Override
	void deleteAll();

	@Secured("STAFF")
	@Override
	<S extends Module> S save(S module);

	default Module getModule(int id) throws ResourceNotFoundException {
		return this.findById(id).orElseThrow(() -> new ResourceNotFoundException(Module.class.getSimpleName(), id));
	}
}