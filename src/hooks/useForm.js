import { mapValues, noop, reduce } from "lodash";
import { useState } from "react";

import { set } from "../helpers/util";

const toErrors = errors =>
  reduce(
    errors.inner,
    (result, error) => {
      return { ...result, [error.path]: error.message };
    },
    {}
  );

const useForm = ({
  initialValues,
  onChange = noop,
  onReset = noop,
  onSubmit = noop,
  schema = { validate: () => Promise.resolve() }
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const validate = () => {
    if (schema) {
      return schema
        .validate(values, { abortEarly: false })
        .then(() => {
          setErrors({});
          setIsValid(true);
          return Promise.resolve();
        })
        .catch(errors => {
          const schemaErrors = toErrors(errors);

          setErrors(schemaErrors);
          setIsValid(false);
          return Promise.reject(schemaErrors);
        });
    }

    return Promise.resolve();
  };

  const handleChange = ({ target }) => {
    console.log({ type: target.type, value: target.value });
    const getNewValues = prevValues =>
      set(
        prevValues,
        target.name,
        target.type === "checkbox" || target.type === "radio"
          ? target.checked
          : target.value
      );

    setValues(getNewValues);
    onChange(getNewValues(values));
  };

  const handleReset = () => {
    const clearedValues = mapValues(initialValues, () => "");

    setValues(clearedValues);
    setErrors({});
    onReset(clearedValues);
  };

  const handleSubmit = e => {
    e.preventDefault();

    return validate().then(() => {
      setSubmitCount(submitCount + 1);

      return onSubmit(values);
    });
  };

  return {
    errors,
    handleChange,
    handleSubmit,
    isValid,
    reset: handleReset,
    submitCount,
    validate,
    values
  };
};

export default useForm;
