import { SORT_BY_COLUMN } from "../action-types";

const initialState = {
  column: null,
  order: null
};

export default function columnSort(state = initialState, action) {
  switch (action.type) {
    case SORT_BY_COLUMN:
      return {
        ...state,
        column: action.payload.column,
        order: action.payload.order
      };
    default:
      return state;
  }
}