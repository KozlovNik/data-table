import { GET_NUMBER_OF_PAGES, SET_CURRENT_PAGE } from "../action-types";

const initialState = {
  currentPage: 1,
  numberOfPages: 0,
  recordsPerPage: 50
};

export default function pagination(state = initialState, action) {
  switch (action.type) {
    case GET_NUMBER_OF_PAGES:
      return {
        ...state,
        numberOfPages: action.payload,
      };
      case SET_CURRENT_PAGE:
        return {
          ...state, 
          currentPage: action.payload
        }
    default:
      return state;
  }
}
