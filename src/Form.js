import React from 'react';
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

function SignUpForm({ className }) {
  function onSubmit(values) {
    console.log(values);
  }

  const initialValues = {
    email: '',
    name: '',
    phone: '',
    userType: 'person',
  };

  const { values, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
  });

  // TODO: Handle errors

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
                  required
                  type="email"
                  value={values.email}
                />
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
                  required
                  type="text"
                  value={values.name}
                />
              </div>
              <div className="field">
                <input
                  aria-label="Phone Number"
                  className="input"
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  type="tel"
                  values={values.phone}
                />
              </div>
              <button className="button" type="submit">
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
