import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from './ManageProfilePage.module.css';

const profile = {
  name: 'Ha Minh Cuong',
  username: 'haminhcuong2k',
  avt: '',
  studentID: '18120297',
  gmail: 'cuongha2k@gmail.com',
};

export default function ManageProfilePage() {
  const [student, setStudent] = React.useState(profile);
  const [isEdit, setIsEdit] = React.useState(false);
  const [name, setName] = React.useState(student.name);
  const [username, setUsername] = React.useState(student.username);
  const [studentID, setStudentID] = React.useState(student.studentID);
  const [gmail, setGmail] = React.useState(student.gmail);

  const submitUpdate = () => {
    const updated = {
      name,
      username,
      studentID,
      gmail,
    };

    console.log(updated);
    setStudent(profile);
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
        alt={student.name}
        src={student.avt}
        sx={{ width: 200, height: 200 }}
      />

      <div className={styles.form}>
        <div className={styles.field}>
          <div className={styles.fieldTitle}>Name</div>
          <TextField
            hiddenLabel
            defaultValue={name}
            variant="outlined"
            disabled
            size="small"
            sx={{ width: 700, height: 40 }}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <div className={styles.fieldTitle}>Username</div>
          <TextField
            hiddenLabel
            defaultValue={username}
            variant="outlined"
            disabled
            size="small"
            sx={{ width: 700, height: 40 }}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <div className={styles.fieldTitle}>Student ID</div>
          <TextField
            hiddenLabel
            defaultValue={studentID}
            variant="outlined"
            disabled={!isEdit}
            size="small"
            sx={{ width: 700, height: 40 }}
            onChange={(e) => setStudentID(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <div className={styles.fieldTitle}>Gmail</div>
          <TextField
            hiddenLabel
            defaultValue={gmail}
            variant="outlined"
            disabled={!isEdit}
            size="small"
            sx={{ width: 700, height: 40 }}
            onChange={(e) => setGmail(e.target.value)}
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
            Save changes
          </Button>
        </div>
      ) : (
        <div className={styles.btn}>
          <Button
            sx={{ width: 250, height: 40 }}
            color="success"
            onClick={openChange}
            variant="contained"
          >
            Edit Your Profile
          </Button>
        </div>
      )}
    </div>
  );
}
