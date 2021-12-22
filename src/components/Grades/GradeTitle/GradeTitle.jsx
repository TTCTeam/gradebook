/* eslint-disable comma-dangle */
import React, { useRef } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './GradeTitle.css';

function cut(name) {
  let newName;
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
  assignment,
  isName = false,
  isID = false,
  handlers,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const csvInputRef = useRef();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let nameofclass = 'grade-title';
  if (isName) nameofclass = 'grade-title-name';
  if (isID) nameofclass = 'grade-title-id';

  const openChooseFileDialog = () => {
    handleClose();
    csvInputRef.current.click();
  };

  const exportData = () => {
    handleClose();
    handlers.onExport();
  };

  const handleOnImport = async () => {
    if (csvInputRef) {
      const file = csvInputRef.current.files[0];
      handlers.onImport(file);
    }
  };

  return (
    <div className={nameofclass}>
      <div className="container">
        <div className="title">{`${cut(name)}`}</div>
        {assignment?.point ? (
          <div className="point">{`${assignment?.point}`}</div>
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
        <MenuItem onClick={openChooseFileDialog}>Import CSV</MenuItem>
        <MenuItem onClick={exportData}>Export CSV</MenuItem>
        <MenuItem>Public for student</MenuItem>
      </Menu>
      <input
        ref={csvInputRef}
        type="file"
        accept=".csv"
        style={{ display: 'none' }}
        onInput={handleOnImport}
      />
    </div>
  );
}

export default GradeTitle;
