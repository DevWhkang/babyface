import React from 'react';
import styled from 'styled-components';
import { mapErrorText } from '../../pages/SignUp';

const InputWrapper = styled.div`
  display: flex;
  font-size: 15px;

  div.input {
    width: 100%;
  }

  label {
    margin-top: 15px;
    width: 50%;
    color: #696969;
  }

  p {
    margin-bottom: 2rem;
  }

  p.validation {
    color: #db7093;
    margin-top: 10px;
    margin-left: 12px;
    font-size: 10px;
  }
`;

const Empty = styled.div`
  margin-top: 5.5vh;
`;

const Input = styled.input`
  width: 100%;
  border: 0;
  border-bottom: 2px solid #db7093;
  outline: 0;
  font-size: 15px;
  color: #8c8c8c;
  padding: 7px 0;
  text-indent: 7px;

  &:focus {
    border: ${({ error }) => (error ? '2px solid rgba(204, 0, 0, 0.5)' : null)};
    border-radius: ${({ error }) => (error ? '10px' : null)};
    box-shadow: ${({ error }) =>
      error ? '0 0 5px 1px rgba(204, 0, 0, 0.9)' : null};
  }

  &::placeholder {
    color: #c8c8c8;
    padding-left: 5px;
  }

  @media screen and (max-width: 414px) {
    &::placeholder {
      font-size: 10px;
    }
  }
`;

const InputItem = ({
  input,
  values,
  errors,
  handleChange,
  inputRef,
  errorText,
}) => {
  return (
    <InputWrapper>
      <label htmlFor="name">{input.name}</label>
      <div className="input">
        <Input
          id={input.id}
          type={input.type}
          name={input.name}
          placeholder={input.placeholder}
          value={values[input.id] || ''}
          onChange={handleChange}
          error={errors[input.id]}
          ref={mapErrorText[errorText] === input.id ? inputRef : null}
        />

        {errors[input.id] ? (
          <p className="validation">{errors[input.id]}</p>
        ) : (
          <Empty />
        )}
      </div>
    </InputWrapper>
  );
};

export default InputItem;
