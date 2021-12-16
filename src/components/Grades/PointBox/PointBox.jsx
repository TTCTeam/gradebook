/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import './PointBox.css';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

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

function PointBox({
  content,
  assignmentId = '',
  isName = false,
  isID = false,
}) {
  console.log(assignmentId);
  const [point, setPoint] = useState(content);
  let nameofclass = 'point-box';
  if (isName) nameofclass = 'point-box-name';
  if (isID) nameofclass = 'point-box-id';
  return (
    <div className={nameofclass}>
      <div className="container">
        {isName && (
          <Avatar className="avatar" alt="avt" {...stringAvatar(content)} />
        )}
        {isID || isName ? (
          <div className="title">{`${content}`}</div>
        ) : (
          <div className="title">
            <TextField
              className="textfield"
              label=""
              variant="standard"
              value={point}
              onChange={(e) => setPoint(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PointBox;