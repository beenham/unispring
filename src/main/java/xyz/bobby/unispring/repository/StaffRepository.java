package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import xyz.bobby.unispring.model.Staff;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Integer> {
}