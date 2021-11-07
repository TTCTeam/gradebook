import React from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CourseItem = ({ course }) => (
  <Card sx={{ maxWidth: 300, maxHeight: 300 }}>
    <CardMedia
      component="img"
      alt="green iguana"
      height="140"
      image="/img_backtoschool.jpg"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 500 }}>
        {course.coursename}
      </Typography>
      <Typography gutterBottom variant="h7" component="div" sx={{ opacity: 0.7, fontWeight: 400 }}>
        {course.teacher}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {}
      </Typography>
    </CardContent>
    {/*       <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
  </Card>
);

export default CourseItem;
