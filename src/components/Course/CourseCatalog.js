import React from 'react';
// import CourseItem from './CourseItem'; // Removed unused import
import { Link } from 'react-router-dom';

const CourseCatalog = () => {
    // Sample course data
    const courses = [
        { id: 'prepositions', name: 'Prepositions' },
        { id: 'phrasalVerbs', name: 'Phrasal Verbs' },
        { id: 'idioms', name: 'Idioms (EMAR Series)' },
        { id: 'tenses', name: 'Tenses' }
    ];

    return (
        <div className="container">
            <h2>Course Catalog</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {courses.map(course => (
                    <li key={course.id} style={{ marginBottom: '10px' }}>
                        <Link
                            to={`/quiz/${course.id}`}
                            style={{ display: 'block', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', textDecoration: 'none', color: '#333',
                            transition: 'background-color 0.3s ease' }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#f0f0f0';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                            }}
                        >
                            {course.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to="/progress"
                  style={{ display: 'inline-block', marginTop: '20px', padding: '10px 15px', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '5px', textDecoration: 'none', color: '#555',
                  transition: 'background-color 0.3s ease' }}
                  onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#e0e0e0';
                  }}
                  onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#f0f0f0';
                  }}
            >View Progress</Link>
        </div>
    );
};

export default CourseCatalog;