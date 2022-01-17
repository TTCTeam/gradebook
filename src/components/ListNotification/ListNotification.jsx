import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import './ListNotification.css';
import { getNotifications } from '../../api/notification';
import { setNotifications } from '../../store/notification/notification-actions';

const haveNewNotifications = true;

export default function ListNotification() {
  const [open, setOpen] = useState('container');
  const notifications = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const onOpen = () => {
    setOpen('open');
  };

  const onClose = () => {
    setOpen('container');
  };

  console.log(notifications);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getNotifications();
      if (res.status === 200) {
        console.log(res.data);
        dispatch(setNotifications(res.data));
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="list-notification">
      <IconButton
        color="inherit"
        sx={{ color: 'red', marginRight: '10px' }}
        onClick={onOpen}
        onBlur={onClose}
      >
        {haveNewNotifications ? (
          <NotificationsActiveIcon />
        ) : (
          <NotificationsNoneIcon sx={{ marginRight: '10px' }} />
        )}
      </IconButton>
      <div className={open}>
        <div className="box">
          <div className="title">Notifications</div>
          <div className="content">
            {!notifications.length
            && <div style={{ color: 'black' }}>There is no notification.</div>}
            {notifications.map((notification, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="item" key={index}>
                <div className="left">
                  <div className="item__content">{notification.content}</div>
                </div>
                <div className="createdAt">
                  {moment(notification.createdAt).format('HH:mm DD/MM/YYYY')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
