import * as React from 'react';
import CreatePost from '../CreatePost/CreatePost';
import Post from '../Post/Post';
import './Stream.css';

function Stream() {
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

      <CreatePost />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default Stream;
