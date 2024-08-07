import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentUser } from "../Account/reducer";
import { enrollInCourse, getAllCourses } from "./client";

export default function RegisterCoursePage(
  { courses, course, setCourse, addNewCourse, deleteCourse, updateCourse }: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
  }
) {

  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const dispatch = useDispatch();
  //const [allCourses, setAllCourses] = useState<any[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>(currentUser?.enrolledCourses || []);

  const enrollInCourseHandler = async (courseId: string) => {
    try {
      const updatedUser = await enrollInCourse(currentUser._id, courseId);
      dispatch(setCurrentUser(updatedUser));
      setEnrolledCourses(updatedUser.enrolledCourses);
    } catch (error) {
      console.error("Failed to enroll in course", error);
    }
  };

  return (
    <div id="wd-register-course-page" style={{ marginLeft: "30px", marginTop: "30px" }}>
      <h1 id="wd-register-course-title" style={{ marginBottom: "20px" }}>Register Courses</h1>
      <hr />
      <div>
        <h3>Welcome, {currentUser?.username || "User"}!</h3>
        <p>Role: {currentUser?.role || "N/A"}</p>
      </div>
      <h2 id="wd-all-courses" style={{ marginLeft: "30px" }}>All Courses ({courses.length})</h2>
      <hr />
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {courses.map((course) => (
          <div key={course._id} className="wd-course-card col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <img src="/images/reactjs.jpg" height="160" alt="Course" />
              <div className="card-body">
                <span className="wd-course-name" style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                  {course.name || "No name provided"}
                </span>
                <p className="wd-course-description card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                  {course.description || "No description provided"}
                </p>
                <p><strong>Number:</strong> {course.number || "No number provided"}</p>
                <p><strong>Start Date:</strong> {course.startDate ? new Date(course.startDate).toLocaleDateString() : "No start date provided"}</p>
                <p><strong>End Date:</strong> {course.endDate ? new Date(course.endDate).toLocaleDateString() : "No end date provided"}</p>
                <p><strong>Department:</strong> {course.department || "No department provided"}</p>
                <p><strong>Credits:</strong> {course.credits || "No credits provided"}</p>
                <button onClick={() => enrollInCourseHandler(course._id)} className="btn btn-secondary">
                  {enrolledCourses.includes(course._id) ? "Enrolled" : "Enroll"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
