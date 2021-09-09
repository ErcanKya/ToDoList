import React, { Component } from "react";

import { connect } from "react-redux";
import { deleteTodo } from "../../services/index";

import "./../../assets/css/Style.css";
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
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyToast from "../MyToast";
import axios from "axios";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
        };
    }


    componentDidMount() {
        this.findAllTodos();
        this.findAll();
    }

    findAllTodos() {
        axios
            .get(
                "http://localhost:8081/rest/todos"
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    todos: data.content,
                });
            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem("jwtToken");
                this.props.history.push("/");
            });
    }
    findAll=async()=> {
        const resp=await fetch("http://localhost:8081/rest/todos")
    }
    deleteTodo = (todoId) => {
        this.props.deleteTodo(todoId);
        setTimeout(() => {
            if (this.props.todoObject != null) {
                this.setState({ show: true });
                setTimeout(() => this.setState({ show: false }), 3000);
                this.findAllTodos();
            } else {
                this.setState({ show: false });
            }
        }, 1000);
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

    render() {
        const { todos } = this.state;

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

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);