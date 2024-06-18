// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';
//
// export default function AssignmentEditor() {
//   return (
//       <div id="wd-assignments-editor" className="container mt-4">
//         <div className="mb-3">
//           <label htmlFor="wd-name" className="form-label">Assignment Name</label>
//           <input id="wd-name" className="form-control" value="A1 - ENV + HTML"/>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="wd-description" className="form-label">Description</label>
//           <textarea id="wd-description" className="form-control" rows={6}>
//         The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section, Links to each of the lab assignments, Link to the Kanbas application, Links to all relevant source code repositories. The Kanbas application should include a link to navigate back to the landing page.
//         </textarea>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-2">
//             <label htmlFor="wd-points" className="form-label">Points</label>
//           </div>
//           <div className="col-md-4">
//             <input id="wd-points" className="form-control" value={100}/>
//           </div>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-2">
//             <label htmlFor="wd-group" className="form-label">Assignment Group</label>
//           </div>
//           <div className="col-md-4">
//             <select id="wd-group" className="form-select">
//               <option value="assignments">ASSIGNMENTS</option>
//             </select>
//           </div>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-2">
//             <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
//           </div>
//           <div className="col-md-4">
//             <select id="wd-display-grade-as" className="form-select">
//               <option value="percentage">Percentage</option>
//             </select>
//           </div>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-2">
//             <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
//           </div>
//           <div className="col-md-10">
//             <select id="wd-submission-type" className="form-select">
//               <option value="online">Online</option>
//             </select>
//             <div className="mt-2">
//               <label className="form-label">Online Entry Options</label>
//               <div className="form-check">
//                 <input className="form-check-input" type="checkbox" id="wd-text-entry"/>
//                 <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
//               </div>
//               <div className="form-check">
//                 <input className="form-check-input" type="checkbox" id="wd-text-entry"/>
//                 <label className="form-check-label" htmlFor="wd-text-entry">Website URL</label>
//               </div>
//               {/*<div className="form-check">*/}
//               {/*  <input className="form-check-input" type="checkbox" id="wd-website-url" checked/>*/}
//               {/*  <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>*/}
//               {/*</div>*/}
//               <div className="form-check">
//                 <input className="form-check-input" type="checkbox" id="wd-media-recordings"/>
//                 <label className="form-check-label" htmlFor="wd-media-recordings">Media
//                   Recordings</label>
//               </div>
//               <div className="form-check">
//                 <input className="form-check-input" type="checkbox" id="wd-student-annotation"/>
//                 <label className="form-check-label" htmlFor="wd-student-annotation">Student
//                   Annotation</label>
//               </div>
//               <div className="form-check">
//                 <input className="form-check-input" type="checkbox" id="wd-file-upload"/>
//                 <label className="form-check-label" htmlFor="wd-file-upload">File Upload</label>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-12">
//             <div className="card">
//               <div className="card-body">
//                 <div className="row mb-3">
//                 <div className="col-md-2">
//                     <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
//                   </div>
//                   <div className="col-md-10">
//                     <input id="wd-assign-to" className="form-control" value="Everyone"/>
//                   </div>
//                 </div>
//                 <div className="row mb-3">
//                   <div className="col-md-2">
//                     <label htmlFor="wd-due-date" className="form-label">Due</label>
//                   </div>
//                   <div className="col-md-10">
//                     <input id="wd-due-date" className="form-control" type="datetime-local"
//                            value="2024-05-13T23:59"/>
//                   </div>
//                 </div>
//                 <div className="row mb-3">
//                   <div className="col-md-2">
//                     <label htmlFor="wd-available-from" className="form-label">Available from</label>
//                   </div>
//                   <div className="col-md-4">
//                     <input id="wd-available-from" className="form-control" type="datetime-local"
//                            value="2024-05-06T00:00"/>
//                   </div>
//                   <div className="col-md-2">
//                     <label htmlFor="wd-available-until" className="form-label">Until</label>
//                   </div>
//                   <div className="col-md-4">
//                     <input id="wd-available-until" className="form-control" type="datetime-local"
//                            value="2024-05-20T00:00"/>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <hr/>
//         <div className="d-flex justify-content-end">
//           <button className="btn btn-secondary me-2">Cancel</button>
//           <button className="btn btn-danger">Save</button>
//         </div>
//       </div>
//   );
// }
//
//

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import db from '../../Database';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string, aid: string }>();
  const assignment = db.assignments.find((assignment: any) => assignment._id === aid);

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
      <div id="wd-assignments-editor" className="container mt-4">
        <div className="mb-3">
          <label htmlFor="wd-name" className="form-label">Assignment Name</label>
          <input id="wd-name" className="form-control" value={assignment.title} readOnly />
        </div>
        <div className="mb-3">
          <label htmlFor="wd-description" className="form-label">Description</label>
          <textarea id="wd-description" className="form-control" rows={6} value={"Unknow"} readOnly />
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <label htmlFor="wd-points" className="form-label">Points</label>
          </div>
          <div className="col-md-4">
            <input id="wd-points" className="form-control" value={100} readOnly />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <label htmlFor="wd-due-date" className="form-label">Due Date</label>
          </div>
          <div className="col-md-4">
            <input id="wd-due-date" className="form-control" type="datetime-local" value={"2024-06-18T23:59"} readOnly />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <label htmlFor="wd-available-date" className="form-label">Available Date</label>
          </div>
          <div className="col-md-4">
            <input id="wd-available-date" className="form-control" type="datetime-local" value={"2024-06-20T23:59"} readOnly />
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-end">
          <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
          <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-danger">Save</Link>
        </div>
      </div>
  );
}
