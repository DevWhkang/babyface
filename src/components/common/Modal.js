import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import logoImg from '../../assets/images/logo+babyface.png';
import {
  changeModalState,
  loginFailure,
  logoutAction,
} from '../../modules/actions/user';
import { Button } from './GlobalStyles';

const Background = styled.div`
  width: 100%;
  height: 91vh;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: ${({ mode }) => (mode === modalMode.ALERT ? '500px' : '50vw')};
  height: ${({ mode }) => (mode === modalMode.ALERT ? '400px' : '400px')};
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #fffafa;
  display: flex;
  flex-direction: column;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.8;
  height: 100%;

  h1 {
    font-size: 2vw;
    margin-top: 4rem;
    margin-bottom: 3rem;
  }
  p {
    font-size: 1vw;
    margin-bottom: 4rem;
  }

  div.submit__failure-alert {
    display: flex;
  }
  h4.submit__failure-target {
    margin-right: 10px;
    color: #8b0000;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  margin: 20px;
  width: 32px;
  height: 32px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ModalHeaderImg = styled.img`
  width: 180px;
  margin: 15px;
  align-self: center;
`;

const modalMode = {
  NOT_LOGIN_ALERT: 'not-login-alert' || 'NOT_LOGIN_ALERT',
  ORDER_SUCCESS: 'order-success' || 'ORDER_SUCCESS',
  SIGN_UP_VALIDATE: 'sign-up-validate' || 'SIGN_UP_VALIDATE',
  LOGIN_VALIDATE: 'login-validate' || 'LOGIN_VALIDATE',
  SIGN_UP_SUCCESS: 'sign-up-success' || 'SIGN_UP_SUCCESS',
  LOGIN_SUCCESS: 'login-success' || 'LOGIN_SUCCESS',
  LOGOUT: 'logout' || 'LOGOUT',
  // other mode
};

const Modal = ({ mode, errors, history }) => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.user.showModal);

  const errorText = useMemo(() => {
    const sortedError = Object.keys(errors)
      .map((v) => {
        if (v === 'email') return [1, '이메일'];
        else if (v === 'password') return [2, '비밀번호'];
        else if (v === 'confirm-password') return [3, '비밀번호 확인'];
        else if (v === 'mobile') return [4, '연락처'];
        return null;
      })
      .sort((a, b) => a[0] - b[0])
      .slice(0, 1);
    return sortedError.length ? sortedError[0][1] : 0;
  }, [errors]);

  const handleClickModalClose = useCallback(() => {
    dispatch(changeModalState(false));
    if (mode === modalMode.NOT_LOGIN_ALERT) history.push('/login');
    if (mode === modalMode.LOGIN_VALIDATE) dispatch(loginFailure(null));
    if (mode === modalMode.LOGOUT) history.goBack();
    if (mode.includes('success')) history.push('/');
  }, [dispatch, mode, history]);

  const handleClickLogout = useCallback(() => {
    dispatch(logoutAction());
    dispatch(changeModalState(false));
    history.push('/');
  }, [dispatch, history]);

  const modeFilter = useCallback(
    (mode) => {
      switch (mode) {
        case modalMode.NOT_LOGIN_ALERT:
          return (
            <>
              <h1>로그인 후 이용해 주세요.</h1>
              <p>회원이 아니면, 회원가입 해주세요.</p>
            </>
          );
        case modalMode.ORDER_SUCCESS:
          return (
            <>
              <h1>주문 성공!</h1>
              <p>주문해주셔서 감사합니다.</p>
            </>
          );
        case modalMode.SIGN_UP_VALIDATE:
          return (
            <>
              <h1>회원가입 요청에 실패했습니다.</h1>
              <div className="submit__failure-alert">
                <h4 className="submit__failure-target">{errorText}</h4>
                <h4>입력 양식이 올바른지 확인하세요.</h4>
              </div>
            </>
          );
        case modalMode.SIGN_UP_SUCCESS:
          return (
            <>
              <h1>회원가입 완료</h1>
              <h2>환영합니다! 로그인 해주세요.</h2>
            </>
          );
        case modalMode.LOGIN_VALIDATE:
          return (
            <>
              <h1>로그인 요청에 실패했습니다.</h1>
              <div className="submit__failure-alert">
                <h4 className="submit__failure-target">{errorText}</h4>
                <h4>입력 양식이 올바른지 확인하세요.</h4>
              </div>
            </>
          );
        case modalMode.LOGIN_SUCCESS:
          return (
            <>
              <h1>로그인 완료</h1>
              <h2>환영합니다!</h2>
            </>
          );
        case modalMode.LOGOUT:
          return (
            <>
              <h1>정말 로그아웃 하시겠습니까?</h1>
              <Button big fontBig onClick={handleClickLogout}>
                로그아웃
              </Button>
            </>
          );
        default:
          return null;
      }
    },
    [errorText, handleClickLogout],
  );

  return (
    <>
      {showModal ? (
        <Background>
          <ModalWrapper mode={mode} showModal={showModal}>
            <ModalHeader>
              <ModalHeaderImg src={logoImg} alt="logo+babyface" />
              <CloseModalButton onClick={handleClickModalClose} />
            </ModalHeader>
            <ModalContent>{modeFilter(mode)}</ModalContent>
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

export default Modal;
