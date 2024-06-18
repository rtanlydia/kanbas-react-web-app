import { Link } from "react-router-dom";
import db from "../Database";


export default function Dashboard() {
  const courses = db.courses;
  return (
      <div id="wd-dashboard" style={{ marginLeft: "30px", marginTop: "30px"}}>
        <h1 id="wd-dashboard-title" style={{ marginBottom: "20px" }}>Dashboard</h1> <hr />

        <h2 id="wd-dashboard-published" style={{ marginLeft: "30px" }}>Published Courses ({courses.length})</h2> <hr />
        <div id="wd-dashboard-courses" className="row">
          <div className="row row-cols-1 row-cols-md-5 g-4">

            {courses.map((course) => (
              <div className="wd-dashboard-course col" style={{width: "300px"}}>
                <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none">
                  {/*<div className="card" style={{height: "280px"}}>*/}
                  {/*  <img src="/images/reactjs.jpg" alt="React JS"*/}
                  {/*       style={{width: "100%", height: "200px", objectFit: "cover"}}/>*/}
                  {/*  <div className="card-body" style={{height: "300px"}}>*/}
                  {/*    <a className="wd-dashboard-course-link"*/}
                  {/*       href="#/Kanbas/Courses/1234/Home"*/}
                  {/*       style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>*/}
                  {/*      CS1234 React JS*/}
                  {/*    </a>*/}
                  {/*    <p className="wd-dashboard-course-title card-text">*/}
                  {/*      Full Stack software developer*/}
                  {/*    </p>*/}
                  {/*    <a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary"> Go </a>*/}

                  {/*  </div>*/}
                  {/*</div>*/}
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




