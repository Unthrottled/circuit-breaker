package io.acari;

import org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration;
import org.springframework.cloud.client.actuator.HasFeatures;
import org.springframework.cloud.netflix.hystrix.dashboard.HystrixDashboardConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.ui.freemarker.SpringTemplateLoader;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

@Configuration
public class AppConfig {
    private static final String DEFAULT_TEMPLATE_LOADER_PATH = "classpath:/templates/";

    private static final String DEFAULT_CHARSET = "UTF-8";

    @Bean
    public MessageStreamEndpoint messageStreamEndpoint(){
        return new MessageStreamEndpoint();
    }

    @Bean
    public HasFeatures hystrixDashboardFeature() {
        return HasFeatures.namedFeature("Hystrix Dashboard", HystrixDashboardConfiguration.class);
    }

    /**
     * Overrides Spring Boot's {@link FreeMarkerAutoConfiguration} to prefer using a
     * {@link SpringTemplateLoader} instead of the file system. This corrects an issue
     * where Spring Boot may use an empty 'templates' file resource to resolve templates
     * instead of the packaged Hystrix classpath templates.
     *
     * @return FreeMarker configuration
     */
    @Bean
    public FreeMarkerConfigurer freeMarkerConfigurer() {
        FreeMarkerConfigurer configurer = new FreeMarkerConfigurer();
        configurer.setTemplateLoaderPaths(DEFAULT_TEMPLATE_LOADER_PATH);
        configurer.setDefaultEncoding(DEFAULT_CHARSET);
        configurer.setPreferFileSystemAccess(false);
        return configurer;
    }
}
