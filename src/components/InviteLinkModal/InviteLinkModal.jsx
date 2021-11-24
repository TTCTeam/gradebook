import React, { useEffect } from 'react';
import './InviteLinkModal.css';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function InviteLinkModal() {
  const [open, setOpen] = React.useState(false);
  const [invitation, setInvitation] = React.useState({});
  const [progress, setProgress] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    setTimeout(() => {
      setProgress(false);
    }, 1500);
  }, [progress]);

  useEffect(() => {
    const fetchLink = async (courseId) => {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/courses/${courseId}/invite-link`);
      setInvitation(res.data);
    };

    fetchLink(id);
  }, []);

  const handleClick = async () => {
    await navigator.clipboard.writeText(invitation?.invitationLink);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <div className="InviteLinkModal">
      {progress ? (
        <div className="progress">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="container">
            <TextField
              className="field"
              value={invitation?.invitationLink}
              label="Invite Link"
              variant="filled"
            />

            <Tooltip title="Copy link to clipboard" arrow>
              <IconButton
                className="copylinkBtn"
                variant="text"
                onClick={handleClick}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </div>

          <div className="expire">
            This link will be expired at
            <span>{invitation?.expiredDate}</span>
          </div>
        </>
      )}

      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message="Link copied"
      />
    </div>
  );
}
