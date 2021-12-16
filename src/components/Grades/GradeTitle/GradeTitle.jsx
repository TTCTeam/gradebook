import React, { useRef } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { readCSV, writeCSV } from '../../../service/csvFile';
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
  point = '',
  assignmentId = '',
  isName = false,
  isID = false,
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
    const data = [{ cot1: 'Đoàn Minh Tân', cot2: 1 }, { cot1: 0, cot2: 1 }, { cot1: 0, cot2: 1 }];
    const f = ['Student ID', 'Full name'];
    writeCSV('ten file.csv', data, f);
  };

  const handleOnImport = async () => {
    if (csvInputRef) {
      const file = csvInputRef.current.files[0];
      const data = await readCSV(file, ['hehe', 'haha']);
      console.log(data);
    }
  };

  console.log(assignmentId);
  return (
    <div className={nameofclass}>
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
        <MenuItem onClick={openChooseFileDialog}>Import CSV</MenuItem>
        <MenuItem onClick={exportData}>Export CSV</MenuItem>
      </Menu>
      <input ref={csvInputRef} type="file" accept=".csv" style={{ display: 'none' }} onInput={handleOnImport} />
    </div>
  );
}

export default GradeTitle;
