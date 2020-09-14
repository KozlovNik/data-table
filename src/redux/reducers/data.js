import {
  ADD_RECORD,
  GET_RECORDS_FAILURE,
  GET_RECORDS_LOADING,
  GET_RECORDS_SUCCESS,
  SET_DATA_SELECTION,
  SET_SELECTED_RECORD,
  SET_SEARCH_STRING
} from "../action-types";

const initialState = {
  isLoading: false,
  records: [],
  selectedDataLink: null,
  selectedRecord: null,
  error: "",
  searchString: "",
};

export default function data(state = initialState, action) {
  switch (action.type) {
    case GET_RECORDS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_RECORDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        records: action.payload,
      };
    case GET_RECORDS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case SET_DATA_SELECTION:
      return {
        ...state,
        selectedDataLink: action.payload,
      };
    case SET_SELECTED_RECORD:
      return {
        ...state,
        selectedRecord: action.payload,
      };
    case ADD_RECORD:
      return {
        ...state,
        records: action.payload,
      };
    case SET_SEARCH_STRING:
      return {
        ...state,
        searchString: action.payload,
      };
    default:
      return state;
  }
}
