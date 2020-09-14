import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { getRecords, sortByColumn, setSelectedRecord } from "../redux/actions";

import AddRecord from "./add-record";
import RecordSearch from "./record-search";
import { ASC, DESC } from "../constants";
import { getOrderedRecords } from "../redux/selectors";

const thArray = ["id", "firstName", "lastName", "email", "phone"];

const Table = ({
  getRecords,
  records,
  isLoading,
  sortByColumn,
  column,
  order,
  selectedDataLink,
  setSelectedRecord,
}) => {
  useEffect(() => {
    getRecords(selectedDataLink);
  }, []);

  const [showButton, setShowButton] = useState(false);

  const onClick = () => {
    setShowButton(!showButton);
  };

  return isLoading ? (
    <div className="spinner-border spinner" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <>
      <RecordSearch />
      <button className="btn m-2" onClick={onClick}>
        Добавить
      </button>
      {showButton && <AddRecord />}
      <table className="table">
        <thead className="thead-dark">
          <tr>
            {thArray.map((el) => {
              let orderIcon;
              if (el !== column) {
                orderIcon = (
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-chevron-expand"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
                    />
                  </svg>
                );
              } else {
                orderIcon =
                  order === DESC ? (
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-chevron-down"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="1em"
                      height="1em"
                      padding-right="0.5em"
                      viewBox="0 0 16 16"
                      className="bi bi-chevron-up"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                      />
                    </svg>
                  );
              }
              return (
                <th className="th" key={el} onClick={() => sortByColumn(el)}>
                  {orderIcon}
                  {el}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {records.map((row) => {
            const { id, firstName, lastName, email, phone } = row;
            return (
              <tr
                className="tr"
                key={email}
                onClick={() => setSelectedRecord(row)}
              >
                <td>{id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const mapStateToProps = (state) => {
  const currentRecords = getOrderedRecords(state);

  return {
    isLoading: state.data.isLoading,
    records: currentRecords,
    column: state.columnSort.column,
    order: state.columnSort.order,
    selectedDataLink: state.data.selectedDataLink,
    searchString: state.data.searchString,
  };
};

export default connect(mapStateToProps, {
  getRecords,
  sortByColumn,
  setSelectedRecord,
})(Table);
