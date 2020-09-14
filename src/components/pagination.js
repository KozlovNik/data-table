import React from "react";

import { connect } from "react-redux";
import { setCurrentPage } from "../redux/actions";

const Pagination = ({ numberOfPages, currentPage, setCurrentPage }) => {
  let pages = [];

  for (let p = 1; p <= numberOfPages; p++) {
    let clsName = currentPage === p ? "page-item active" : "page-item";
    pages.push(
      <li
        className={clsName}
        onClick={() => setCurrentPage(p)}
        key={p}
      >
        <a className="page-link" href="#">
          {p}
        </a>
      </li>
    );
  }

  return <ul className="pagination">{pages.length > 1 && pages}</ul>;
};

const mapStateToProps = (state) => {
  const { numberOfPages, currentPage } = state.pagination;
  return {
    numberOfPages,
    currentPage,
  };
};

export default connect(mapStateToProps, { setCurrentPage })(Pagination);
