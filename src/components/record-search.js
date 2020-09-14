import React from "react";

import { connect } from "react-redux";
import { setSearchString } from "../redux/actions";

const RecordSearch = ({ setSearchString }) => {
  return (
    <label>
      Поиск
      <input
        className="m-2"
        onChange={(e) => setSearchString(e.target.value)}
      />
    </label>
  );
};

export default connect(null, { setSearchString })(RecordSearch);
