package com.example.toDoListBackend.service.Impl;

import com.example.toDoListBackend.model.ToDo;
import com.example.toDoListBackend.repository.ToDoRepository;
import com.example.toDoListBackend.service.IToDoService;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;


@Service
public class IToDoServiceImpl implements IToDoService<ToDo> {

    @Autowired
    private ToDoRepository toDoRepository;

    @Override
    public Collection<ToDo> findAll() {
        return (Collection<ToDo>) toDoRepository.findAll();
    }

    @Override
    public Optional<ToDo> findById(String id) {
        return toDoRepository.findById(id);
    }

    @Override
    public ToDo saveOrUpdate(ToDo toDo) {
        return toDoRepository.save(toDo);
    }

    @Override
    public String deleteById(String id) {
        JSONObject jsonObject = new JSONObject();
        try {
            toDoRepository.deleteById(id);
            jsonObject.put("message", "deleted successfully");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();
    }
}
