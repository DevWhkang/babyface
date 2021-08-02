import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Slider from '../components/Slider';
import { Button } from '../components/common/GlobalStyles';
import Modal from '../components/common/Modal';
import { changeModalState, changeVisitedState } from '../modules/actions/user';

const HomeWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 91vh;

  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

const Title = styled.h1`
  font-size: 2.5vw;
  line-height: 1.5;
  @media screen and (max-width: 414px) {
    font-size: 25px;
  }
`;

const Description = styled.p`
  margin-top: 1vw;
  line-height: 1.8;
  font-size: 1vw;
  color: #8c8c8c;
  font-weight: bold;

  @media screen and (max-width: 1024px) {
    margin-top: 10px;
    font-size: 15px;
  }
`;

const HomeDescription = styled.section`
  width: 100%;
  height: 100%;
  padding-left: 5vw;
  padding-right: 10vw;
  padding-top: 8vw;
  display: flex;
  flex-direction: column;
  background: rgba(255, 192, 203, 0.2);

  @media screen and (max-width: 1024px) {
    position: absolute;
    background: none;
    height: 92vh;
    padding-left: 60px;
    padding-top: 60vw;
  }

  @media screen and (max-width: 414px) {
    padding-top: 70vw;
    padding-left: 8vw;
  }
`;

const BuyButton = styled.div`
  margin-top: 6vw;

  @media screen and (max-width: 1024px) {
    margin-top: 20px;
  }
`;

const Home = ({ history }) => {
  const dispatch = useDispatch();
  const loginResponse = useSelector((state) => state.user.loginResponse);

  const handleClickAlert = () => {
    dispatch(changeModalState(true));
  };

  useEffect(() => {
    dispatch(changeVisitedState(null));
    if (loginResponse) dispatch(changeModalState(false));
  }, [dispatch, loginResponse]);

  return (
    <HomeWrapper>
      <Slider />
      <HomeDescription>
        <Title>
          베이비페이스, <br />
          세상 쉬운 태교
        </Title>
        <Description>
          입체 초음파에는 아기 얼굴을 추정할 수 있는 단서(눈, 코, 입 등)가
          담겨있습니다. 베이비페이스 AI는 입체 초음파 단서를 분석하여, 생후
          10~50일 이후의 모습을 예측합니다.
        </Description>

        <BuyButton>
          <Button onClick={handleClickAlert} big fontBig>
            구매하기
          </Button>
        </BuyButton>
      </HomeDescription>
      {loginResponse ? (
        <Modal mode="order-success" errors={{}} history={history} />
      ) : (
        <Modal mode="not-login-alert" errors={{}} history={history} />
      )}
    </HomeWrapper>
  );
};

export default Home;
