import {
  GET_RECORDS_FAILURE,
  GET_RECORDS_LOADING,
  GET_RECORDS_SUCCESS,
  GET_NUMBER_OF_PAGES,
  SET_CURRENT_PAGE,
  SORT_BY_COLUMN,
  SET_DATA_SELECTION,
  SET_SELECTED_RECORD,
  ADD_RECORD,
  SET_SEARCH_STRING,
} from "./action-types";

import { getFilteredRecords } from "./selectors";

import { ASC, DESC } from "../constants";

export const getRecords = (link) => (dispatch, getState) => {
  const recordsPerPage = getState().pagination.recordsPerPage;
  dispatch({ type: GET_RECORDS_LOADING });
  fetch(link, {
    method: "GET",
  }).then(async (res) => {
    const records = await res.json();
    if (res.ok) {
      dispatch({
        type: GET_RECORDS_SUCCESS,
        payload: records,
      });
      dispatch({
        type: GET_NUMBER_OF_PAGES,
        payload: Math.ceil(records.length / recordsPerPage),
      });
    } else {
      dispatch({ type: GET_RECORDS_FAILURE, payload: records });
    }
  });
};

export const addRecord = (record) => (dispatch, getState) => {
  const state = getState();
  const records = [record, ...state.data.records];
  const recordsPerPage = state.pagination.recordsPerPage;
  dispatch({ type: ADD_RECORD, payload: records });
  dispatch({
    type: GET_NUMBER_OF_PAGES,
    payload: Math.ceil(records.length / recordsPerPage),
  });
};

export const setCurrentPage = (currentPage) => (dispatch) => {
  dispatch({ type: SET_CURRENT_PAGE, payload: currentPage });
};

export const sortByColumn = (column) => (dispatch, getState) => {
  const state = getState();
  let order;

  if (column === state.columnSort.column && state.columnSort.order === ASC) {
    order = DESC;
  } else {
    order = ASC;
  }

  dispatch({ type: SORT_BY_COLUMN, payload: { column, order } });
};

export const setDataSelection = (link) => (dispatch) => {
  dispatch({ type: SET_DATA_SELECTION, payload: link });
};

export const setSelectedRecord = (record) => (dispatch) => {
  dispatch({ type: SET_SELECTED_RECORD, payload: record });
};

export const setSearchString = (searchString) => (dispatch, getState) => {
  const state = getState();
  const records = state.data.records;
  const recordsPerPage = state.pagination.recordsPerPage;
  let currentRecordsCopy = [...records];

  if (searchString !== "") {
    const keyArr = ["id", "firstName", "lastName", "email", "phone"];
    currentRecordsCopy = currentRecordsCopy.filter((record) => {
      for (let key in record) {
        if (
          keyArr.includes(key) &&
          record[key]
            .toString()
            .toLowerCase()
            .includes(searchString.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });
  }

  dispatch({ type: SET_SEARCH_STRING, payload: searchString });
  dispatch({
    type: GET_NUMBER_OF_PAGES,
    payload: Math.ceil(currentRecordsCopy.length / recordsPerPage),
  });
};
