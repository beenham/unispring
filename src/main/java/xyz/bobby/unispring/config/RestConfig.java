package xyz.bobby.unispring.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.data.rest.webmvc.spi.BackendIdConverter;
import xyz.bobby.unispring.model.Grade;
import xyz.bobby.unispring.repository.GradeRepository;
import xyz.bobby.unispring.repository.ModuleRepository;
import xyz.bobby.unispring.repository.StudentRepository;

import java.io.Serializable;

public class RestConfig implements RepositoryRestConfigurer {
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		config.withEntityLookup().forRepository(GradeRepository.class, (Grade g) -> {
			Grade.Key gk = new Grade.Key();
			gk.module = g.getModule();
			gk.student = g.getStudent();
			return gk;
		}, GradeRepository::findOne);
	}

	@Bean
	public BackendIdConverter gradeIdConverter() {
		return new BackendIdConverter() {
			@Autowired
			private ModuleRepository moduleRepository;
			@Autowired
			private StudentRepository studentRepository;

			@Override
			public Serializable fromRequestId(String id, Class<?> entityType) {
				System.out.println(id);
				if (id == null)
					return null;
				String[] parts = id.split("_");
				Grade.Key key = new Grade.Key();
				key.student = studentRepository.findById(Integer.parseInt(parts[0])).orElse(null);
				key.module = moduleRepository.findById(Integer.parseInt(parts[1])).orElse(null);
				if (key.student == null || key.module == null)
					return null;
				return key;
			}

			@Override
			public String toRequestId(Serializable id, Class<?> entityType) {
				Grade.Key key = (Grade.Key) id;
				return String.format("%d_%d", key.student.getId(), key.module.getId());
			}

			@Override
			public boolean supports(Class<?> type) {
				return Grade.class.equals(type);
			}
		};
	}
}
