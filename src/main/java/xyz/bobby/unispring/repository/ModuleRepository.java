package xyz.bobby.unispring.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.model.Module;

import java.time.Year;
import java.util.List;

@RepositoryRestResource
public interface ModuleRepository extends JpaRepository<Module, Integer> {
	@RestResource(path = "year")
	List<Module> findByYear(Year year);

	@RestResource(path = "code", rel = "code")
	List<Module> findByCode(@Param("code") String code, Pageable p);

	default Module getModule(int id) throws ResourceNotFoundException {
		return this.findById(id).orElseThrow(() -> new ResourceNotFoundException(Module.class.getSimpleName(), id));
	}
}