import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;

  div.input {
    width: 100%;
  }

  label {
    margin-top: 8px;
    width: 30%;
    color: #696969;
  }

  p {
    margin-bottom: 2rem;
  }

  p.validation {
    color: #db7093;
    margin-top: 10px;
    font-size: 0.7vw;
    margin-left: 12px;
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
  font-size: 0.8vw;
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
`;

const InputItem = ({ input, values, errors, handleChange }) => {
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
