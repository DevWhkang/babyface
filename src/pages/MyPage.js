import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderListAction } from '../modules/actions/order';
import OrderList from '../components/OrderList';
import styled from 'styled-components';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import Modal from '../components/common/Modal';
import MyPageDetail from './MyPageDetail';

const MypageWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  background: #fffafa;

  @media screen and (max-width: 414px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.div`
  height: 100%;
  margin-top: 100px;
  align-self: flex-start;
  h1 {
    border-bottom: 2px solid #c8c8c8;
    padding-bottom: 10px;
  }

  @media screen and (max-width: 414px) {
    align-self: center;
    margin-top: 30px;
  }
`;

const Contents = styled.div`
  width: 70vw;
  height: 100%;
  padding-top: 100px;
  margin-left: 50px;
  margin-bottom: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 414px) {
    padding-top: 40px;
    margin-left: 10px;
    width: 95%;
  }
`;

const Pagenation = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #696969;

  h2 {
    margin-right: 5px;
  }
`;

const PageController = styled.div`
  font-size: 30px;
  margin-right: 10px;
  margin-bottom: 10px;
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8c8c8c;
  width: 5vw;

  @media screen and (max-width: 414px) {
    width: 70px;
  }
`;

const PrevButton = styled(MdNavigateBefore)`
  cursor: pointer;
  &:hover {
    color: #db7093;
  }
`;
const NextButton = styled(MdNavigateNext)`
  cursor: pointer;
  &:hover {
    color: #db7093;
  }
`;

const MyPage = ({ history, match }) => {
  const { params } = match;
  const dispatch = useDispatch();
  const { content, currentPage, totalPages } = useSelector(
    (state) => state.order.getOrderListResponse,
  );
  const orderList = content;

  const showModal = useSelector((state) => state.user.showModal);
  const loginResponse = useSelector((state) => state.user.loginResponse);
  const [isExistPrevPage, setIsExistPrevPage] = useState(true);
  const [isExistNextPage, setIsExistNextPage] = useState(true);

  const handleClickPrevPage = () => {
    dispatch(getOrderListAction(currentPage - 1));
  };

  const handleClickNextPage = () => {
    dispatch(getOrderListAction(currentPage + 1));
  };

  useEffect(() => {
    if (0 >= currentPage) {
      setIsExistPrevPage(false);
    } else {
      setIsExistPrevPage(true);
    }

    if (currentPage >= totalPages - 1) {
      setIsExistNextPage(false);
    } else {
      setIsExistNextPage(true);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!showModal) dispatch(getOrderListAction(0));
  }, [dispatch, showModal]);

  useEffect(() => {
    if (!loginResponse) {
      history.push('/');
    }
  }, [loginResponse, history]);

  return showModal ? (
    <>
      {!params.id && !loginResponse && (
        <Modal mode="not-login-alert" errors={{}} history={history} />
      )}
      {params.id && loginResponse && <MyPageDetail id={params.id} />}
    </>
  ) : (
    <MypageWrapper>
      <Title>
        <h1>주문내역</h1>
      </Title>
      <Contents>
        <Pagenation>
          <h2>page</h2>
          <PageController>
            {isExistPrevPage && <PrevButton onClick={handleClickPrevPage} />}
            <h6>{currentPage + 1}</h6>
            {isExistNextPage && <NextButton onClick={handleClickNextPage} />}
          </PageController>
        </Pagenation>
        <OrderList orderList={orderList} />
      </Contents>
    </MypageWrapper>
  );
};

export default MyPage;
