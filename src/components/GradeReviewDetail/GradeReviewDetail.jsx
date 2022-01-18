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
import {
  createComment,
  getGradeReview,
  getAllComment,
} from '../../api/gradeReview';
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

export default function GradeReviewDetail() {
  const reviewInit = {
    expectedPoint: 0,
    explanation: 'ahihihihih đồ ngốc',
    createdAt: '2022-01-18T05:32:29.000Z',
    updatedAt: '2022-01-18T05:32:29.000Z',
    userAssignmentId: 1,
    courseId: 1,
    student: {
      studentId: 0,
      fullname: 'Student name',
    },
    assignment: {
      name: 'Assignment name',
      point: 0,
    },
    userAssignment: {
      id: 0,
      point: 0,
    },
  };
  const [review, setReview] = useState(reviewInit);
  const [classroom, setClassroom] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [point, setPoint] = useState(0);

  const dispatch = useDispatch();

  const { role, course } = classroom;

  const profile = useSelector((state) => state.auth);

  const { courseId, gradeReviewId } = useParams();

  const fetchReview = async (courseID, gradeReviewID) => {
    const res = await getGradeReview(courseID, gradeReviewID);
    console.log(res.data);
    setReview(res.data);
  };

  const fetchComments = async (courseID, gradeReviewID) => {
    const res = await getAllComment(courseID, gradeReviewID);
    setComments(res.data);
  };

  useEffect(() => {
    const fetchClassroom = async (id) => {
      const res = await getCourse(id);
      setClassroom(res.data);
    };

    if (!profile.firstname) {
      dispatch(getUserProfile());
    }

    fetchClassroom(courseId);
    fetchReview(courseId, gradeReviewId);
    fetchComments(courseId, gradeReviewId);
  }, []);

  useEffect(() => {
    setPoint(review.userAssignment.point);
  }, [review]);

  const addNewComment = async () => {
    if (comment !== '') {
      const newComment = {
        content: comment.trim(),
        fullname: profile.firstname + ' ' + profile.lastname,
      };

      const res = await createComment(courseId, gradeReviewId, newComment);
      if (res.status === 201) {
        fetchComments(courseId, gradeReviewId);
      }

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
            <div className="title">Student Name:</div>
            <div className="content">{review.student.fullname}</div>
          </div>
          <div className="information__row">
            <div className="title">Student ID:</div>
            <div className="content">{review.student.studentId}</div>
          </div>
          <div className="information__row">
            <div className="title">Grade Composition:</div>
            <div className="content">{review.assignment.name}</div>
          </div>
          <div className="information__row">
            <div className="title">Max Point:</div>
            <div className="content">{review.assignment.point}</div>
          </div>
          <div className="information__row">
            <div className="title">Current Point:</div>
            <div className="content">{review.userAssignment.point}</div>
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
                    <Avatar {...stringAvatar(item.fullname)} />
                  </div>
                  <div className="comment-item__content__user">{item.fullname}</div>
                  <div className="comment-item__content__date">
                    {moment(item?.createdAt).format('DD/MM/YYYY')}
                  </div>
                </div>
                <div className="comment-item__content__comment">
                  {item.content}
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
