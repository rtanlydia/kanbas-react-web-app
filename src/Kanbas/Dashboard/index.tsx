import { Link } from "react-router-dom";
import db from "../Database";
import React, { useState } from "react";



export default function Dashboard(
    { courses, course, setCourse, addNewCourse,
      deleteCourse, updateCourse }: {
      courses: any[]; course: any; setCourse: (course: any) => void;
      addNewCourse: () => void; deleteCourse: (course: any) => void;
      updateCourse: () => void; }
) {
  return (
      <div id="wd-dashboard" style={{marginLeft: "30px", marginTop: "30px"}}>
        <h1 id="wd-dashboard-title" style={{marginBottom: "20px"}}>Dashboard</h1>
        <hr/>
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
                  <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none">

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
                        <Link to={`/Kanbas/Courses/${course._id}/Home`}
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

            <div className="wd-dashboard-course col" style={{width: "300px"}}>
            <div className="card" style={{height: "280px"}}>
                <img src="/images/cs5001.jpg" alt="CS 5001"
                     style={{width: "100%", height: "200px", objectFit: "cover"}}/>
                <div className="card-body" style={{height: "300px"}}>
                  <a className="wd-dashboard-course-link"
                     href="#/Kanbas/Courses/5001/Home"
                     style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                    CS 5001
                  </a>
                  <p className="wd-dashboard-course-title card-text">
                    Intensive Foundations of CS
                  </p>
                  <a href="#/Kanbas/Courses/5001/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div>

            <div className="wd-dashboard-course col" style={{width: "300px"}}>
              <div className="card" style={{height: "280px"}}>
                <img src="/images/cs5002.jpg" alt="CS 5002"
                     style={{width: "100%", height: "200px", objectFit: "cover"}}/>
                <div className="card-body" style={{height: "300px"}}>
                  <a className="wd-dashboard-course-link"
                     href="#/Kanbas/Courses/5002/Home"
                     style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                    CS 5001
                  </a>
                  <p className="wd-dashboard-course-title card-text">
                    Discrete & Data Structures
                  </p>
                  <a href="#/Kanbas/Courses/5002/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div>

            <div className="wd-dashboard-course col" style={{width: "300px"}}>
              <div className="card" style={{height: "280px"}}>
                <img src="/images/cs5004.jpg" alt="CS 5004"
                     style={{width: "100%", height: "200px", objectFit: "cover"}}/>
                <div className="card-body" style={{height: "300px"}}>
                  <a className="wd-dashboard-course-link"
                     href="#/Kanbas/Courses/5004/Home"
                     style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                    CS 5004
                  </a>
                  <p className="wd-dashboard-course-title card-text">
                    Object-Oriented Design
                  </p>
                  <a href="#/Kanbas/Courses/5004/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div>

            <div className="wd-dashboard-course col" style={{width: "300px"}}>
              <div className="card" style={{height: "280px"}}>
                <img src="/images/cs5008.jpg" alt="CS 5008"
                     style={{width: "100%", height: "200px", objectFit: "cover"}}/>
                <div className="card-body" style={{height: "300px"}}>
                  <a className="wd-dashboard-course-link"
                     href="#/Kanbas/Courses/5008/Home"
                     style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                    CS 5004
                  </a>
                  <p className="wd-dashboard-course-title card-text">
                    Data Structures
                  </p>
                  <a href="#/Kanbas/Courses/5008/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div>

            <div className="wd-dashboard-course col" style={{width: "300px"}}>
              <div className="card" style={{height: "280px"}}>
                <img src="/images/cs5610.jpg" alt="CS 5610"
                     style={{width: "100%", height: "200px", objectFit: "cover"}}/>
                <div className="card-body" style={{height: "300px"}}>
                  <a className="wd-dashboard-course-link"
                     href="#/Kanbas/Courses/5610/Home"
                     style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                    CS 5004
                  </a>
                  <p className="wd-dashboard-course-title card-text">
                    Web Development
                  </p>
                  <a href="#/Kanbas/Courses/5610/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div>

            <div className="wd-dashboard-course col" style={{width: "300px"}}>
              <div className="card" style={{height: "280px"}}>
                <img src="/images/cs5800.jpg" alt="CS 5800"
                     style={{width: "100%", height: "200px", objectFit: "cover"}}/>
                <div className="card-body" style={{height: "300px"}}>
                  <a className="wd-dashboard-course-link"
                     href="#/Kanbas/Courses/5800/Home"
                     style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                    CS 5004
                  </a>
                  <p className="wd-dashboard-course-title card-text">
                    Algorithms
                  </p>
                  <a href="#/Kanbas/Courses/5800/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
  );
}




