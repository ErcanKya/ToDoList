package com.example.toDoListBackend;

import com.example.toDoListBackend.model.Role;
import com.example.toDoListBackend.model.ToDo;
import com.example.toDoListBackend.model.User;
import com.example.toDoListBackend.service.IRoleService;
import com.example.toDoListBackend.service.IService;
import com.example.toDoListBackend.service.IToDoService;
import com.example.toDoListBackend.utils.ConstantUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ToDoListBackendApplication implements CommandLineRunner {


	@Autowired
	private IToDoService<ToDo> toDoService;

	@Autowired
	private IService<User> userIService;

	@Autowired
	private IRoleService<Role> roleService;

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}


	public static void main(String[] args) {
		SpringApplication.run(ToDoListBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if (roleService.findAll().isEmpty()) {
			roleService.saveOrUpdate(new Role(ConstantUtils.ADMIN.toString()));
			roleService.saveOrUpdate(new Role(ConstantUtils.USER.toString()));
		}

		if (userIService.findAll().isEmpty()) {
			User user1 = new User();
			user1.setName("test");
			user1.setEmail("test@user.com");
			user1.setMobile("9787456545");
			user1.setRole(roleService.findByName(ConstantUtils.USER.toString()));
			user1.setPassword(new BCryptPasswordEncoder().encode("testuser"));
			userIService.saveOrUpdate(user1);

			User user2 = new User();
			user2.setName("test2");
			user2.setEmail("test@admin.com");
			user2.setMobile("9787456545");
			user2.setRole(roleService.findByName(ConstantUtils.ADMIN.toString()));
			user2.setPassword(new BCryptPasswordEncoder().encode("testadmin"));
			userIService.saveOrUpdate(user2);
		}

		if (toDoService.findAll().isEmpty()) {
			ToDo toDo=new ToDo();
			toDo.setTitle("First Task 'Do It'");
			toDo.setCompleted(false);
			toDoService.saveOrUpdate(toDo);
			System.out.println("ADDED");
		}
	}
}