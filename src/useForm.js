import { useState } from 'react';
import { isEmpty } from 'lodash';

function useForm({ initialValues, onSubmit, validate }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    if (!isValid) return;
    setSubmitCount(submitCount + 1);

    return onSubmit(values);
  }

  function handleChange(e) {
    const newValues = { ...values, [e.target.name]: e.target.value };
    const errors = validate(newValues);

    setIsValid(isEmpty(errors));
    setErrors(errors);

    return setValues(newValues);
  }

  return { errors, isValid, values, handleChange, handleSubmit, submitCount };
}

export default useForm;
