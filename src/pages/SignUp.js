import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/common/GlobalStyles';
import useForm from '../modules/hooks/useForm';
import validate from '../modules/validateInfo';
import Modal from '../components/common/Modal';
import { useSelector } from 'react-redux';
import InputItem from '../components/common/InputItem';

const Background = styled.div`
  width: 100%;
  height: 91vh;
  background: #fffafa;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpWrapper = styled.section`
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
  font-size: 1vw;

  h1 {
    color: #696969;
    margin-bottom: 3rem;
    font-size: 2vw;
  }

  form {
    width: 70%;
  }
`;

const SignUpBtn = styled.div`
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
  {
    id: 'mobile',
    type: 'mobile',
    name: 'Mobile',
    placeholder: '연락처를 입력하세요.',
  },
];

const SignUp = ({ history }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    validate,
    history,
    'sign-up',
  );
  const signUpResponse = useSelector((state) => state.user.signUpResponse);
  const showModal = useSelector((state) => state.user.showModal);

  return (
    <Background>
      {signUpResponse && showModal ? (
        <Modal mode="sign-up-success" errors={errors} history={history} />
      ) : (
        <Modal mode="sign-up-validate" errors={errors} history={history} />
      )}
      <SignUpWrapper>
        <h1>회원가입</h1>
        <form onSubmit={(e) => handleSubmit(e, 'sign-up')}>
          {inputList.map((input, index) => (
            <InputItem
              key={index}
              input={input}
              values={values}
              errors={errors}
              handleChange={handleChange}
            />
          ))}
          <SignUpBtn>
            <Button type="submit">가입하기</Button>
          </SignUpBtn>
        </form>
      </SignUpWrapper>
    </Background>
  );
};

export default SignUp;
