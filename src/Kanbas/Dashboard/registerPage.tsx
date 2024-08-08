import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../Account/reducer";
import { enrollInCourse, getAllCourses, getEnrolledCourses } from "./client";

export default function RegisterCoursePage() {
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const dispatch = useDispatch();
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>(currentUser?.enrolledCourses || []);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getAllCourses();
        console.log('Fetched courses:', coursesData);
        setAllCourses(coursesData);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    const fetchEnrolledCourses = async () => {
      try {
        const enrolledCoursesData = await getEnrolledCourses(currentUser._id);
        console.log('Fetched enrolled courses:', enrolledCoursesData);
        setEnrolledCourses(enrolledCoursesData.map((course: any) => course._id.toString()));
      } catch (error) {
        console.error("Failed to fetch enrolled courses", error);
      }
    };

    fetchCourses();
    fetchEnrolledCourses();
  }, [currentUser._id]);

  const enrollInCourseHandler = async (courseId: string) => {
    try {
      setError(null);
      if (enrolledCourses.includes(courseId)) {
        window.alert("You are already enrolled in this course.");
        return;
      }
      const updatedUser = await enrollInCourse(currentUser._id, courseId);
      dispatch(setCurrentUser(updatedUser));
      setEnrolledCourses(updatedUser.enrolledCourses.map((course: any) => course._id.toString()));
    } catch (error) {
      setError(error.message);
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
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <h2 id="wd-all-courses" style={{ marginLeft: "30px" }}>All Courses ({allCourses.length})</h2>
      <hr />
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {allCourses.map((course) => (
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
                <button
                  onClick={() => enrollInCourseHandler(course._id)}
                  className={`btn ${enrolledCourses.includes(course._id) ? "btn-secondary" : "btn-primary"}`}
                  disabled={enrolledCourses.includes(course._id)}
                >
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
