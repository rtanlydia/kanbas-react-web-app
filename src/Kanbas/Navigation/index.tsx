import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import './index.css';
import { useState } from 'react';

export default function KanbasNavigation() {
  const [activeLink, setActiveLink] = useState('Dashboard');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
      <div id="wd-kanbas-navigation" className="list-group rounded-0">
        <a id="wd-neu-link" target="_blank"
           href="https://www.northeastern.edu/"
           className="list-group-item bg-black border-0">
          <img src="/images/NEU.png" width="75px"/> </a>

        <a id="wd-account-link" href="#/Kanbas/Account"
          //  className="list-group-item text-white
          //          bg-black text-center border-0">
          //
          // <FaRegCircleUser className="fs-1 text text-white"/><br/>
          // Account </a>
           className={`list-group-item text-center border-0 ${activeLink === 'Account' ? 'bg-white text-danger' : 'bg-black text-white'}`}
           onClick={() => handleLinkClick('Account')}>
          <FaRegCircleUser className={`fs-1 ${activeLink === 'Account' ? 'text-danger' : 'text-white'}`}/><br/>
          Account </a>

        <a id="wd-dashboard-link" href="#/Kanbas/Dashboard"
          //  className="list-group-item text-center border-0
          //          bg-white text-danger">
          // <AiOutlineDashboard className="fs-1 text-danger"/><br/>
          // Dashboard </a>
        className={`list-group-item text-center border-0 ${activeLink === 'Dashboard' ? 'bg-white text-danger' : 'bg-black text-white'}`}
        onClick={() => handleLinkClick('Dashboard')}>
        <AiOutlineDashboard className={`fs-1 ${activeLink === 'Dashboard' ? 'text-danger' : 'text-danger'}`}/><br/>
        Dashboard </a>

        <a id="wd-course-link" href="#/Kanbas/Courses"
          //  className="list-group-item text-white
          //          bg-black text-center border-0">
          // <LiaBookSolid className="fs-1 text-danger"/><br/>
          // Courses </a>
           className={`list-group-item text-center border-0 ${activeLink === 'Courses' ? 'bg-white text-danger' : 'bg-black text-white'}`}
           onClick={() => handleLinkClick('Courses')}>
          <LiaBookSolid className={`fs-1 ${activeLink === 'Courses' ? 'text-danger' : 'text-danger'}`}/><br/>
          Courses </a>


        {/* complete styling the rest of the links */}
        <a id="wd-calender-link" href="#/Kanbas/Calender"
          //  className="list-group-item text-white
          //          bg-black text-center border-0">
          // <IoCalendarOutline className="fs-1 text-danger"/><br/>
          // Calender </a>
           className={`list-group-item text-center border-0 ${activeLink === 'Calender' ? 'bg-white text-danger' : 'bg-black text-white'}`}
           onClick={() => handleLinkClick('Calender')}>
          <IoCalendarOutline className={`fs-1 ${activeLink === 'Calender' ? 'text-danger' : 'text-danger'}`}/><br/>
          Calender </a>

        <a id="wd-inbox-link" href="#/Kanbas/Inbox"
          //  className="list-group-item text-white
          //          bg-black text-center border-0">
          // <FaInbox className="fs-1 text-danger"/><br/>
          // Inbox </a>
           className={`list-group-item text-center border-0 ${activeLink === 'Inbox' ? 'bg-white text-danger' : 'bg-black text-white'}`}
           onClick={() => handleLinkClick('Inbox')}>
          <FaInbox className={`fs-1 ${activeLink === 'Inbox' ? 'text-danger' : 'text-danger'}`}/><br/>
          Inbox </a>

        <a id="wd-labs-link" href="#/Labs"
          //  className="list-group-item text-white
          //          bg-black text-center border-0">
          // <LiaCogSolid className="fs-1 text-danger"/><br/>
          // Labs </a>
           className={`list-group-item text-center border-0 ${activeLink === 'Labs' ? 'bg-white text-danger' : 'bg-black text-white'}`}
           onClick={() => handleLinkClick('Labs')}>
          <LiaCogSolid className={`fs-1 ${activeLink === 'Labs' ? 'text-danger' : 'text-danger'}`}/><br/>
          Labs </a>

      </div>

  );
}
