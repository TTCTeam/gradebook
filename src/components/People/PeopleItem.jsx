import React from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './PeopleItem.css';
import MemberRoles from '../../constrain/course';

export default function PeopleItem({ people, role }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const isLecturer = role === MemberRoles.LECTURER || role === MemberRoles.OWNER;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div className="PeopleItem">
        <div className="left">
          <Avatar sx={{ bgcolor: deepOrange[500] }} />
          <div className="name">{`${people.firstname} ${people.lastname}`}</div>
        </div>
        <div className="right">
          {isLecturer && (
            <IconButton
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ width: 50, height: 50 }}
            >
              <MoreVertIcon sx={{ fontSize: 30 }} />
            </IconButton>
          )}
        </div>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Kick</MenuItem>
      </Menu>
    </div>
  );
}
