/* eslint-disable no-alert */
/* eslint-disable comma-dangle */
import React, { useRef, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssignmentStatus from '../../../constant/gradeboard';
import { publicAssignment } from '../../../api/assignmentAPI';
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
  updateStudents,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const csvInputRef = useRef();
  const [status, setStatus] = useState(assignment?.status);

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
    handlers?.onExport();
  };

  const handleOnImport = async () => {
    if (csvInputRef) {
      const file = csvInputRef.current.files[0];
      handlers?.onImport(file);
    }
  };

  const onPublicGradeColumn = async () => {
    const assignmentId = assignment.id;
    const res = await publicAssignment(assignmentId);
    if (res.status === 200) {
      setStatus(AssignmentStatus.PUBLIC);
      handleClose();
      alert('Mark as finalized');
    } else {
      alert('Edit failed!');
    }
    updateStudents();
  };

  const onDraftGradeColumn = async () => {
    const assignmentId = assignment.id;
    const item = { ...assignment, status: AssignmentStatus.DRAFT };
    const res = await updateAssignment(id, assignmentId, item);
    if (res.status === 200) {
      setStatus(AssignmentStatus.DRAFT);
      handleClose();
      alert('You can edit this grade');
    } else {
      alert('Edit failed!');
    }
    updateStudents();
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
        {status === AssignmentStatus.DRAFT ? (
          <MenuItem onClick={onPublicGradeColumn}>Mark as finalized</MenuItem>
        ) : (
          <MenuItem onClick={onDraftGradeColumn}>Edit</MenuItem>
        )}
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
