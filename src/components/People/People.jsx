import React from 'react';
import './People.css';
import IconButton from '@mui/material/IconButton';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Tooltip from '@mui/material/Tooltip';
import PeopleItem from './PeopleItem';
import BasicModal from '../layouts/BasicModal';
import InviteByEmailsModal from '../InviteByEmailsModal/InviteByEmailsModal';
import MemberRoles from '../../constrain/course';

function People() {
  // const [listStudent, setListStudent] = React.useState([]);
  // const [listLecturer, setListLecturer] = React.useState([]);
  const [openLecturerModal, setOpenLecturerModal] = React.useState(false);
  const [openStudentModal, setOpenStudentModal] = React.useState(false);

  const handleCloseLecturerModal = () => setOpenLecturerModal(false);
  const handleCloseStudentModal = () => setOpenStudentModal(false);
  const handleOpenLecturerModal = () => setOpenLecturerModal(true);
  const handleOpenStudentModal = () => setOpenStudentModal(true);
  const isLecturer = true;
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
        <InviteByEmailsModal handleClose={handleCloseLecturerModal} role={MemberRoles.LECTURER} />
      </BasicModal>
      <BasicModal
        open={openStudentModal}
        handleClose={handleCloseStudentModal}
      >
        <InviteByEmailsModal handleClose={handleCloseStudentModal} role={MemberRoles.STUDENT} />
      </BasicModal>
    </div>
  );
}

export default People;
