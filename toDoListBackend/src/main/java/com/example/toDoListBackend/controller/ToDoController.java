package com.example.toDoListBackend.controller;

import com.example.toDoListBackend.model.ToDo;
import com.example.toDoListBackend.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ToDoController {

    @Autowired
    ToDoRepository todoRepository;

//    @GetMapping("/todos")
//    public List<ToDo> getAllTodos() {
//        Sort sortByCreatedAtDesc = new Sort(Sort.Direction.DESC, "createdAt");
//        return todoRepository.findAll(sortByCreatedAtDesc);
//    }
    @GetMapping("/todos")
    public List<ToDo> getAllTodos() {
        return todoRepository.findAll();
    }
    @PostMapping("/todos")
    public ToDo createTodo(@Valid @RequestBody ToDo todo) {
        todo.setCompleted(false);
        return todoRepository.save(todo);
    }

    @GetMapping(value="/todos/{id}")
    public ResponseEntity<ToDo> getTodoById(@PathVariable("id") String id) {
        return todoRepository.findById(id)
                .map(todo -> ResponseEntity.ok().body(todo))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping(value="/todos/{id}")
    public ResponseEntity<ToDo> updateTodo(@PathVariable("id") String id,
                                           @Valid @RequestBody ToDo todo) {
        return todoRepository.findById(id)
                .map(todoData -> {
                    todoData.setTitle(todo.getTitle());
                    todoData.setCompleted(todo.getCompleted());
                    ToDo updatedTodo = todoRepository.save(todoData);
                    return ResponseEntity.ok().body(updatedTodo);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(value="/todos/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable("id") String id) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todoRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}