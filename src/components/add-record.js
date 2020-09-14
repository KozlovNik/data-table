import React, { useState } from "react";

import { connect } from "react-redux";
import { addRecord } from "../redux/actions";

const inputFields = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const AddRecord = ({ addRecord }) => {
  const [inputs, setInputs] = useState(inputFields);
  const [showButton, setShowButton] = useState(false);

  const handleInputChange = (e) => {
    let updatedInputs = {
      ...inputs,
      [e.target.name]: e.target.value,
    };
    setInputs(updatedInputs);

    for (let key in updatedInputs) {
      if (updatedInputs[key] === "") {
        return setShowButton(false);
      }
    }
    setShowButton(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecord(inputs);
    setInputs(inputFields);
    setShowButton(false);
  };

  return (
    <form
      className="jumbotron justify-content-between d-flex pt-0 pb-0"
      onSubmit={handleSubmit}
    >
      <label className="m-2">
        id
        <input name="id" value={inputs.id} onChange={handleInputChange} />
      </label>
      <label className="m-2">
        firstName
        <input
          name="firstName"
          value={inputs.firstName}
          onChange={handleInputChange}
        />
      </label>
      <label className="m-2">
        lastName
        <input
          name="lastName"
          value={inputs.lastName}
          onChange={handleInputChange}
        />
      </label>
      <label className="m-2">
        email
        <input name="email" value={inputs.email} onChange={handleInputChange} />
      </label>
      <label className="m-2">
        phone
        <input name="phone" value={inputs.phone} onChange={handleInputChange} />
      </label>
      {showButton && (
        <button className="btn" type="submit">
          Добавить в таблицу
        </button>
      )}
    </form>
  );
};

export default connect(null, { addRecord })(AddRecord);
