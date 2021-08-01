import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signUpAction, loginAction, changeModalState } from '../actions/user';

const useForm = (validate, history, mode) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({});

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues({
      ...values,
      [id]: value,
    });
  };

  const handleSubmit = (e, mode) => {
    e.preventDefault();
    if (!Object.keys(errors).length && mode === 'sign-up') {
      dispatch(signUpAction(values));
      dispatch(changeModalState(true));
    } else if (
      !errors.email &&
      !errors['confirm-password'] &&
      mode === 'login'
    ) {
      dispatch(loginAction(values));
      dispatch(changeModalState(true));
    } else {
      dispatch(changeModalState(true));
    }
  };

  useEffect(() => {
    setErrors(validate(values, mode));
  }, [values, validate, mode]);

  return { values, errors, handleChange, handleSubmit };
};

export default useForm;
