import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import './AssignmentItem.css';

export default function AssignmentItem({ item, onEdit, onDelete }) {
  const [name, setName] = useState(item.name);
  const [point, setPoint] = useState(item.point);
  const [edit, setEdit] = useState(false);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePoint = (e) => {
    setPoint(e.target.value);
  };

  const submitEdit = () => {
    setEdit(false);
    onEdit(item.id, name, point);
  };

  const submitDelete = () => {
    onDelete(item.id);
  };

  return (
    <div className="assignment">
      <div className="left">
        <TextField
          disabled={!edit}
          value={'' || name}
          label="Name"
          variant="filled"
          onChange={(e) => handleChangeName(e)}
        />
        <TextField
          disabled={!edit}
          value={'' || point}
          label="Point"
          variant="filled"
          onChange={(e) => handleChangePoint(e)}
        />
      </div>
      <div className="right">
        <div className="group-btn">
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
