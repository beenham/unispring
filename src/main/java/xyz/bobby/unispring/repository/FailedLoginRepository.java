package xyz.bobby.unispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import xyz.bobby.unispring.model.FailedLogin;

public interface FailedLoginRepository extends JpaRepository<FailedLogin, Integer> {
	@Query("SELECT COUNT(fl) FROM FailedLogin fl WHERE fl.ipAddress=?1 AND TIMESTAMPDIFF(MINUTE, fl.time, NOW()) < 15")
	long countByIpAddress(String ipAddress);

	@Transactional
	void deleteByIpAddress(String ipAddress);
}