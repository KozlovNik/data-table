import React from "react";

import { connect } from "react-redux";
import { setDataSelection } from "../redux/actions";

const DataChoice = ({ setDataSelection }) => {
  const onBtnClick = (e) => {
    setDataSelection(e.target.value);
  };

  return (
    <>
      <div>Выберите набор данных:</div>
      <button
        onClick={onBtnClick}
        className="btn btn-link"
        value="http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
      >
        Большая выборка
      </button>
      <button
        onClick={onBtnClick}
        className="btn btn-link"
        value="http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
      >
        Маленькая выборка
      </button>
    </>
  );
};

export default connect(null, { setDataSelection })(DataChoice);
