import React from 'react';
import { TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import './InviteLecturersModal.css';

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export default function InviteLecturersModal({ handleClose }) {
  const [email, setEmail] = React.useState('');
  const [listEmail, setListEmail] = React.useState([]);
  const [disableAdd, setDisableAdd] = React.useState(true);
  const [progress, setProgress] = React.useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    const validate = validateEmail(e.target.value);
    if (validate) {
      setDisableAdd(false);
    }

    if (listEmail.includes(e.target.value)) {
      setDisableAdd(true);
    }
  };

  const addEmailToList = () => {
    setListEmail([...listEmail, email]);
    setEmail('');
    setDisableAdd(true);
  };

  const handleSubmitInvite = () => {
    console.log(listEmail);
    setProgress(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  return (
    <div className="InviteLecturersModal">
      <div className="title">Invite Lecturers</div>
      <div className="listEmail">
        {listEmail.map((item) => (
          <div key={item} className="email">
            <div className="name">{item}</div>
          </div>
        ))}
      </div>

      <TextField
        className="field"
        value={email}
        label="Email"
        variant="filled"
        onChange={(e) => handleChangeEmail(e)}
      />

      <Button
        className="addBtn"
        disabled={disableAdd}
        variant="outlined"
        onClick={addEmailToList}
      >
        Add
      </Button>
      <div className="desc">
        Lecturers you add can do everything you can, except delete the course.
      </div>
      <Button
        className="inviteBtn"
        disabled={listEmail.length === 0}
        variant="contained"
        onClick={handleSubmitInvite}
      >
        {progress ? (
          <CircularProgress xs={{ size: 4 }} color="inherit" />
        ) : (
          'Invite'
        )}
      </Button>
    </div>
  );
}
