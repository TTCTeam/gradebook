import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './AssignmentPage.css';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';
import DragDrop from '../../components/DragDrop/DragDrop';
import { createAssignment, getAllAssignment } from '../../api/assignmentAPI';

function findMaxOrder(list) {
  return list.reduce((initOrder, item) => Math.max(initOrder, item.order), 1);
}

export default function AssignmentPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [point, setPoint] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const createNewAssignment = async () => {
    if (point.length > 0 && name.length > 0) {
      setIsLoading(true);
      const newAssignment = {
        name,
        point,
        order: findMaxOrder(items) + 1,
      };
      const res = await createAssignment(id, newAssignment);
      if (res.status === 201) {
        updateItems(items.concat(res.data));
        setName('');
        setPoint('');
      } else {
        // eslint-disable-next-line
        alert('Create failed!');
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchAssignments = async (courseId) => {
      setIsLoading(true);
      const res = await getAllAssignment(courseId);
      if (res.status === 200) {
        setItems(res.data);
      }
      setIsLoading(false);
    };

    fetchAssignments(id);
  }, []);

  return (
    <div className="AssignmentPage">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
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
            value={name}
            label="Name"
            variant="filled"
            onChange={(e) => handleChangeName(e)}
          />
          <TextField
            value={point}
            type="number"
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
