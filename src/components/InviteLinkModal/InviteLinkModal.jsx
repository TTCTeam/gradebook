import React from 'react';
import './InviteLinkModal.css';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function InviteLinkModal() {
  const [open, setOpen] = React.useState(false);
  const [link, setLink] = React.useState('This is link');
  const [progress, setProgress] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setProgress(false);
    }, 1500);
  }, [progress]);

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  const handleClick = () => {
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
              value={link}
              label="Invite Link"
              variant="filled"
              onChange={(e) => handleChangeLink(e)}
            />

            <CopyToClipboard text={link}>
              <Tooltip title="Copy link to clipboard" arrow>
                <IconButton
                  className="copylinkBtn"
                  variant="text"
                  onClick={handleClick}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </CopyToClipboard>
          </div>

          <div className="expire">This link will be expired at</div>
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
