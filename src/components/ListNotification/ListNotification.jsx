import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import moment from 'moment';
import './ListNotification.css';
import { ListNotificationData } from '../../api/notification';

const haveNewNotifications = true;

export default function ListNotification() {
  const [open, setOpen] = useState('container');

  console.log(open);

  const Open = () => {
    if (open === 'container') {
      setOpen('open');
    } else {
      setOpen('container');
    }
  };

  return (
    <div className="list-notification">
      <IconButton
        color="inherit"
        sx={{ color: 'red', marginRight: '10px' }}
        onClick={Open}
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
            {ListNotificationData.map((item) => (
              <div className="item" key={item.id}>
                <div className="left">
                  <div className="item__content">{item.content}</div>
                </div>
                <div className="createdAt">
                  {moment(item.createdAt).format('DD/MM/YYYY')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
