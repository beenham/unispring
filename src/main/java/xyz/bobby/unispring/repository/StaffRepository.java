package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import xyz.bobby.unispring.model.Staff;

@RepositoryRestResource(collectionResourceRel = "staff", path = "staff")
public interface StaffRepository extends JpaRepository<Staff, Integer> {
}