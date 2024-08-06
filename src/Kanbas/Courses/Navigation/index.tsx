import React, { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import './index.css';

const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades","People"];

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


