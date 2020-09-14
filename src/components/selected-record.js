import React from "react";

import { connect } from "react-redux";

const SelectedRecord = ({ selectedRecord }) => {
  if (!selectedRecord) {
    return null;
  }

  const { description, firstName, lastName, address } = selectedRecord;

  let addressInfo;

  if (address) {
    const { streetAddress, city, state, zip } = address;
    addressInfo = (
      <>
        <li className="list-group-item">
          Адрес проживания: <b>{streetAddress}</b>
        </li>
        <li className="list-group-item">
          Город: <b>{city}</b>
        </li>
        <li className="list-group-item">
          Провинция/штат: <b>{state}</b>
        </li>
        <li className="list-group-item">
          Индекс: <b>{zip}</b>
        </li>
      </>
    );
  }

  return (
    <div className="jumbotron w-25 p-0">
      <ul className="list-group">
        <li className="list-group-item active">
          Выбран пользователь {firstName} {lastName}
        </li>
        <li className="list-group-item">
          <label>
            Описание
            <textarea value={description} cols="40" rows="7" />
          </label>
        </li>
        {addressInfo}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRecord: state.data.selectedRecord,
  };
};

export default connect(mapStateToProps)(SelectedRecord);
