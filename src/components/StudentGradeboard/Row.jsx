/* eslint-disable comma-dangle */
import React from 'react';
import './Row.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Row({ assignment, assignments }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const data = assignments?.find((item) => item.id === assignment.assignmentId);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="row">
      <div className="container">
        <div className="grade-name">{data?.name}</div>
        <div className="grade-point">{data?.point}</div>
        <div className="your-grade">
          {assignment.point}
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls="long-menu"
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            className="more-button"
          >
            <MoreVertIcon />
          </IconButton>
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
        <MenuItem onClick={handleClose}>Gửi phúc khảo</MenuItem>
      </Menu>
    </div>
  );
}
