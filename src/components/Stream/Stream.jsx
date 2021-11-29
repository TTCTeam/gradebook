import * as React from 'react';
import Card from '@mui/material/Card';
import { Link, useRouteMatch } from 'react-router-dom';
import Button from '@mui/material/Button';
import CreatePost from '../CreatePost/CreatePost';
import './Stream.css';
import BasicModal from '../layouts/BasicModal';
import InviteLinkModal from '../InviteLinkModal/InviteLinkModal';
import MemberRoles from '../../constant/course';

function Stream({ classroom }) {
  const init = [
    {
      id: '1',
      name: 'name1',
      point: 'Item 1',
    },
    {
      id: '2',
      name: 'name2',
      point: 'Item 2',
    },
    {
      id: '3',
      name: 'name3',
      point: 'Item 3',
    },
  ];
  const [openModal, setOpenModal] = React.useState(false);
  const items = init;
  const { url } = useRouteMatch();

  const { course, role } = classroom;

  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  return (
    <div className="Stream">
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
          <Link to={`${url}/assignment/edit`}>
            <Card className="Upcoming">
              <h4>Assignment Structure</h4>
              <div className="listStructure">
                {items.map((item) => (
                  <div className="item" key={item.id}>
                    <p>
                      {`${item.name}: `}
                      <span>{item.point}</span>
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </Link>
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
