import React from "react";

import { connect } from "react-redux";

import Pagination from "./pagination";
import DataChoice from "./data-choice";
import SelectedRecord from "./selected-record";
import Table from "./table";

import "./styles.css";

const App = ({ selectedDataLink }) => {
  return (
    <div className="m-5">
      {selectedDataLink ? (
        <>
          <Table />
          <SelectedRecord />
          <Pagination />
        </>
      ) : (
        <DataChoice />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedDataLink: state.data.selectedDataLink,
  };
};

export default connect(mapStateToProps)(App);
