import React from 'react';
import { isEmpty } from 'lodash';
import useForm from './useForm';

function Toggle({ name, onChange, option1, option2, value }) {
  return (
    <>
      <label className="radio">
        <input
          checked={value === option1}
          onChange={onChange}
          type="radio"
          id={option1}
          name={name}
          value={option1}
        />
        {option1}
      </label>
      <label className="radio">
        <input
          checked={value === option2}
          onChange={onChange}
          type="radio"
          id={option2}
          name={name}
          value={option2}
        />
        {option2}
      </label>
    </>
  );
}

function validate(values) {
  let errors = {};

  if (isEmpty(values.email))
    errors = { ...errors, email: 'Email address is required!' };
  if (isEmpty(values.name)) errors = { ...errors, name: 'Name is required!' };
  if (values.userType === 'robot')
    errors = { ...errors, userType: 'No robots allowed! :( :(' };

  return errors;
}

function SignUpForm({ className }) {
  function onSubmit(values, errors) {
    console.log(values);
  }

  const initialValues = {
    email: '',
    name: '',
    phone: '',
    userType: 'person',
  };

  const {
    errors,
    isValid,
    values,
    handleChange,
    handleSubmit,
    submitCount,
  } = useForm({
    initialValues,
    onSubmit,
    validate,
  });

  const showErrors = !isValid && submitCount > 0;

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
                {showErrors && errors.email && <p>{errors.email}</p>}
              </div>
              <div className="field">
                <Toggle
                  name="userType"
                  onChange={handleChange}
                  option1="robot"
                  option2="person"
                  value={values.userType}
                />
                {showErrors && errors.userType && <p>{errors.userType}</p>}
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
                {showErrors && errors.name && <p>{errors.name}</p>}
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
              <button
                className="button is-primary"
                disabled={!isValid}
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
