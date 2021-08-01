import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
`;

const Empty = styled.div`
  margin-top: 5.5vh;
`;

const InputItem = ({ input, values, errors, handleChange }) => {
  return (
    <InputWrapper>
      <label htmlFor="name">{input.name}</label>
      <div className="input">
        <input
          id={input.id}
          type={input.type}
          name={input.name}
          placeholder={input.placeholder}
          value={values[input.id] || ''}
          onChange={handleChange}
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
