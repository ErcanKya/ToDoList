package com.example.toDoListBackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Document(collection = "todos")
@JsonIgnoreProperties(value = {"createdAt"}, allowGetters = true)
public class ToDo {
    @Id
    @Field("_id")
    @JsonIgnore
    private String id;

    @Field("Todo_id")
    private String Todo_id;
    @NotBlank
    @Size(max=100)
    @Indexed(unique=true)
    private String title;

    private Boolean completed = false;
    private Date createdAt = new Date();

    public ToDo() {
        super();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTodo_id() {
        return Todo_id;
    }

    public void setTodo_id(String todo_id) {
        Todo_id = todo_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
    @Override
    public String toString() {
        return String.format(
                "Todo[id=%s, title='%s', completed='%s']",
                id, title, completed);
    }
}
