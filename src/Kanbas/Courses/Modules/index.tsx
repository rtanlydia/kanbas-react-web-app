export default function Modules() {
  return (
      <div>
        {/* Collapse All button, View Progress button, etc. */}
        <button id="wd-all-good" onClick={() => alert("Collapse All!")} type="button">
          Collapse All
        </button>

        <button id="wd-all-good" onClick={() => alert("View Progress!")} type="button">
          View Progress
        </button>

        <select id="wd-select-one-genre">
          <option value="UNPUBLISH">Unpublish</option>
          <option selected value="PUBLISH">
            Publish All
          </option>
        </select>

        <button id="wd-all-good" onClick={() => alert("+ Module!")} type="button">
          + Module
        </button>

        <ul id="wd-modules">
          <li className="wd-module">
            <div className="wd-title">Week 1</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 2</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  );
}
