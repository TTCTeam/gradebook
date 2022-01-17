/* eslint-disable operator-linebreak */
/* eslint-disable prefer-template */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import InputBase from '@mui/material/InputBase';
import moment from 'moment';
import { Avatar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { getUserProfile } from '../../store/auth/auth-actions';
import { getCourse } from '../../api/courseAPI';
import './GradeReviewDetail.css';
import MemberRoles from '../../constant/course';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const data = {
  id: 1,
  title: 'Review 1',
  date: '2020-01-01',
  student: 'Hà Minh Cường',
  studentId: '18120297',
  gradeCompisition: 'Cột 1',
  currentPoint: '10',
  expectedPoint: '50',
  explanation: 'Em đã làm đủ rồi',
};

export default function GradeReviewDetail() {
  const [review, setReview] = useState({});
  const [classroom, setClassroom] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [point, setPoint] = useState(0);

  const dispatch = useDispatch();

  const { role, course } = classroom;

  const profile = useSelector((state) => state.auth);

  const { courseId, gradeReivewId } = useParams();

  useEffect(() => {
    const fetchClassroom = async (id) => {
      const res = await getCourse(id);
      setClassroom(res.data);
    };
    if (!profile.firstname) {
      dispatch(getUserProfile());
    }

    fetchClassroom(courseId);
    setReview(data);
  }, []);

  useEffect(() => {
    setPoint(review.currentPoint);
  }, [review]);

  const addNewComment = () => {
    if (comment !== '') {
      const newData = {
        id: comments.length + 1,
        comment: comment.trim(),
        user: profile.firstname + ' ' + profile.lastname,
        createdAt: new Date().toJSON(),
      };

      console.log(gradeReivewId);
      setComments([...comments, newData]);
      setComment('');
    }
  };

  return (
    <div className="grade-review-detail">
      <div className="container">
        <div className="title">
          <Link className="link" to={`/courses/${courseId}/grade-review`}>
            Back to List Grade Review of
            <span>{` ${course?.name}`}</span>
          </Link>
          <h2>Grade Review Detail</h2>
        </div>
        <div className="information">
          {role === MemberRoles.STUDENT ? (
            <></>
          ) : (
            <div className="change-point">
              <div className="change-point-title">Enter the final point</div>
              <InputBase
                value={point || 0}
                onChange={(e) => setPoint(e.target.value)}
                type="number"
                className="field"
              />
              <Button variant="contained">Update</Button>
            </div>
          )}
          <div className="infor__title">Information</div>
          <hr />
          <div className="information__row">
            <div className="title">Title:</div>
            <div className="content">{review.title}</div>
          </div>
          <div className="information__row">
            <div className="title">Student Name:</div>
            <div className="content">{review.student}</div>
          </div>
          <div className="information__row">
            <div className="title">Student ID:</div>
            <div className="content">{review.studentId}</div>
          </div>
          <div className="information__row">
            <div className="title">Grade Composition:</div>
            <div className="content">{review.gradeCompisition}</div>
          </div>
          <div className="information__row">
            <div className="title">Current Point:</div>
            <div className="content">{review.currentPoint}</div>
          </div>
          <div className="information__row">
            <div className="title">Expected Point:</div>
            <div className="content">{review.expectedPoint}</div>
          </div>
          <div className="information__row">
            <div className="title">Explanation:</div>
            <div className="content">{review.explanation}</div>
          </div>
        </div>

        <div className="information">
          <div className="infor__title">List Comment</div>
          <hr />
          <div className="comment-list">
            {comments.map((item) => (
              <div className="comment-item" key={item.id}>
                <div className="comment-item__content">
                  <div className="comment-item__avatar">
                    <Avatar {...stringAvatar(item.user)} />
                  </div>
                  <div className="comment-item__content__user">{item.user}</div>
                  <div className="comment-item__content__date">
                    {moment(item?.createdAt).format('DD/MM/YYYY')}
                  </div>
                </div>
                <div className="comment-item__content__comment">
                  {item.comment}
                </div>
              </div>
            ))}
          </div>
          <div className="add-comment">
            <Avatar
              {...(stringAvatar(profile?.firstname + ' ' + profile?.lastname) ||
                'Undefined User')}
            />
            <div className="comment-box">
              <InputBase
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add comment"
                className="field"
              />
              <SendIcon onClick={addNewComment} className="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
