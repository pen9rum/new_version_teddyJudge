package com.Teddy.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context =
				SpringApplication.run(BackendApplication.class, args); // 取得Spring Context

		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String rawPassword = "yourPassword";
		String encodedPassword = passwordEncoder.encode(rawPassword);

		System.out.println(encodedPassword);

	}


}
