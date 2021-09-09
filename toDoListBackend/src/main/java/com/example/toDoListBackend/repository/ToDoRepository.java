package com.example.toDoListBackend.repository;

import com.example.toDoListBackend.model.ToDo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo, String> {
    @Query("FROM ToDo b WHERE b.title LIKE %:searchText%  ORDER BY b.title ASC")
    Page<ToDo> findAllTodo(Pageable pageable, @Param("searchText") String searchText);
    List<ToDo> findAll(Sort sort);
    Optional<ToDo> findById(Long id);
    void deleteById(Long id);
}
