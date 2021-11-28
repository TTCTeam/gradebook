import { Card, CardHeader, Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React from 'react';
import { red } from '@mui/material/colors';
import './CreatePost.css';

export default function CreatePost() {
  const [open, setOpen] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
  const [content, setContent] = React.useState('');

  const submitNewPost = () => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const newPost = {
      id: Math.floor(Math.random() * 10000),
      author: 'Nguyen Van A',
      date: new Date().toLocaleDateString('en-US', options),
      content,
    };

    console.log(newPost);

    setOpen(false);
    setDisable(true);
    setContent('');
  };

  const contentChange = (e) => {
    if (e.target.value === '') {
      setDisable(true);
    } else setDisable(false);
    setContent(e.target.value);
  };

  const closeForm = () => {
    setOpen(false);
    setDisable(true);
  };

  return (
    <div>
      {open ? (
        <Card className="CreatePostForm">
          <TextField
            id="filled-basic"
            label="Announce something to your class"
            variant="filled"
            multiline
            rows={5}
            onChange={contentChange}
          />
          <div className="button">
            <Button
              onClick={() => closeForm()}
              sx={{ width: 100 }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={submitNewPost}
              sx={{ width: 100 }}
              variant="contained"
              disabled={disable}
            >
              Post
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="CreatePost" onClick={() => setOpen(true)}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" />}
          />
          <p>Announce something to your class</p>
        </Card>
      )}
    </div>
  );
}
