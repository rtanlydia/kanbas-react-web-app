// import { AiOutlineDashboard } from "react-icons/ai";
// import { IoCalendarOutline } from "react-icons/io5";
// import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
// import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
// import './index.css';
// import { useState } from 'react';
//
//
// export default function KanbasNavigation() {
//   const [activeLink, setActiveLink] = useState('Dashboard');
//
//   const handleLinkClick = (link: string) => {
//     setActiveLink(link);
//   };
//
//   return (
//       <div id="wd-kanbas-navigation" className="list-group rounded-0">
//         <a id="wd-neu-link" target="_blank"
//            href="https://www.northeastern.edu/"
//            className="list-group-item bg-black border-0">
//           <img src="/images/NEU.png" width="75px"/> </a>
//
//         <a id="wd-account-link" href="#/Kanbas/Account"
//            className={`list-group-item text-center border-0 ${activeLink === 'Account' ? 'bg-white text-danger' : 'bg-black text-white'}`}
//            onClick={() => handleLinkClick('Account')}>
//           <FaRegCircleUser className={`fs-1 ${activeLink === 'Account' ? 'text-danger' : 'text-white'}`}/><br/>
//           Account </a>
//
//         <a id="wd-dashboard-link" href="#/Kanbas/Dashboard"
//         className={`list-group-item text-center border-0 ${activeLink === 'Dashboard' ? 'bg-white text-danger' : 'bg-black text-white'}`}
//         onClick={() => handleLinkClick('Dashboard')}>
//         <AiOutlineDashboard className={`fs-1 ${activeLink === 'Dashboard' ? 'text-danger' : 'text-danger'}`}/><br/>
//         Dashboard </a>
//
//         <a id="wd-course-link" href="#/Kanbas/Courses"
//            className={`list-group-item text-center border-0 ${activeLink === 'Courses' ? 'bg-white text-danger' : 'bg-black text-white'}`}
//            onClick={() => handleLinkClick('Courses')}>
//           <LiaBookSolid className={`fs-1 ${activeLink === 'Courses' ? 'text-danger' : 'text-danger'}`}/><br/>
//           Courses </a>
//
//
//         <a id="wd-calender-link" href="#/Kanbas/Calender"
//            className={`list-group-item text-center border-0 ${activeLink === 'Calender' ? 'bg-white text-danger' : 'bg-black text-white'}`}
//            onClick={() => handleLinkClick('Calender')}>
//           <IoCalendarOutline className={`fs-1 ${activeLink === 'Calender' ? 'text-danger' : 'text-danger'}`}/><br/>
//           Calender </a>
//
//         <a id="wd-inbox-link" href="#/Kanbas/Inbox"
//            className={`list-group-item text-center border-0 ${activeLink === 'Inbox' ? 'bg-white text-danger' : 'bg-black text-white'}`}
//            onClick={() => handleLinkClick('Inbox')}>
//           <FaInbox className={`fs-1 ${activeLink === 'Inbox' ? 'text-danger' : 'text-danger'}`}/><br/>
//           Inbox </a>
//
//         <a id="wd-labs-link" href="#/Labs"
//            className={`list-group-item text-center border-0 ${activeLink === 'Labs' ? 'bg-white text-danger' : 'bg-black text-white'}`}
//            onClick={() => handleLinkClick('Labs')}>
//           <LiaCogSolid className={`fs-1 ${activeLink === 'Labs' ? 'text-danger' : 'text-danger'}`}/><br/>
//           Labs </a>
//
//       </div>
//
//   );
// }




import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
export default function KanbasNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Dashboard", path: "/Kanbas/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses",   path: "/Kanbas/Courses", icon: LiaBookSolid },
    { label: "Calendar",  path: "/Kanbas/Calendar",  icon: IoCalendarOutline },
    { label: "Inbox",     path: "/Kanbas/Inbox",     icon: FaInbox },
    { label: "Labs",      path: "/Labs",             icon: LiaCogSolid },
  ];
  return (
      <div id="wd-kanbas-navigation" className="list-group rounded-0">
        <a id="wd-account-link" target="_blank" href="https://www.northeastern.edu/"
           className="list-group-item bg-black border-0">
          <img src="/images/NEU.png" width="75px" /></a>
        <Link key="/Kanbas/Account" to="/Kanbas/Account" className={`list-group-item text-center border-0 bg-black
            ${pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"}`}>
          <FaRegCircleUser className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} />
          <br />
          Account
        </Link>
        {links.map((link) => (
            <Link key={link.path} to={link.path} className={`list-group-item bg-black text-center border-0
              ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}>
              {link.icon({ className: "fs-1 text-danger"})}
              <br />
              {link.label}
            </Link>
        ))}
      </div>
  );}

