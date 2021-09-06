import * as BT from "./todoTypes";

const initialState = {
  book: "",
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BT.SAVE_TODO_REQUEST:
    case BT.FETCH_TODO_REQUEST:
    case BT.UPDATE_TODO_REQUEST:
    case BT.DELETE_TODO_REQUEST:
      return {
        ...state,
      };
    case BT.TODO_SUCCESS:
      return {
        book: action.payload,
        error: "",
      };
    case BT.TODO_FAILURE:
      return {
        book: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
