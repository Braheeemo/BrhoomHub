import React from 'react';
import CourseItem from './CourseItem';
import { Link } from 'react-router-dom';

const CourseCatalog = () => {
  // Sample course data
  const courses = [
    { id: 1, name: 'Prepositions' },
    { id: 2, name: 'Tenses' },
    { id: 3, name: 'Phrasal Verbs' },
  ];

  return (
    <div>
      <h2>Course Catalog</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <Link to={`/quiz/${course.id}`}>{course.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/progress">View Progress</Link>
    </div>
  );
};

export default CourseCatalog;