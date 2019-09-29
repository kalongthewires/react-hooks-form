import PropTypes from "prop-types";
import React from "react";

function Toggle({ name, onChange, option1, option2, value }) {
  const handleChange = ({ target }) => {
    onChange({
      target: {
        name,
        value: target.value
      }
    });
  };

  return (
    <>
      <input
        checked={value === option1}
        id={option1}
        name={name}
        onChange={handleChange}
        type="radio"
        value={option1}
      />
      <label
        className="radio"
        htmlFor={option1}
        style={{ paddingLeft: "0.5rem", paddingRight: "1rem" }}
      >
        {option1}
      </label>
      <input
        checked={value === option2}
        id={option2}
        name={name}
        onChange={handleChange}
        type="radio"
        value={option2}
      />
      <label
        className="radio"
        htmlFor={option2}
        style={{ paddingLeft: "0.5rem" }}
      >
        {option2}
      </label>
    </>
  );
}

Toggle.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  option1: PropTypes.string.isRequired,
  option2: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default Toggle;
