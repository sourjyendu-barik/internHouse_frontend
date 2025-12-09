import React from "react";

const Input = ({ placeholder, name, type, value, onChangeFunction }) => {
  return (
    <div className="mb-2">
      <label htmlFor={name}>{placeholder} :</label>
      <input
        placeholder={`Add ${placeholder}`}
        type={type}
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={onChangeFunction}
        required
      />
    </div>
  );
};

export default Input;
