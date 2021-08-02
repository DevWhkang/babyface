import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetailAction } from '../modules/actions/order';
import styled from 'styled-components';

const MypageDetailWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 91vh;
  background: #fffafa;

  @media screen and (max-width: 414px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.div`
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
  padding-top: 200px;
  margin-left: 50px;
  margin-bottom: 120px;

  @media screen and (max-width: 414px) {
    padding-top: 40px;
    margin-left: 10px;
    width: 95%;
  }
`;

const OrderDetail = styled.section`
  border: 1px solid #ffe4e1;
  border-radius: 20px;
  box-shadow: 12px 12px 2px 1px #fffafa;
  height: 100%;
  background: #fff;
  padding: 0 50px;
`;

const Detail = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;

  border-bottom: 1px solid rgba(200, 200, 200, 0.5);
  margin-top: 40px;
  margin-bottom: 40px;
  color: #8c8c8c;
  width: 100%;

  div.item-id {
    padding-bottom: 20px;
  }

  div.item-name {
    padding-bottom: 20px;
  }
`;

const Columns = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #8c8c8c;
`;

const MypageDetail = ({ id }) => {
  const dispatch = useDispatch();
  const orderDetail = useSelector(
    (state) => state.order.getOrderDetailResponse,
  );

  useEffect(() => {
    dispatch(getOrderDetailAction(id));
  }, [dispatch, id]);

  return (
    <MypageDetailWrapper>
      <Title>
        <h1>주문 상세</h1>
      </Title>
      <Contents>
        <OrderDetail>
          <Columns>
            <h2>ID</h2>
            <h2>NAME</h2>
          </Columns>
          <Detail>
            <div className="item-id">{orderDetail.id}</div>
            <div className="item-name">{orderDetail.itemName}</div>
          </Detail>
        </OrderDetail>
      </Contents>
    </MypageDetailWrapper>
  );
};

export default MypageDetail;
