package com.example.toDoListBackend.service;

import java.util.Collection;
import java.util.Optional;

public interface IToDoService<T> {
    Collection<T> findAll();
    Optional<T> findById(String id);
    T saveOrUpdate(T t);
    String deleteById(String id);
}
