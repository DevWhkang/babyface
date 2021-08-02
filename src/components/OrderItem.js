import React from 'react';
import styled from 'styled-components';

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
  div.item-name {
    padding-bottom: 20px;
  }
`;

const OrderItem = ({ item }) => {
  return (
    <OrderItemWrapper>
      <div className="item-id">{item.id}</div>
      <div className="item-name">{item.itemName}</div>
    </OrderItemWrapper>
  );
};

export default OrderItem;
