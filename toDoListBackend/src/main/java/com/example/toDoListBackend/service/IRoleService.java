package com.example.toDoListBackend.service;

public interface IRoleService<T> extends IService<T> {
	T findByName(String name);
}
