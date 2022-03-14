import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { Backdrop, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CreatePost from '../CreatePost/CreatePost';
import './Stream.css';
import BasicModal from '../layouts/BasicModal';
import InviteLinkModal from '../InviteLinkModal/InviteLinkModal';
import MemberRoles from '../../constant/course';
import { getAllAssignment } from '../../api/assignmentAPI';
import { sortByField } from '../../utils/common';

function Stream({ classroom }) {
  const [assignments, setAssignments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { url } = useRouteMatch();
  const { course, role } = classroom;

  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  useEffect(() => {
    const fetchAssignments = async (courseId) => {
      setIsLoading(true);
      const res = await getAllAssignment(courseId);
      if (res.status === 200) {
        setAssignments(res.data);
      }

      setIsLoading(false);
    };

    fetchAssignments(id);
  }, []);

  return (
    <div className="Stream">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
      <div className="coverImgContainer">
        <img
          className="coverPhoto"
          alt="coverPhoto"
          src="https://www.gstatic.com/classroom/themes/img_backtoschool.jpg"
        />
        <div className="courseName">{course?.name}</div>
        <div className="courseDesc">{course?.description}</div>
      </div>
      <div className="contentContainer">
        <div className="left">
          {(role === MemberRoles.OWNER || role === MemberRoles.LECTURER) && (
            <Button
              className="classCode"
              variant="contained"
              onClick={handleOpenModal}
            >
              Create invite link
            </Button>
          )}
          {role === MemberRoles.STUDENT ? (
            <Card className="Upcoming">
              <h4>Assignment Structure</h4>
              <div className="listStructure">
                {sortByField(assignments, 'order').map((assignment) => (
                  <div className="item" key={assignment.id}>
                    <p>
                      {`${assignment.name}: `}
                      <span>{assignment.point}</span>
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <Link to={`${url}/assignment/edit`}>
              <Card className="Upcoming">
                <h4>Assignment Structure</h4>
                <div className="listStructure">
                  {sortByField(assignments, 'order').map((assignment) => (
                    <div className="item" key={assignment.id}>
                      <p>
                        {`${assignment.name}: `}
                        <span>{assignment.point}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </Link>
          )}
        </div>
        <div className="right">
          <CreatePost />
        </div>
      </div>
      <BasicModal open={openModal} handleClose={handleCloseModal}>
        <InviteLinkModal />
      </BasicModal>
    </div>
  );
}

export default Stream;
