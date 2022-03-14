import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import styles from './ManageProfilePage.module.css';
import {
  getUserProfile,
  updateUserProfile,
} from '../../store/auth/auth-actions';

export default function ManageProfilePage() {
  const profile = useSelector((state) => state.auth);
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = React.useState(false);
  const [firstname, setFirstName] = React.useState(profile.firstname);
  const [lastname, setLastName] = React.useState(profile.lastname);
  const [username, setStudentID] = React.useState(profile.username);
  const [email, setEmail] = React.useState(profile.email);

  useEffect(() => {
    if (!profile.firstname) {
      dispatch(getUserProfile());
    }
  }, []);
  useEffect(() => {
    if (profile.firstname) {
      setFirstName(profile.firstname);
      setLastName(profile.lastname);
      setStudentID(profile.username);
      setEmail(profile.email);
    }
  }, [profile]);

  const submitUpdate = () => {
    const updated = {
      firstname,
      lastname,
      username,
      email,
    };

    dispatch(updateUserProfile(updated));
    setIsEdit(false);
  };

  const openChange = () => {
    setIsEdit(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.title}>Your Profile</div>
      <Avatar
        className={styles.avatar}
        alt={`${firstname} ${lastname}`}
        sx={{ width: 200, height: 200, fontSize: 80 }}
      >
        {firstname ? `${firstname[0]}${lastname[0]}` : ''}
      </Avatar>

      <div className={styles.form}>
        <div className={styles.field}>
          <div className={styles.fieldTitle}>First Name</div>
          <TextField
            hiddenLabel
            value={firstname || ''}
            variant="outlined"
            disabled
            size="small"
            sx={{ width: 700, height: 40 }}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <div className={styles.fieldTitle}>Last Name</div>
          <TextField
            hiddenLabel
            value={lastname || ''}
            variant="outlined"
            disabled
            size="small"
            sx={{ width: 700, height: 40 }}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.fieldTitle}>Student ID</div>
          <TextField
            hiddenLabel
            value={username || ''}
            variant="outlined"
            disabled={!isEdit}
            size="small"
            error={ui.request === 'error'}
            sx={{ width: 700, height: 40 }}
            onChange={(e) => setStudentID(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <div className={styles.fieldTitle}>Email</div>
          <TextField
            hiddenLabel
            value={email || ''}
            variant="outlined"
            disabled
            size="small"
            sx={{ width: 700, height: 40 }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {isEdit ? (
        <div className={styles.btn}>
          <Button
            sx={{ width: 150, height: 40 }}
            color="success"
            onClick={() => setIsEdit(false)}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            sx={{ width: 150, height: 40 }}
            color="success"
            onClick={submitUpdate}
            variant="contained"
          >
            {ui.request === 'pending' ? <CircularProgress /> : 'Save changes'}
          </Button>
        </div>
      ) : (
        <div className={styles.btn}>
          <Button
            sx={{ width: 250, height: 40 }}
            color="success"
            onClick={openChange}
            variant="contained"
            disabled={username !== null}
          >
            Edit Your Profile
          </Button>
        </div>
      )}
    </div>
  );
}
