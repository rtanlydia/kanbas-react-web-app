import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import accountReducer, {setCurrentUser} from "../Account/reducer";
import {createCourse, enrollInCourse, getEnrolledCourses, deleteCourseForUser} from "./client";




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
  const [courseData, setCourseData] = useState({
    number: '',
    name: '',
    startDate: '',
    endDate: '',
    department: '',
    credits: 0,
    description: ''
  });

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (currentUser?.role === "STUDENT" || currentUser?.role === "FACULTY") {
        try {
          const enrolledCourses = await getEnrolledCourses(currentUser._id);
          setDisplayedCourses(enrolledCourses);
          console.log("Enrolled Courses: ", enrolledCourses);
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

  const handleCreateCourse = async () => {
    try {
      const newCourse = await createCourse(currentUser._id, courseData);
      setDisplayedCourses([...displayedCourses, newCourse]);
      setCourseData({
        number: '',
        name: '',
        startDate: '',
        endDate: '',
        department: '',
        credits: 0,
        description: ''
      });
    } catch (error) {
      console.error('Error creating course:', error.message);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await deleteCourseForUser(currentUser._id, courseId);
      const updatedCourses = displayedCourses.filter(course => course._id !== courseId);
      setDisplayedCourses(updatedCourses);
    } catch (error) {
      console.error('Error deleting course:', error.message);
    }
  };




  if (currentUser?.role === "STUDENT") {
    return (
        <div id="wd-dashboard" style={{marginLeft: "30px", marginTop: "30px"}}>
          <h1 id="wd-dashboard-title" style={{marginBottom: "20px"}}>Dashboard</h1>
          <hr/>
          <div>
            <h3>Welcome, {currentUser?.username || "User"}!</h3>
            <p>Role: {currentUser?.role || "N/A"}</p>
          </div>
          <br/>
          <h2 id="wd-dashboard-published" style={{marginLeft: "30px"}}>Enrolled Courses ({displayedCourses.length})</h2>
          <hr/>
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
                                className="btn btn-danger">Go</Link>
                        </div>
                      </div>
                    </Link>
                  </div>
              ))}
            </div>
          </div>
          <br/>
          <hr/>
          <div style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh"
          }}>

            <Link to="/Kanbas/RegisterCourses" className="btn btn-danger me-2"
                  style={{fontSize: "20px", padding: "10px 25px"}}>
              + Register for New Courses
            </Link>
          </div>

        </div>
    );
  }

  if (currentUser?.role === "FACULTY") {
    return (
      <div id="wd-dashboard" style={{marginLeft: "30px", marginTop: "30px"}}>
        <h1 id="wd-dashboard-title" style={{marginBottom: "20px"}}>Dashboard</h1>
        <hr/>
        <div>
          <h3>Welcome, {currentUser?.username || "User"}!</h3>
          <p>Role: {currentUser?.role || "N/A"}</p>
        </div>
        <br/>
        <h2 id="wd-dashboard-published" style={{marginLeft: "30px"}}>Your Created Courses ({displayedCourses.length})</h2>
        <hr/>
        <div id="wd-dashboard-courses" className="row">
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {displayedCourses.map((course) => (
              <div className="wd-dashboard-course col" style={{width: "300px"}}>
                <Link to={`/Kanbas/Courses/${course.number}/Home`} className="text-decoration-none">
                  <div className="card rounded-3 overflow-hidden">
                    <img src="/images/reactjs.jpg" height="{160}"/>
                    <div className="card-body">
                      <span className="wd-dashboard-course-link" style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>{course.name}</span>
                      <p className="wd-dashboard-course-title card-text" style={{maxHeight: 53, overflow: "hidden"}}>{course.description}</p>
                      <Link to={`/Kanbas/Courses/${course.number}/Home`} className="btn btn-danger">Go</Link>
                      <button onClick={(event) => { event.preventDefault(); handleDeleteCourse(course._id); }} className="btn btn-secondary float-end" id="wd-delete-course-click">Delete</button>
                      {/*<button onClick={(event) => { event.preventDefault(); setCourse(course); }} className="btn btn-warning me-2 float-end" id="wd-edit-course-click">Edit</button>*/}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h5>Create New Course</h5>
          <form>
            <div className="mb-3">
              <label htmlFor="number" className="form-label">Course Number</label>
              <input type="text" className="form-control" id="number" placeholder="Number" name="number" value={courseData.number} onChange={(e) => setCourseData({ ...courseData, number: e.target.value })} />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Name" name="name" value={courseData.name} onChange={(e) => setCourseData({ ...courseData, name: e.target.value })} />
            </div>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">Start Date</label>
              <input type="date" className="form-control" id="startDate" placeholder="Start Date" name="startDate" value={courseData.startDate} onChange={(e) => setCourseData({ ...courseData, startDate: e.target.value })} />
            </div>
            <div className="mb-3">
              <label htmlFor="endDate" className="form-label">End Date</label>
              <input type="date" className="form-control" id="endDate" placeholder="End Date" name="endDate" value={courseData.endDate} onChange={(e) => setCourseData({ ...courseData, endDate: e.target.value })} />
            </div>
            <div className="mb-3">
              <label htmlFor="department" className="form-label">Department</label>
              <input type="text" className="form-control" id="department" placeholder="Department" name="department" value={courseData.department} onChange={(e) => setCourseData({ ...courseData, department: e.target.value })} />
            </div>
            <div className="mb-3">
              <label htmlFor="credits" className="form-label">Credits</label>
              <input type="number" className="form-control" id="credits" placeholder="Credits" name="credits" value={courseData.credits} onChange={(e) => setCourseData({ ...courseData, credits: parseInt(e.target.value) })} />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" id="description" placeholder="Description" name="description" value={courseData.description} onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}></textarea>
            </div>
            <button type="button" onClick={handleCreateCourse} className="btn btn-primary">Create Course</button>
          </form>
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
                              className="btn btn-danger
                              ">Go</Link>

                        <button onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }} className="btn btn-secondary float-end"
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
