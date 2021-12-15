/* eslint-disable object-curly-newline */
import React from 'react';
import './GradeTitle.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function cut(name) {
  let newName = '';
  if (name.length > 13) {
    newName = name.substr(0, 13);
    newName += '...';
  } else {
    newName = name;
  }
  return newName;
}

function GradeTitle({
  name,
  point = '',
  assignmentId = '',
  width,
  isID = false,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(assignmentId);
  return (
    <div className="grade-title" style={{ width }}>
      <div className="container">
        <div className="title">{`${cut(name)}`}</div>
        {point ? (
          <div className="point">{`${point}`}</div>
        ) : (
          <div className="point"> </div>
        )}
        {!isID && (
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
        )}
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
        <MenuItem onClick={handleClose}>Import CSV</MenuItem>
        <MenuItem onClick={handleClose}>Export CSV</MenuItem>
      </Menu>
    </div>
  );
}

export default GradeTitle;
