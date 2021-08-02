import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderListAction } from '../modules/actions/order';
import OrderList from '../components/OrderList';
import styled from 'styled-components';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import Modal from '../components/common/Modal';

const MypageWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  background: #fffafa;
`;

const Title = styled.div`
  height: 100%;
  margin-top: 100px;
  align-self: flex-start;
  h1 {
    border-bottom: 2px solid #c8c8c8;
    padding-bottom: 10px;
  }
`;

const Contents = styled.div`
  width: 50vw;
  height: 100%;
  padding-top: 100px;
  margin-left: 50px;
  margin-bottom: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const MyPage = ({ history }) => {
  const dispatch = useDispatch();
  const { content, currentPage, totalPages } = useSelector(
    (state) => state.order.getOrderListResponse,
  );
  const showModal = useSelector((state) => state.user.showModal);
  const orderList = content;
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
    dispatch(getOrderListAction(0));
    console.log(showModal);
  }, [dispatch, showModal]);

  return showModal ? (
    <Modal mode="not-login-alert" errors={{}} history={history} />
  ) : (
    <MypageWrapper>
      <Title>
        <h1>주문내역</h1>
      </Title>
      <Contents>
        <Pagenation>
          <h2>Page</h2>
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
