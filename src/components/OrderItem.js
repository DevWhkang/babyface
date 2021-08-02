import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { changeModalState } from '../modules/actions/user';

const OrderItemWrapper = styled.div`
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
`;

const DetailLink = styled(Link)`
  padding-bottom: 20px;
  color: #db7093;
`;

const OrderItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleClickDeital = () => {
    dispatch(changeModalState(true));
  };
  return (
    <OrderItemWrapper>
      <div className="item-id">{item.id}</div>
      <DetailLink
        onClick={handleClickDeital}
        to={`/mypage/order/${item.id}`}
        className="item-name"
      >
        {item.itemName}
      </DetailLink>
    </OrderItemWrapper>
  );
};

export default OrderItem;
