// import "./index.css";
// export default function CoursesNavigation() {
//   return (
//         <div id="wd-courses-navigation" style={{ marginLeft: "5px" }}className="list-group fs-5 rounded-0">
//             <a id="wd-course-home-link" href="#/Kanbas/Courses/1234/Home"
//                className="list-group-item active border border-0"> Home </a>
//           <a id="wd-course-modules-link" href="#/Kanbas/Courses/1234/Modules"
//              className="list-group-item text-danger border border-0"> Modules </a>
//           <a id="wd-course-piazza-link" href="#/Kanbas/Courses/1234/Piazza"
//              className="list-group-item text-danger border border-0"> Piazza </a>
//           <a id="wd-course-zoom-link" href="#/Kanbas/Courses/1234/Zoom"
//              className="list-group-item text-danger border border-0"> Zoom </a>
//           <a id="wd-course-quizzes-link" href="#/Kanbas/Courses/1234/Assignments"
//              className="list-group-item text-danger border border-0"> Assignments </a>
//           <a id="wd-course-assignments-link" href="#/Kanbas/Courses/1234/Quizzes"
//              className="list-group-item text-danger border border-0"> Quizzes </a>
//           <a id="wd-course-grades-link" href="#/Kanbas/Courses/1234/Grades"
//              className="list-group-item text-danger border border-0"> Grades </a>
//         </div>
//   );
// }

import React, { useState } from 'react';
import './index.css';

export default function CoursesNavigation() {
  const [activeLink, setActiveLink] = useState('Home');

  const handleClick = (linkName: string) => {
    setActiveLink(linkName);
  };

  return (
      <ul id="wd-courses-navigation" className="list-group fs-5 rounded-0" style={{ marginLeft: '5px' }}>
        <li>
          <a
              id="wd-course-home-link"
              href="#/Kanbas/Courses/1234/Home"
              className={`list-group-item border-0 ${activeLink === 'Home' ? 'active' : 'text-danger'}`}
              onClick={() => handleClick('Home')}
          >
            Home
          </a>
        </li>
        <li>
          <a
              id="wd-course-modules-link"
              href="#/Kanbas/Courses/1234/Modules"
              className={`list-group-item border-0 ${activeLink === 'Modules' ? 'active' : 'text-danger'}`}
              onClick={() => handleClick('Modules')}
          >
            Modules
          </a>
        </li>
        <li>
          <a
              id="wd-course-piazza-link"
              href="#/Kanbas/Courses/1234/Piazza"
              className={`list-group-item border-0 ${activeLink === 'Piazza' ? 'active' : 'text-danger'}`}
              onClick={() => handleClick('Piazza')}
          >
            Piazza
          </a>
        </li>
        <li>
          <a
              id="wd-course-zoom-link"
              href="#/Kanbas/Courses/1234/Zoom"
              className={`list-group-item border-0 ${activeLink === 'Zoom' ? 'active' : 'text-danger'}`}
              onClick={() => handleClick('Zoom')}
          >
            Zoom
          </a>
        </li>
        <li>
          <a
              id="wd-course-assignments-link"
              href="#/Kanbas/Courses/1234/Assignments"
              className={`list-group-item border-0 ${activeLink === 'Assignments' ? 'active' : 'text-danger'}`}
              onClick={() => handleClick('Assignments')}
          >
            Assignments
          </a>
        </li>
        <li>
          <a
              id="wd-course-quizzes-link"
              href="#/Kanbas/Courses/1234/Quizzes"
              className={`list-group-item border-0 ${activeLink === 'Quizzes' ? 'active' : 'text-danger'}`}
              onClick={() => handleClick('Quizzes')}
          >
            Quizzes
          </a>
        </li>
        <li>
          <a
              id="wd-course-grades-link"
              href="#/Kanbas/Courses/1234/Grades"
              className={`list-group-item border-0 ${activeLink === 'Grades' ? 'active' : 'text-danger'}`}
              onClick={() => handleClick('Grades')}
          >
            Grades
          </a>
        </li>
      </ul>
  );
}
