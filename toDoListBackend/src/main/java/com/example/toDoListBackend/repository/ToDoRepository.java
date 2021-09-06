package com.example.toDoListBackend.repository;

import com.example.toDoListBackend.model.ToDo;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ToDoRepository extends MongoRepository<ToDo, String> {
    List<ToDo> findAll(Sort sort);
    Optional<ToDo> findById(Long id);
    void deleteById(Long id);
}
