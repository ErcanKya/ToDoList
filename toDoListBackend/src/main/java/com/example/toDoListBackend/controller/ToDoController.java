package com.example.toDoListBackend.controller;

import com.example.toDoListBackend.model.ToDo;
import com.example.toDoListBackend.service.IPageService;
import com.example.toDoListBackend.service.IToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins="http://localhost:3000")
public class ToDoController {

    @Autowired
    IToDoService<ToDo> toDoService;

    //    @GetMapping("/todos")
//    public List<ToDo> getAllTodos() {
//        Sort sortByCreatedAtDesc = new Sort(Sort.Direction.DESC, "createdAt");
//        return toDoService.findAll(sortByCreatedAtDesc);
//    }
    @GetMapping("/todos")
    public Collection<ToDo> getAllTodos() {
        return toDoService.findAll();
    }

    @PostMapping("/todos")
    public ToDo createTodo(@Valid @RequestBody ToDo todo) {
        todo.setCompleted(false);
        return toDoService.saveOrUpdate(todo);
    }

    @GetMapping(value = "/todos/{id}")
    public ResponseEntity<ToDo> getTodoById(@PathVariable("id") String id) {
        return toDoService.findById(id)
                .map(todo -> ResponseEntity.ok().body(todo))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping(value = "/todos/{id}")
    public ResponseEntity<ToDo> updateTodo(@PathVariable("id") String id,
                                           @Valid @RequestBody ToDo todo) {
        return toDoService.findById(id)
                .map(todoData -> {
                    todoData.setTitle(todo.getTitle());
                    todoData.setCompleted(todo.getCompleted());
                    ToDo updatedTodo = toDoService.saveOrUpdate(todoData);
                    return ResponseEntity.ok().body(updatedTodo);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(value = "/todos/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable("id") String id) {
        return toDoService.findById(id)
                .map(todo -> {
                    toDoService.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}