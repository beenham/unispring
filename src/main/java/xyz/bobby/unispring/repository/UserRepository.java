package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import xyz.bobby.unispring.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {}