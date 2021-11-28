import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './GradePage.css';
import DragDrop from '../../components/DragDrop/DragDrop';

export default function GradePage() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const { id } = useParams();

  console.log(items);

  const updateItems = (newItems) => {
    setItems(newItems);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDetail = (e) => {
    setDetail(e.target.value);
  };

  const createNewGrade = () => {
    if (detail.length > 0 && title.length > 0) {
      const newData = {
        id: Math.floor(Math.random() * 10000).toString(),
        title,
        detail,
      };
      setTitle('');
      setDetail('');
      setItems([...items, newData]);
    }
  };

  return (
    <div className="GradePage">
      <Link className="link" to={`/courses/${id}`}>
        <CancelOutlinedIcon style={{ fill: 'red' }} />
      </Link>

      <div className="title">
        <h1>Grade Structure</h1>
        <p>Edit your classroom grade structure</p>
      </div>

      <DragDrop items={items} updateItems={updateItems} />

      <div className="formCreator">
        <div className="left">
          <h2>Form Creator</h2>
          <TextField
            value={'' || title}
            label="Grade Title"
            variant="filled"
            onChange={(e) => handleChangeTitle(e)}
          />
          <TextField
            value={'' || detail}
            label="Grade Detail"
            variant="filled"
            onChange={(e) => handleChangeDetail(e)}
          />
        </div>
        <div className="right">
          <Box className="button" onClick={createNewGrade}>
            <AddCircleOutlineIcon style={{ fill: 'white' }} />
          </Box>
        </div>
      </div>
    </div>
  );
}
