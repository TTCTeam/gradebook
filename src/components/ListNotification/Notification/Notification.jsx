import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../../socket';
import { addNotification } from '../../../store/notification/notification-actions';
import './Notification.css';

function Notification() {
  const [className, setClassName] = useState('notification off');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [noti, setNoti] = useState();

  useEffect(() => {
    const { userId } = auth;
    const ss = JSON.parse(localStorage.getItem('socketSession'));
    console.log(ss);
    socket.auth = ss ?? { userId };
    socket.connect();
    socket.on('connect_error', (err) => {
      if (err.message === 'invalid userId') {
        console.log(err.message);
      }
    });
    socket.on('session', (session) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = session;
      // store it in the localStorage
      localStorage.setItem('socketSession', JSON.stringify(session));
    });

    socket.on('notification', (notification) => {
      setClassName('notification');
      setNoti(notification);
      console.log(notification);
      dispatch(addNotification(notification));
      setTimeout(() => {
        setClassName('notification off');
      }, 5000);
    });

    return () => {
      socket.removeAllListeners();
    };
  });
  return (
    <div className={className}>
      <div>
        <h3>{noti?.title}</h3>
        <div>{noti?.content}</div>
      </div>
    </div>
  );
}

export default Notification;
