package io.acari;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;

@EnableHystrix
@SpringBootApplication
public class HystrixSampleApplication {

	public static void main(String[] args) {
		SpringApplication.run(HystrixSampleApplication.class, args);
	}
}
