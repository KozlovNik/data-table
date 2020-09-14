import { combineReducers } from "redux";
import data from "./data";
import pagination from "./pagination";
import columnSort from "./column-sort";

export default combineReducers({ data, pagination, columnSort });
