import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
import "./styles.css";
import {useCallback, useEffect, useState} from "react";
import store from "./store";
import {Provider, useDispatch, useSelector} from "react-redux";
import * as client from "./Courses/client";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";
import RegisterCoursePage from "./Dashboard/registerPage";


export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);

  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

  const fetchCourses = async () => {
    const courses = await client.fetchAllCourses();
    setCourses(courses);
  };


  useEffect(() => {
    fetchCourses();
  }, []);

  const [course, setCourse] = useState<any>({
    _id: "", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });


  const addNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    setCourses([...courses, { ...course, newCourse }]);
  };

  const deleteCourse = async (courseId: any) => {
    await client.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  const updateCourse = async () => {
    await client.updateCourse(course);
    setCourses(
        courses.map((c) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
    );
  };
  // const updateCourse = async () => {
  //   try {
  //     const updatedCourse = await client.updateCourse(course);
  //     setCourses(
  //       courses.map((c) => {
  //         if (c.number === course.number) { // 比较 course.name 而不是 course._id
  //           return updatedCourse; // 使用更新后的课程数据
  //         } else {
  //           return c;
  //         }
  //       })
  //     );
  //   } catch (error) {
  //     console.error('Error updating course:', error);
  //   }
  // };


  return (
      <Provider store={store}>
      <div id="wd-kanbas" className="h-100">
        <div className="d-flex h-100">
          <div className="d-none d-md-block bg-black">
            <KanbasNavigation />
          </div>
          <div className="flex-fill p-4">
            <Routes>
              <Route path="/" element={<Navigate to="Dashboard" />} />
              <Route path="/Account/*" element={<Account />} />
              <Route path="Dashboard" element={<ProtectedRoute>
                <Dashboard
                    currentUser={currentUser}
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}/> </ProtectedRoute>
              } />
              <Route path="RegisterCourses" element={<ProtectedRoute>
                <RegisterCoursePage
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}/>
              </ProtectedRoute>} />
              <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
              <Route path="Calendar" element={<h1>Calendar</h1>} />
              <Route path="Inbox" element={<h1>Inbox</h1>} />
            </Routes>
          </div>
        </div>
      </div>
      </Provider>

  );}

