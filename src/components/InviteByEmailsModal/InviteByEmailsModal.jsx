import React from 'react';
import { TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import './InviteLecturersModal.css';
import { useParams } from 'react-router-dom';
import MemberRoles from '../../constant/course';
import { sendInvitationByEmail } from '../../api/courseAPI';

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export default function InviteByEmailsModal({ handleClose, role }) {
  const [email, setEmail] = React.useState('');
  const [listEmail, setListEmail] = React.useState([]);
  const [disableAdd, setDisableAdd] = React.useState(true);
  const [progress, setProgress] = React.useState(false);
  const isLecturer = role === MemberRoles.LECTURER;

  const { id } = useParams();

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

  const handleSubmitInvite = async () => {
    setProgress(true);
    const res = await sendInvitationByEmail(id, listEmail, role);
    console.log(res.data);
    handleClose();
  };

  return (
    <div className="InviteLecturersModal">
      {isLecturer ? (
        <div className="title">Invite Lecturers</div>
      ) : (
        <div className="title">Invite Students</div>
      )}

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
      {isLecturer && (
        <div className="desc">
          Lecturers you add can do everything you can, except delete the course.
        </div>
      )}

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
