import React, { Component } from "react";

import { connect } from "react-redux";
import { deleteTodo } from "../services/index";

import "./../assets/css/Style.css";
import {
  Card,
  Table,
  Image,
  ButtonGroup,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faEdit,
  faTrash,
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
  faSearch,
  faTimes,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyToast from "./MyToast";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      search: "",
      currentPage: 1,
      todosPerPage: 5,
      sortDir: "asc",
    };
  }

  sortData = () => {
    setTimeout(() => {
      this.state.sortDir === "asc"
        ? this.setState({ sortDir: "desc" })
        : this.setState({ sortDir: "asc" });
      this.findAllTodos(this.state.currentPage);
    }, 500);
  };

  componentDidMount() {
    this.findAllTodos(this.state.currentPage);
  }

  findAllTodos(currentPage) {
    currentPage -= 1;
    axios
      .get(
        "http://localhost:8081/api/todos?pageNumber=" +
          currentPage +
          "&pageSize=" +
          this.state.todosPerPage +
          "&sortBy=price&sortDir=" +
          this.state.sortDir
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          todos: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("jwtToken");
        this.props.history.push("/");
      });
  }

  deleteTodo = (todoId) => {
    this.props.deleteTodo(todoId);
    setTimeout(() => {
      if (this.props.todoObject != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
        this.findAllTodos(this.state.currentPage);
      } else {
        this.setState({ show: false });
      }
    }, 1000);
  };

  changePage = (event) => {
    let targetPage = parseInt(event.target.value);
    if (this.state.search) {
      this.searchData(targetPage);
    } else {
      this.findAllTodos(targetPage);
    }
    this.setState({
      [event.target.name]: targetPage,
    });
  };

  firstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      if (this.state.search) {
        this.searchData(firstPage);
      } else {
        this.findAllTodos(firstPage);
      }
    }
  };

  prevPage = () => {
    let prevPage = 1;
    if (this.state.currentPage > prevPage) {
      if (this.state.search) {
        this.searchData(this.state.currentPage - prevPage);
      } else {
        this.findAllTodos(this.state.currentPage - prevPage);
      }
    }
  };

  lastPage = () => {
    let condition = Math.ceil(
      this.state.totalElements / this.state.todosPerPage
    );
    if (this.state.currentPage < condition) {
      if (this.state.search) {
        this.searchData(condition);
      } else {
        this.findAllTodos(condition);
      }
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.totalElements / this.state.todosPerPage)
    ) {
      if (this.state.search) {
        this.searchData(this.state.currentPage + 1);
      } else {
        this.findAllTodos(this.state.currentPage + 1);
      }
    }
  };

  render() {
    const { todos, currentPage, totalPages, search } = this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={"Deleted Successfully."}
            type={"danger"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <div style={{ float: "left" }}>
              <FontAwesomeIcon icon={faList} /> To Do List
            </div>
            <div style={{ float: "right" }}>
              <ButtonGroup>
                <Link
                    to={"add/"}
                    className="btn btn-sm btn-outline-primary"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                </Link>{" "}
              </ButtonGroup>
            </div>
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <tbody>
                {todos.length === 0 ? (
                  <tr align="center">
                    <td colSpan="7">No Task Available.</td>
                  </tr>
                ) : (
                    todos.map((todo) => (
                    <tr key={todo.id}>
                      <td>
                        <Image
                          src={todo.coverPhotoURL}
                          roundedCircle
                          width="25"
                          height="25"
                        />{" "}
                        {todo.title}
                      </td>
                      <td>
                        <ButtonGroup>
                        <Link
                            to={"edit/" + todo.id}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{" "}
                          <Link
                            to={"edit/" + todo.id}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{" "}
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => this.deleteTodo(todo.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
          {todos.length > 0 ? (
            <Card.Footer>
              <div style={{ float: "left" }}>
                Showing Page {currentPage} of {totalPages}
              </div>
              <div style={{ float: "right" }}>
                <InputGroup size="sm">
                  <InputGroup.Prepend>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === 1 ? true : false}
                      onClick={this.firstPage}
                    >
                      <FontAwesomeIcon icon={faFastBackward} /> First
                    </Button>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === 1 ? true : false}
                      onClick={this.prevPage}
                    >
                      <FontAwesomeIcon icon={faStepBackward} /> Prev
                    </Button>
                  </InputGroup.Prepend>
                  <FormControl
                    className={"page-num bg-dark"}
                    name="currentPage"
                    value={currentPage}
                    onChange={this.changePage}
                  />
                  <InputGroup.Append>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === totalPages ? true : false}
                      onClick={this.nextPage}
                    >
                      <FontAwesomeIcon icon={faStepForward} /> Next
                    </Button>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === totalPages ? true : false}
                      onClick={this.lastPage}
                    >
                      <FontAwesomeIcon icon={faFastForward} /> Last
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Card.Footer>
          ) : null}
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
    deleteTodo: (todoId) => dispatch(deleteTodo(todoId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
