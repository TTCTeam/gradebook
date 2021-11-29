import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './AssignmentPage.css';
import DragDrop from '../../components/DragDrop/DragDrop';
import { getListAssignment, createAssignmentMockApi } from './mock';

function findMaxOrder(list) {
  return list.reduce((initOrder, item) => Math.max(initOrder, item.order), 1);
}

export default function AssignmentPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [point, setPoint] = useState('');
  const { id } = useParams();

  const updateItems = (newItems) => {
    console.log(newItems);
    setItems(newItems);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePoint = (e) => {
    setPoint(e.target.value);
  };

  const createNewAssignment = () => {
    if (point.length > 0 && name.length > 0) {
      const newData = {
        name,
        point,
        order: findMaxOrder(items) + 1,
      };
      // call api create new Assignment
      const newAssignment = createAssignmentMockApi(newData);
      updateItems(items.concat(newAssignment));
      setName('');
      setPoint('');
    }
  };

  useEffect(async () => {
    const listAssignment = getListAssignment();
    setItems(listAssignment);
  }, []);

  return (
    <div className="AssignmentPage">
      <Link className="link" to={`/courses/${id}`}>
        <CancelOutlinedIcon style={{ fill: 'red' }} />
      </Link>

      <div className="title">
        <h1>Assignment Structure</h1>
        <p>Edit your classroom assignment structure</p>
      </div>

      <DragDrop items={items} updateItems={updateItems} />

      <div className="formCreator">
        <div className="left">
          <h2>Form Creator</h2>
          <TextField
            value={'' || name}
            label="Name"
            variant="filled"
            onChange={(e) => handleChangeName(e)}
          />
          <TextField
            value={'' || point}
            label="Point"
            variant="filled"
            onChange={(e) => handleChangePoint(e)}
          />
        </div>
        <div className="right">
          <Box className="button" onClick={createNewAssignment}>
            <AddCircleOutlineIcon style={{ fill: 'white' }} />
          </Box>
        </div>
      </div>
    </div>
  );
}
