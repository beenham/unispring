package xyz.bobby.unispring.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.data.rest.webmvc.spi.BackendIdConverter;
import xyz.bobby.unispring.model.Grade;

import java.io.Serializable;

@Configuration
public class RestConfig implements RepositoryRestConfigurer {
	@Bean
	public BackendIdConverter gradeIdConverter() {
		return new BackendIdConverter() {
			@Override
			public Serializable fromRequestId(String id, Class<?> entityType) {
				if (id == null) return null;
				String[] parts = id.split("_");
				return new Grade.Key(Integer.parseInt(parts[0]), Integer.parseInt(parts[1]));
			}

			@Override
			public String toRequestId(Serializable id, Class<?> entityType) {
				Grade.Key key = (Grade.Key) id;
				return String.format("%d_%d", key.studentId, key.moduleId);
			}

			@Override
			public boolean supports(Class<?> type) {
				return Grade.class.equals(type);
			}
		};
	}
}
