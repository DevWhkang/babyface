import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import validate from '../modules/validateInfo';
import InputItem from '../components/common/InputItem';
import { Button } from '../components/common/GlobalStyles';
import useForm from '../modules/hooks/useForm';
import Modal from '../components/common/Modal';

const Background = styled.div`
  width: 100%;
  height: 91vh;
  background: #fffafa;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginWrapper = styled.section`
  width: 40vw;
  height: 700px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  border: 2px solid #fffafa;
  border-radius: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: #696969;
    margin-bottom: 3rem;
    font-size: 30px;
  }

  form {
    width: 70%;
  }

  @media screen and (max-width: 414px) {
    width: 100%;
    height: 100%;

    form {
      width: 80%;
      height: 70%;
    }
  }
`;

const LoginBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const inputList = [
  {
    id: 'email',
    type: 'email',
    name: 'Email',
    placeholder: '이메일을 입력하세요.',
  },
  {
    id: 'password',
    type: 'password',
    name: 'Password',
    placeholder: '비밀번호를 입력하세요.',
  },
  {
    id: 'confirm-password',
    type: 'password',
    name: 'Confirm',
    placeholder: '한번 더 비밀번호를 입력하세요.',
  },
];

const Login = ({ history }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    validate,
    history,
    'login',
  );

  const loginResponse = useSelector((state) => state.user.loginResponse);
  const loginFailureResponse = useSelector(
    (state) => state.user.loginFailureResponse,
  );

  const [errorText, setErrorText] = useState();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      console.log(inputRef.current);
      inputRef.current.focus();
    }
  }, [errorText]);

  return (
    <Background>
      {!loginResponse || loginFailureResponse ? (
        <Modal
          mode="login-validate"
          errors={errors}
          history={history}
          handleChangeErrorText={setErrorText}
        />
      ) : (
        <Modal
          mode="login-success"
          errors={errors}
          history={history}
          handleChangeErrorText={setErrorText}
        />
      )}
      <LoginWrapper>
        <h1>로그인</h1>
        <form onSubmit={(e) => handleSubmit(e, 'login')}>
          {inputList.map((input, index) => (
            <InputItem
              key={index}
              input={input}
              values={values}
              errors={errors}
              handleChange={handleChange}
              inputRef={inputRef}
              errorText={errorText}
            />
          ))}
          <LoginBtn>
            <Button type="submit">로그인</Button>
          </LoginBtn>
        </form>
      </LoginWrapper>
    </Background>
  );
};

export default Login;
