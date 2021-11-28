import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import './GradeItem.css';

export default function GradeItem({ item, onEdit, onDelete }) {
  const [title, setTitle] = useState(item.title);
  const [detail, setDetail] = useState(item.detail);
  const [edit, setEdit] = useState(false);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDetail = (e) => {
    setDetail(e.target.value);
  };

  const submitEdit = () => {
    setEdit(false);
    onEdit(item.id, title, detail);
  };

  const submitDelete = () => {
    onDelete(item.id);
  };

  return (
    <div className="GradeItem">
      <div className="left">
        <TextField
          disabled={!edit}
          value={'' || title}
          label="Grade Title"
          variant="filled"
          onChange={(e) => handleChangeTitle(e)}
        />
        <TextField
          disabled={!edit}
          value={'' || detail}
          label="Grade Detail"
          variant="filled"
          onChange={(e) => handleChangeDetail(e)}
        />
      </div>
      <div className="right">
        <div className="listBtn">
          {edit ? (
            <Box className="saveBtn" onClick={submitEdit}>
              <SaveIcon style={{ fill: 'white' }} />
            </Box>
          ) : (
            <Box className="editBtn" onClick={() => setEdit(true)}>
              <EditIcon style={{ fill: 'white' }} />
            </Box>
          )}

          <Box className="removeBtn" onClick={submitDelete}>
            <DeleteIcon style={{ fill: 'white' }} />
          </Box>
        </div>
      </div>
    </div>
  );
}
