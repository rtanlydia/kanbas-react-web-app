
// import React, { useState } from 'react';
// import './index.css';
//
// export default function CoursesNavigation() {
//   const [activeLink, setActiveLink] = useState('Home');
//
//   const handleClick = (linkName: string) => {
//     setActiveLink(linkName);
//   };
//
//   return (
//       <ul id="wd-courses-navigation" className="list-group fs-5 rounded-0" style={{ marginLeft: '5px' }}>
//         <li>
//           <a
//               id="wd-course-home-link"
//               href="#/Kanbas/Courses/1234/Home"
//               className={`list-group-item border-0 ${activeLink === 'Home' ? 'active' : 'text-danger'}`}
//               onClick={() => handleClick('Home')}
//           >
//             Home
//           </a>
//         </li>
//         <li>
//           <a
//               id="wd-course-modules-link"
//               href="#/Kanbas/Courses/1234/Modules"
//               className={`list-group-item border-0 ${activeLink === 'Modules' ? 'active' : 'text-danger'}`}
//               onClick={() => handleClick('Modules')}
//           >
//             Modules
//           </a>
//         </li>
//         <li>
//           <a
//               id="wd-course-piazza-link"
//               href="#/Kanbas/Courses/1234/Piazza"
//               className={`list-group-item border-0 ${activeLink === 'Piazza' ? 'active' : 'text-danger'}`}
//               onClick={() => handleClick('Piazza')}
//           >
//             Piazza
//           </a>
//         </li>
//         <li>
//           <a
//               id="wd-course-zoom-link"
//               href="#/Kanbas/Courses/1234/Zoom"
//               className={`list-group-item border-0 ${activeLink === 'Zoom' ? 'active' : 'text-danger'}`}
//               onClick={() => handleClick('Zoom')}
//           >
//             Zoom
//           </a>
//         </li>
//         <li>
//           <a
//               id="wd-course-assignments-link"
//               href="#/Kanbas/Courses/1234/Assignments"
//               className={`list-group-item border-0 ${activeLink === 'Assignments' ? 'active' : 'text-danger'}`}
//               onClick={() => handleClick('Assignments')}
//           >
//             Assignments
//           </a>
//         </li>
//         <li>
//           <a
//               id="wd-course-quizzes-link"
//               href="#/Kanbas/Courses/1234/Quizzes"
//               className={`list-group-item border-0 ${activeLink === 'Quizzes' ? 'active' : 'text-danger'}`}
//               onClick={() => handleClick('Quizzes')}
//           >
//             Quizzes
//           </a>
//         </li>
//         <li>
//           <a
//               id="wd-course-grades-link"
//               href="#/Kanbas/Courses/1234/Grades"
//               className={`list-group-item border-0 ${activeLink === 'Grades' ? 'active' : 'text-danger'}`}
//               onClick={() => handleClick('Grades')}
//           >
//             Grades
//           </a>
//         </li>
//       </ul>
//   );
// }

import React, { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import './index.css';

const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades"];

export default function CoursesNavigation() {
  const { cid } = useParams<{ cid: string }>();
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState('Home');

  const handleClick = (linkName: string) => {
    setActiveLink(linkName);
  };

  return (
      <ul id="wd-courses-navigation" className="list-group fs-5 rounded-0" style={{ marginLeft: '5px' }}>
        {links.map(link => (
            <li key={link}>
              <Link
                  id={`wd-course-${link.toLowerCase()}-link`}
                  to={`/Kanbas/Courses/${cid}/${link}`}
                  className={`list-group-item border-0 ${pathname.includes(link) ? 'active' : 'text-danger'}`}
                  onClick={() => handleClick(link)}
              >
                {link}
              </Link>
            </li>
        ))}
      </ul>
  );
}


