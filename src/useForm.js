import { useState } from 'react';

function useForm({ initialValues, onSubmit }) {
  const [values, setValues] = useState(initialValues);

  function handleSubmit(e) {
    e.preventDefault();
    return onSubmit(values);
  }

  function handleChange(e) {
    return setValues({ ...values, [e.target.name]: e.target.value });
  }

  return { values, handleChange, handleSubmit };
}

export default useForm;
