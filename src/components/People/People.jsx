import React from 'react';
import './People.css';
import IconButton from '@mui/material/IconButton';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Tooltip from '@mui/material/Tooltip';
import PeopleItem from './PeopleItem';
import InviteLecturersModal from '../InviteLecturersModal/InviteLecturersModal';
import BasicModal from '../layouts/BasicModal';
import InviteStudentsModal from '../InviteStudentsModal/InviteStudentsModal';

function People({ isLecturer, id }) {
  // const [listStudent, setListStudent] = React.useState([]);
  // const [listLecturer, setListLecturer] = React.useState([]);
  const [openLecturerModal, setOpenLecturerModal] = React.useState(false);
  const [openStudentModal, setOpenStudentModal] = React.useState(false);

  const handleCloseLecturerModal = () => setOpenLecturerModal(false);
  const handleCloseStudentModal = () => setOpenStudentModal(false);
  const handleOpenLecturerModal = () => setOpenLecturerModal(true);
  const handleOpenStudentModal = () => setOpenStudentModal(true);
  console.log(id);
  return (
    <div className="People">
      <div className="container">
        <div className="teachers">
          <div className="top">
            <p className="title">Lecturers</p>
            {isLecturer && (
              <Tooltip title="Invite lecturers" arrow>
                <IconButton
                  onClick={handleOpenLecturerModal}
                  color="primary"
                  sx={{ width: 50, height: 50 }}
                >
                  <PersonAddOutlinedIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </Tooltip>
            )}
          </div>

          <div className="listPeople">
            <PeopleItem isLecturer={isLecturer} />
            <PeopleItem isLecturer={isLecturer} />
          </div>
        </div>
        <div className="students">
          <div className="top">
            <p className="title">Students</p>
            {isLecturer && (
              <Tooltip title="Invite students" arrow>
                <IconButton
                  onClick={handleOpenStudentModal}
                  color="primary"
                  sx={{ width: 50, height: 50 }}
                >
                  <PersonAddOutlinedIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </Tooltip>
            )}
          </div>
          <div className="listPeople">
            <PeopleItem isLecturer={isLecturer} />
            <PeopleItem isLecturer={isLecturer} />
            <PeopleItem isLecturer={isLecturer} />
            <PeopleItem isLecturer={isLecturer} />
          </div>
        </div>
      </div>
      <BasicModal
        open={openLecturerModal}
        handleClose={handleCloseLecturerModal}
      >
        <InviteLecturersModal handleClose={handleCloseLecturerModal} />
      </BasicModal>
      <BasicModal open={openStudentModal} handleClose={handleCloseStudentModal}>
        <InviteStudentsModal handleClose={handleCloseStudentModal} />
      </BasicModal>
    </div>
  );
}

export default People;
