export default function Dashboard() {
  return (
      <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
        <div id="wd-dashboard-courses">
          <div className="wd-dashboard-course">
            <img src="/images/reactjs.jpg" width={200}/>
            <div>
              <a className="wd-dashboard-course-link"
                 href="#/Kanbas/Courses/1234/Home">
                CS 1234 React JS
              </a>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>
          </div>

          <div className="wd-dashboard-course">
            <img src="/images/cs5001.jpg" width={200}/>
            <div>
              <a className="wd-dashboard-course-link"
                 href="#/Kanbas/Courses/5001/Home">
                CS 5001
              </a>
              <p className="wd-dashboard-course-title">
                Intensive Foundations of CS
              </p>
              <a href="#/Kanbas/Courses/5001/Home"> Go </a>
            </div>
          </div>

          <div className="wd-dashboard-course">
            <img src="/images/cs5002.jpg" width={200}/>
            <div>
              <a className="wd-dashboard-course-link"
                 href="#/Kanbas/Courses/5002/Home">
                CS 5002
              </a>
              <p className="wd-dashboard-course-title">
                Discrete & Data Structures
              </p>
              <a href="#/Kanbas/Courses/5002/Home"> Go </a>
            </div>
          </div>

          <div className="wd-dashboard-course">
            <img src="/images/cs5004.jpg" width={200}/>
            <div>
              <a className="wd-dashboard-course-link"
                 href="#/Kanbas/Courses/5004/Home">
                CS 5004
              </a>
              <p className="wd-dashboard-course-title">
                Object-Oriented Design
              </p>
              <a href="#/Kanbas/Courses/5004/Home"> Go </a>
            </div>
          </div>

          <div className="wd-dashboard-course">
            <img src="/images/cs5008.jpg" width={200}/>
            <div>
              <a className="wd-dashboard-course-link"
                 href="#/Kanbas/Courses/5008/Home">
                CS 5008
              </a>
              <p className="wd-dashboard-course-title">
                Data Structures
              </p>
              <a href="#/Kanbas/Courses/5008/Home"> Go </a>
            </div>
          </div>

          <div className="wd-dashboard-course">
            <img src="/images/cs5610.jpg" width={200}/>
            <div>
              <a className="wd-dashboard-course-link"
                 href="#/Kanbas/Courses/5610/Home">
                CS 5610
              </a>
              <p className="wd-dashboard-course-title">
                Web Development
              </p>
              <a href="#/Kanbas/Courses/5610/Home"> Go </a>
            </div>
          </div>

          <div className="wd-dashboard-course">
            <img src="/images/cs5800.jpg" width={200}/>
            <div>
              <a className="wd-dashboard-course-link"
                 href="#/Kanbas/Courses/5800/Home">
                CS 5800
              </a>
              <p className="wd-dashboard-course-title">
                Algorithms
              </p>
              <a href="#/Kanbas/Courses/5800/Home"> Go </a>
            </div>
          </div>

          <div className="wd-dashboard-course"> </div>
          <div className="wd-dashboard-course"> </div>
        </div>
      </div>
  );
}
