package xyz.bobby.unispring.config;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "spring.jpa.hibernate")
public class ApplicationConfig {
	@Getter
	private String ddlAuto;

	@Getter
	private Boolean populateDb;

	public void setDdlAuto(String cfg) {
		this.ddlAuto = cfg;
		populateDb = this.ddlAuto.contains("create");
	}
}
