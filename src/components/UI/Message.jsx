import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/modal-action';
import Modal from './Modal';

const Message = ({ message }) => {
  const dispatch = useDispatch();
  const onCloseHandler = () => {
    dispatch(closeModal());
  };
  return (
    <Modal onClose={onCloseHandler}>
      <h3>{message}</h3>
      <Button variant="contained" onClick={onCloseHandler}>
        Close
      </Button>
    </Modal>
  );
};

export default Message;
