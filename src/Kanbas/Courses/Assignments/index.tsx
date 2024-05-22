export default function Assignments() {
  return (
      <div id="wd-assignments">
        <input id="wd-search-assignment"
               placeholder="Search for Assignments" />
        <button id="wd-add-assignment-group">+ Group</button>
        <button id="wd-add-assignment">+ Assignment</button>
        <h3 id="wd-assignments-title">
          ASSIGNMENTS 40% of Total <button>+</button>
        </h3>
        <ul id="wd-assignment-list">
          <li className="wd-assignment-list-item">
            <a className="wd-assignment-link"
               href="#/Kanbas/Courses/1234/Assignments/123">
              A1 - ENV + HTML
            </a>
            <div>Multiple Modules | <span
                style={{fontWeight: 'bold'}}>Not available until</span> May 6 at 12:00am | <br/>
              <span
                  style={{fontWeight: 'bold'}}>Due</span> May 13 at 11:59pm | 100 pts
            </div>
          </li>
          <li className="wd-assignment-list-item2">
            <a className="wd-assignment-link2"
               href="#/Kanbas/Courses/1234/Assignments/1234">
              A2 - CSS + BOOTSTRAP
            </a>
            <div>Multiple Modules | <span
                style={{fontWeight: 'bold'}}>Not available until</span> May 13 at 12:00am | <br/>
              <span
                  style={{fontWeight: 'bold'}}>Due</span> May 20 at 11:59pm | 100 pts
            </div>
          </li>
          <li className="wd-assignment-list-item3">
            <a className="wd-assignment-link3"
               href="#/Kanbas/Courses/1234/Assignments/12345">
              A3 - JAVASCRIPT + REACT
            </a>
            <div>Multiple Modules | <span
                style={{fontWeight: 'bold'}}>Not available until</span> May 20 at 12:00am | <br/>
              <span
                  style={{fontWeight: 'bold'}}>Due</span> May 27 at 11:59pm | 100 pts
            </div>
          </li>
        </ul>
      </div>
  );
}
