package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import xyz.bobby.unispring.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
}