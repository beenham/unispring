package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import xyz.bobby.unispring.model.Topic;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Integer> {}