import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import {Navigate, Route, Routes, useParams, useLocation } from "react-router";
import Grades from './Grade';
import { FaAlignJustify } from 'react-icons/fa';
import PeopleTable from "./People/Table";
import QuizEditor from "./Quiz/Editor";
import Quizzes from "./Quiz";
import QuizDetail from "./Quiz/detail";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  return (
      <div id="wd-courses">
        <h2 className="text-danger">
          <FaAlignJustify className="me-4 fs-4 mb-1"/>
          {course && course.name} &gt; {pathname.split("/")[4]}
        </h2>
        <hr/>
        <div className="d-flex">
          <div className="d-none d-md-block">
            <CoursesNavigation/>
          </div>
          <div className="flex-fill">
            <Routes>
              {/*<Route path="/" element={<Navigate to="Home"/>}/>*/}
              {/*<Route path="Home" element={<Home/>}/>*/}
              {/*<Route path="Modules" element={<Modules/>}/>*/}
              {/*<Route path="Assignments" element={<Assignments/>}/>*/}
              {/*<Route path="Assignments/:id" element={<AssignmentEditor/>}/>*/}
              <Route path="Home" element={<Home/>}/>
              <Route path="Modules" element={<Modules/>}/>
              <Route path="Assignments" element={<Assignments/>}/>
              <Route path="Assignments/:aid" element={<AssignmentEditor/>}/>
              <Route path="/grades" element={<Grades/>}/>
              <Route path="People" element={<PeopleTable />} />
              <Route path="People/:uid" element={<PeopleTable />} />
              <Route path="Quizzes" element={<Quizzes/>}/>
              <Route path="Quizzes/:qid" element={<QuizEditor/>}/>
              <Route path="QuizDetail:qid" element={<QuizDetail />} />


            </Routes>
          </div>
        </div>
      </div>
  );
}
