package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.model.Module;

import java.util.List;

public interface ModuleRepository extends JpaRepository<Module, Integer> {
	List<Module> findByYear(int year);

	List<Module> findByCode(@Param("code") String code);

	default Module getModule(int id) throws ResourceNotFoundException {
		return this.findById(id).orElseThrow(() -> new ResourceNotFoundException(Module.class.getSimpleName(), id));
	}
}