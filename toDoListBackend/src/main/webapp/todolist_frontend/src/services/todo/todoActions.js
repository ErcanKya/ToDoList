import * as BT from "./todoTypes";
import axios from "axios";

export const saveTodo = (todo) => {
  return (dispatch) => {
    dispatch({
      type: BT.SAVE_TODO_REQUEST,
    });
    axios
      .post("http://localhost:8081/rest/todos", todo)
      .then((response) => {
        dispatch(todoSuccess(response.data));
      })
      .catch((error) => {
        dispatch(todoFailure(error));
      });
  };
};

export const fetchTodo = (todoId) => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_TODO_REQUEST,
    });
    axios
      .get("http://localhost:8081/rest/todos/" + todoId)
      .then((response) => {
        dispatch(todoSuccess(response.data));
      })
      .catch((error) => {
        dispatch(todoFailure(error));
      });
  };
};

export const updateTodo = (todo) => {
  return (dispatch) => {
    dispatch({
      type: BT.UPDATE_TODO_REQUEST,
    });
    axios
      .put("http://localhost:8081/rest/todos", todo)
      .then((response) => {
        dispatch(todoSuccess(response.data));
      })
      .catch((error) => {
        dispatch(todoFailure(error));
      });
  };
};

export const deleteTodo = (todoId) => {
  return (dispatch) => {
    dispatch({
      type: BT.DELETE_TODO_REQUEST,
    });
    axios
      .delete("http://localhost:8081/rest/todos/" + todoId)
      .then((response) => {
        dispatch(todoSuccess(response.data));
      })
      .catch((error) => {
        dispatch(todoFailure(error));
      });
  };
};

const todoSuccess = (todo) => {
  return {
    type: BT.TODO_SUCCESS,
    payload: todo,
  };
};

const todoFailure = (error) => {
  return {
    type: BT.TODO_FAILURE,
    payload: error,
  };
};
