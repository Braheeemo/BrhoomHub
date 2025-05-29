import React from 'react';

const CourseItem = ({ course }) => {
  return (
    <li>{course.name}</li>
  );
};

export default CourseItem;