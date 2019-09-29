import PropTypes from "prop-types";
import React from "react";
import * as yup from "yup";

import useForm from "../hooks/useForm";
import Toggle from "./Toggle";

const initialValues = {
  email: "",
  name: "",
  phone: "",
  userType: "person"
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup.string().required("Email is required!")
});

function SignUpForm({ className }) {
  const handleSignUp = values => {
    console.log(values);
  };

  const { errors, handleChange, handleSubmit, values } = useForm({
    initialValues,
    onSubmit: handleSignUp,
    schema
  });

  return (
    <div className="section is-fullheight">
      <div className="container">
        <div className="column is-4 is-offset-4">
          <div className="box">
            <form className={className} onSubmit={handleSubmit}>
              <div className="field">
                <input
                  aria-label="Email"
                  className="input"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email"
                  type="email"
                  value={values.email}
                />
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div className="field">
                <Toggle
                  name="userType"
                  onChange={handleChange}
                  option1="robot"
                  option2="person"
                  value={values.userType}
                />
              </div>
              <div className="field">
                <input
                  aria-label="Name"
                  className="input"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  placeholder="Name"
                  type="text"
                  value={values.name}
                />
                {errors.name && <p>{errors.name}</p>}
              </div>
              <div className="field">
                <input
                  aria-label="Phone Number"
                  className="input"
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  placeholder="Phone Number"
                  type="tel"
                  values={values.phone}
                />
              </div>
              <button className="button is-primary" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

SignUpForm.propTypes = {
  className: PropTypes.string
};

export default SignUpForm;
