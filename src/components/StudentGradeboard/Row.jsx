/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import './Row.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { createGradeReview } from '../../api/gradeReview';

export default function Row({ assignment, assignments }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [point, setPoint] = useState(0);
  const [explanation, setExplanation] = useState('');

  const { id } = useParams();

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const openMenu = Boolean(anchorEl);
  const data = assignments?.find((item) => item.id === assignment.assignmentId);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    handleOpenModal();
    setAnchorEl(null);
  };

  const handleSendReview = async () => {
    const review = {
      courseId: id,
      assignmentId: assignment.id,
      point,
      explanation,
    };

    const res = await createGradeReview(id, review);
    console.log(res);
    setPoint(0);
    setExplanation('');
    handleClose();
    handleCloseModal();
    console.log(review);
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
            aria-expanded={openMenu ? 'true' : undefined}
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
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Create Grade Review</MenuItem>
      </Menu>
      <Modal open={openModal}>
        <Box className="create-review-modal">
          <div className="modal-title">Create Grade Review</div>
          <div className="field">
            <div className="label">Grade Name</div>
            <div className="content">{data?.name}</div>
          </div>
          <div className="field">
            <div className="label">Grade Point</div>
            <div className="content">{data?.point}</div>
          </div>
          <div className="field">
            <div className="label">Point You Want</div>
            <div className="content input">
              <InputBase
                value={point}
                onChange={(e) => setPoint(e.target.value)}
                type="number"
                sx={{ ml: 1, flex: 1 }}
                placeholder="Point You Want"
              />
            </div>
          </div>
          <div className="field explan">
            <div className="label">Explanation</div>
            <div className="content input">
              <InputBase
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                multiline
                rows={4}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Your Explanation"
              />
            </div>
          </div>
          <div className="action">
            <Button
              onClick={handleCloseModal}
              sx={{ width: 100 }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendReview}
              sx={{ width: 100 }}
              variant="contained"
            >
              Send
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
