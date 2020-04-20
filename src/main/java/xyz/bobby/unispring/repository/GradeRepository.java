package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import xyz.bobby.unispring.model.Grade;

public interface GradeRepository extends JpaRepository<Grade, Grade.Key> {
}