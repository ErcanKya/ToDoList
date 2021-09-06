package com.example.toDoListBackend.repository;

import com.example.toDoListBackend.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends MongoRepository<Role, Long> {
	Role findByName(String name);
}