import React from 'react';
import { useSelector } from 'react-redux';
import OrderItem from './OrderItem';
import styled from 'styled-components';
import { VscLoading } from 'react-icons/vsc';

const OrderListWrapper = styled.section`
  border: 1px solid #ffe4e1;
  border-radius: 20px;
  box-shadow: 12px 12px 2px 1px #fffafa;
  height: 100%;
  background: #fff;
  padding: 0 50px;
`;

const Columns = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #8c8c8c;
`;

const Loading = styled.div`
  width: 100%;
  height: 91vh;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 50px;
  color: #db7093;

  .spinner {
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const OrderList = ({ orderList }) => {
  const isLoading = useSelector((state) => state.order.requestingGetOrderList);
  return (
    <OrderListWrapper>
      {isLoading ? (
        <Loading>
          <VscLoading className="spinner" />
        </Loading>
      ) : (
        <>
          <Columns>
            <h2>ID</h2>
            <h2>NAME</h2>
          </Columns>
          {orderList.map((item, index) => (
            <OrderItem item={item} key={index} />
          ))}
        </>
      )}
    </OrderListWrapper>
  );
};

export default OrderList;
