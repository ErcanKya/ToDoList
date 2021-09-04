package com.example.toDoListBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ToDoListBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ToDoListBackendApplication.class, args);
		System.out.println("hello mongo");
	}

}
