import React from 'react';
import './People.css';
import IconButton from '@mui/material/IconButton';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Tooltip from '@mui/material/Tooltip';
import PeopleItem from './PeopleItem';

function People() {
  const isTeacher = true;
  return (
    <div className="People">
      <div className="container">
        <div className="teachers">
          <div className="top">
            <p className="title">Teachers</p>
            {isTeacher && (
              <Tooltip title="Invite teachers" arrow>
                <IconButton color="primary" sx={{ width: 50, height: 50 }}>
                  <PersonAddOutlinedIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </Tooltip>
            )}
          </div>

          <div className="listPeople">
            <PeopleItem isTeacher={isTeacher} />
            <PeopleItem isTeacher={isTeacher} />
          </div>
        </div>
        <div className="students">
          <div className="top">
            <p className="title">Students</p>
            {isTeacher && (
              <Tooltip title="Invite students" arrow>
                <IconButton color="primary" sx={{ width: 50, height: 50 }}>
                  <PersonAddOutlinedIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </Tooltip>
            )}
          </div>
          <div className="listPeople">
            <PeopleItem isTeacher={isTeacher} />
            <PeopleItem isTeacher={isTeacher} />
            <PeopleItem isTeacher={isTeacher} />
            <PeopleItem isTeacher={isTeacher} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default People;
