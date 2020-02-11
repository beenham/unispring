package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import xyz.bobby.unispring.model.Module;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Integer> {}