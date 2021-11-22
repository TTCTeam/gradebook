import React from 'react';
import './People.css';
import IconButton from '@mui/material/IconButton';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Tooltip from '@mui/material/Tooltip';
import PeopleItem from './PeopleItem';

function People({ isLecturer, id }) {
  console.log(id);
  return (
    <div className="People">
      <div className="container">
        <div className="teachers">
          <div className="top">
            <p className="title">Teachers</p>
            {isLecturer && (
              <Tooltip title="Invite teachers" arrow>
                <IconButton color="primary" sx={{ width: 50, height: 50 }}>
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
                <IconButton color="primary" sx={{ width: 50, height: 50 }}>
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
    </div>
  );
}

export default People;
