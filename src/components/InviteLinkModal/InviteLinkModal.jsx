import React, { useEffect } from 'react';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useParams } from 'react-router-dom';
import './InviteLinkModal.css';
import { getInvitation } from '../../api/courseAPI';

export default function InviteLinkModal() {
  const [open, setOpen] = React.useState(false);
  const [invitation, setInvitation] = React.useState({
    invitationLink: '',
    expirationDate: '',
  });
  const [progress, setProgress] = React.useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchLink = async (courseId) => {
      const res = await getInvitation(courseId);
      setProgress(false);
      setInvitation(res);
    };

    fetchLink(id);
    return () => {
      setInvitation({
        invitationLink: '',
        expirationDate: '',
      });
    };
  }, []);

  const handleClick = async () => {
    await navigator.clipboard.writeText(invitation.invitationLink);
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
              value={invitation.invitationLink}
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
            <span>{` ${moment(invitation.expiredDate).format('LLL')}`}</span>
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
