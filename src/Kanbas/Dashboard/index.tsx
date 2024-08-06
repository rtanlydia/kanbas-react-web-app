import { Link } from "react-router-dom";
import db from "../Database";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import accountReducer, {setCurrentUser} from "../Account/reducer";
import {enrollInCourse, getEnrolledCourses} from "./client";
import {Navigate} from "react-router";



export default function Dashboard(

    { currentUser, courses, course, setCourse, addNewCourse,
      deleteCourse, updateCourse }: {currentUser: any;
      courses: any[]; course: any; setCourse: (course: any) => void;
      addNewCourse: () => void; deleteCourse: (course: any) => void;
      updateCourse: () => void; }
) {

  currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const dispatch = useDispatch();
  const [displayedCourses, setDisplayedCourses] = useState<any[]>(courses);


  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (currentUser?.role === "STUDENT") {
        try {
          const enrolledCourses = await getEnrolledCourses(currentUser._id);
          setDisplayedCourses(enrolledCourses);
          console.log("Enrolled Courses: ", enrolledCourses); // 在控制台中打印出已注册的课程
        } catch (error) {
          console.error("Failed to fetch enrolled courses", error);
        }
      } else {
        setDisplayedCourses(courses);
      }
    };

    fetchEnrolledCourses();
  }, [currentUser, courses]);


  const enrollInCourseHandler = async (courseId: string) => {
    try {
      const updatedUser = await enrollInCourse(currentUser._id, courseId);
      dispatch(setCurrentUser(updatedUser));
    } catch (error) {
      console.error("Failed to enroll in course", error);
    }
  };

  if (currentUser?.role === "STUDENT") {
    return (
      <div id="wd-dashboard" style={{ marginLeft: "30px", marginTop: "30px" }}>
        <h1 id="wd-dashboard-title" style={{ marginBottom: "20px" }}>Dashboard</h1>
        <hr />
        <div>
          <h3>Welcome, {currentUser?.username || "User"}!</h3>
          <p>Role: {currentUser?.role || "N/A"}</p>
        </div>
        <h2 id="wd-dashboard-published" style={{ marginLeft: "30px" }}>Enrolled Courses ({displayedCourses.length})</h2>
        <hr />
        <div id="wd-dashboard-courses" className="row">
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {displayedCourses.map((course) => (

              <div className="wd-dashboard-course col" style={{width: "300px"}}>
                <Link to={`/Kanbas/Courses/${course.number}/Home`} className="text-decoration-none">

                  <div className="card rounded-3 overflow-hidden">
                    <img src="/images/reactjs.jpg" height="{160}"/>
                    <div className="card-body">
                    <span className="wd-dashboard-course-link"
                          style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                      {course.name}
                    </span>
                      <p className="wd-dashboard-course-title card-text"
                         style={{maxHeight: 53, overflow: "hidden"}}>
                        {course.description}
                      </p>
                      <Link to={`/Kanbas/Courses/${course.number}/Home`}
                            className="btn btn-primary">Go</Link>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>


        <div style={{ marginTop: "20px" }}>
          <Link to="/Kanbas/RegisterCourses" className="btn btn-success">Register for New Courses</Link>
        </div>
      </div>
    );
  }


  return (
      <div id="wd-dashboard" style={{marginLeft: "30px", marginTop: "30px"}}>
        <h1 id="wd-dashboard-title" style={{marginBottom: "20px"}}>Dashboard</h1>
        <hr/>
        <div>
          <h3>Welcome, {currentUser?.username || "User"}!</h3>
          <p>Role: {currentUser?.role || "N/A"}</p>
          <p>Role: {currentUser?.enrolledCourses || "N/A"}</p>
        </div>
        <h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={addNewCourse}> Add </button>

          <button className="btn btn-warning float-end me-2"
                  onClick={updateCourse} id="wd-update-course-click">
            Update
          </button>


        </h5>

        <br/>
        <input value={course.name} className="form-control mb-2"
               onChange={(e) => setCourse({...course, name: e.target.value})}/>

        <textarea value={course.description} className="form-control"
                onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
        <hr/>

        <h2 id="wd-dashboard-published" style={{marginLeft: "30px"}}>Published Courses ({courses.length})</h2>
        <hr/>
        <div id="wd-dashboard-courses" className="row">
          <div className="row row-cols-1 row-cols-md-5 g-4">

            {courses.map((course) => (
                <div className="wd-dashboard-course col" style={{width: "300px"}}>
                  <Link to={`/Kanbas/Courses/${course.number}/Home`} className="text-decoration-none">

                    <div className="card rounded-3 overflow-hidden">
                      <img src="/images/reactjs.jpg" height="{160}"/>
                      <div className="card-body">
                    <span className="wd-dashboard-course-link"
                          style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                      {course.name}
                    </span>
                        <p className="wd-dashboard-course-title card-text"
                           style={{maxHeight: 53, overflow: "hidden"}}>
                          {course.description}
                        </p>
                        <Link to={`/Kanbas/Courses/${course.number}/Home`}
                              className="btn btn-primary">Go</Link>

                        <button onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }} className="btn btn-danger float-end"
                                id="wd-delete-course-click">
                          Delete
                        </button>

                        <button id="wd-edit-course-click"
                                onClick={(event) => {
                                  event.preventDefault();
                                  setCourse(course);
                                }}
                                className="btn btn-warning me-2 float-end">
                          Edit
                        </button>


                      </div>
                    </div>
                  </Link>
                </div>
            ))}

          </div>
        </div>
      </div>
  );
}
