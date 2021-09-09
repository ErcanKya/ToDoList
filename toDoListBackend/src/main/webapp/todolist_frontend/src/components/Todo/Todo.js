import React, { Component } from "react";

import { connect } from "react-redux";
import {
  saveTodo,
  fetchTodo,
  updateTodo,
} from "../../services/index";

import { Card, Form, Button, Col, InputGroup, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faUndo,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state = {
      show: false,
    };
  }

  initialState = {
    id: "",
    title: "",
  };

  componentDidMount() {
    const todoId = +this.props.match.params.id;
    if (todoId) {
      this.findTodoById(todoId);
    }
  }

  findTodoById = (todoId) => {
    this.props.fetchTitle(todoId);
    setTimeout(() => {
      let todo = this.props.todoObject.todo;
      if (todo != null) {
        this.setState({
          id: todo.id,
          title: todo.title,
        });
      }
    }, 1000);
  };

  resetTodo = () => {
    this.setState(() => this.initialState);
  };

  submitTodo = (event) => {
    event.preventDefault();

    const todo = {
      title: this.state.title,
    };

    this.props.saveTodo(todo);
    setTimeout(() => {
      if (this.props.todoObject.todo != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  updateTodo = (event) => {
    event.preventDefault();

    const todo = {
      id: this.state.id,
      title: this.state.title,
    };
    this.props.updateTodo(todo);
    setTimeout(() => {
      if (this.props.todoObject.todo != null) {
        this.setState({ show: true, method: "put" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  todoChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  todoList = () => {
    return this.props.history.push("/");
  };

  render() {
    const { title} =this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? " Updated Successfully."
                : " Saved Successfully."
            }
            type={"success"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{" "}
            {this.state.id ? "Update Task" : "Add New Task"}
          </Card.Header>
          <Form
            onReset={this.resetTodo}
            onSubmit={this.state.id ? this.updateTodo : this.submitTodo}
            id="todoFormId"
          >
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="title"
                    value={title}
                    onChange={this.todoChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Task Title"
                  />
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />{" "}
                {this.state.id ? "Update" : "Save"}
              </Button>{" "}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>{" "}
              <Button
                size="sm"
                variant="info"
                type="button"
                onClick={() => this.todoList()}
              >
                <FontAwesomeIcon icon={faList} /> Task List
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todoObject: state.todo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveTodo: (todo) => dispatch(saveTodo(todo)),
    fetchTodo: (todoId) => dispatch(fetchTodo(todoId)),
    updateTodo: (todo) => dispatch(updateTodo(todo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
