import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CreatePost from '../CreatePost/CreatePost';
import Post from '../Post/Post';
import './Stream.css';

const data = [
  {
    id: 1,
    author: 'Ha Minh Cuong',
    date: 'September 14, 2015',
    content:
      'This impressive paella is a perfect party dish and a fun meal to cook together',
  },
];

function Stream({ id }) {
  const [listPost, setListPost] = React.useState(data);

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
        <div className="courseName">PTUDWNC - 18_3</div>
        <div className="courseDesc">PTUDWNC</div>
      </div>
      <div className="contentContainer">
        <div className="left">
          <Card className="classCode">
            <Typography variant="h6" color="black">
              Class code
            </Typography>
            <Typography className="code" variant="h5" color="#1976d2">
              {id}
            </Typography>
          </Card>
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
    </div>
  );
}

export default Stream;
