package io.acari;

import org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration;
import org.springframework.cloud.client.actuator.HasFeatures;
import org.springframework.cloud.netflix.hystrix.dashboard.HystrixDashboardConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.ui.freemarker.SpringTemplateLoader;
import org.springframework.web.filter.RequestContextFilter;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

@EnableAsync
@Configuration
public class AppConfig {

}
