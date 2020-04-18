package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import xyz.bobby.unispring.model.Staff;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "staff", path = "staff")
public interface StaffRepository extends CrudRepository<Staff, Integer> {
	@RestResource(exported = false)
	@Override
	<S extends Staff> S save(S s);

	@PreAuthorize("principal.getId() == #id")
	@Override
	Optional<Staff> findById(@P("id") Integer id);

	@PostFilter("principal == filterObject")
	@Override
	List<Staff> findAll();

	List<Staff> findAllBy();

	@RestResource(exported = false)
	@Override
	Iterable<Staff> findAllById(Iterable<Integer> iterable);

	@RestResource(exported = false)
	@Override
	void deleteById(Integer integer);

	@RestResource(exported = false)
	@Override
	void delete(Staff staff);

	@RestResource(exported = false)
	@Override
	void deleteAll(Iterable<? extends Staff> iterable);

	@RestResource(exported = false)
	@Override
	void deleteAll();
}