import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CreatePost from '../CreatePost/CreatePost';
import Post from '../Post/Post';
import './Stream.css';
import BasicModal from '../layouts/BasicModal';
import InviteLinkModal from '../InviteLinkModal/InviteLinkModal';

const data = [
  {
    id: 1,
    author: 'Ha Minh Cuong',
    date: 'September 14, 2015',
    content:
      'This impressive paella is a perfect party dish and a fun meal to cook together',
  },
  {
    id: 2,
    author: 'Ha Minh Cuong',
    date: 'September 14, 2015',
    content:
      'This impressive paella is a perfect party dish and a fun meal to cook together',
  },
];

function Stream({ course }) {
  const [listPost, setListPost] = React.useState(data);
  const [openModal, setOpenModal] = React.useState(false);

  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  React.useEffect(() => {
    console.log('render');
  }, [listPost]);

  const createPostClick = (post) => {
    console.log(post);
    setListPost([...listPost, post]);
  };

  return (
    <div className="Stream">
      <div className="coverImgContainer">
        <img
          className="coverPhoto"
          alt="coverPhoto"
          src="https://www.gstatic.com/classroom/themes/img_backtoschool.jpg"
        />
        <div className="courseName">{course.name}</div>
        <div className="courseDesc">{course.description}</div>
      </div>
      <div className="contentContainer">
        <div className="left">
          <Button
            className="classCode"
            variant="contained"
            onClick={handleOpenModal}
          >
            Create invite link
          </Button>
          <Card className="Upcoming">
            <Typography variant="h6" color="Black">
              Upcoming
            </Typography>
            <Typography variant="body2" color="rgba(0,0,0,0.549)">
              No work due soon
            </Typography>
          </Card>
        </div>
        <div className="right">
          <CreatePost createPostClick={createPostClick} />
          {listPost.reverse().map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
      <BasicModal open={openModal} handleClose={handleCloseModal}>
        <InviteLinkModal />
      </BasicModal>
    </div>
  );
}

export default Stream;
