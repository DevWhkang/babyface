import React from 'react';
import Modal from '../components/common/Modal';

const Logout = ({ history }) => {
  return <Modal mode="logout" errors={{}} history={history} />;
};

export default Logout;
