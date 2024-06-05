import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

export default function AssignmentEditor() {
  return (
      <div id="wd-assignments-editor" className="container mt-4">
        <div className="mb-3">
          <label htmlFor="wd-name" className="form-label">Assignment Name</label>
          <input id="wd-name" className="form-control" value="A1 - ENV + HTML"/>
        </div>
        <div className="mb-3">
          <label htmlFor="wd-description" className="form-label">Description</label>
          <textarea id="wd-description" className="form-control" rows={6}>
        The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section, Links to each of the lab assignments, Link to the Kanbas application, Links to all relevant source code repositories. The Kanbas application should include a link to navigate back to the landing page.
        </textarea>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <label htmlFor="wd-points" className="form-label">Points</label>
          </div>
          <div className="col-md-4">
            <input id="wd-points" className="form-control" value={100}/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <label htmlFor="wd-group" className="form-label">Assignment Group</label>
          </div>
          <div className="col-md-4">
            <select id="wd-group" className="form-select">
              <option value="assignments">ASSIGNMENTS</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
          </div>
          <div className="col-md-4">
            <select id="wd-display-grade-as" className="form-select">
              <option value="percentage">Percentage</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
          </div>
          <div className="col-md-10">
            <select id="wd-submission-type" className="form-select">
              <option value="online">Online</option>
            </select>
            <div className="mt-2">
              <label className="form-label">Online Entry Options</label>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="wd-text-entry"/>
                <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="wd-text-entry"/>
                <label className="form-check-label" htmlFor="wd-text-entry">Website URL</label>
              </div>
              {/*<div className="form-check">*/}
              {/*  <input className="form-check-input" type="checkbox" id="wd-website-url" checked/>*/}
              {/*  <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>*/}
              {/*</div>*/}
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="wd-media-recordings"/>
                <label className="form-check-label" htmlFor="wd-media-recordings">Media
                  Recordings</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="wd-student-annotation"/>
                <label className="form-check-label" htmlFor="wd-student-annotation">Student
                  Annotation</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="wd-file-upload"/>
                <label className="form-check-label" htmlFor="wd-file-upload">File Upload</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row mb-3">
                <div className="col-md-2">
                    <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
                  </div>
                  <div className="col-md-10">
                    <input id="wd-assign-to" className="form-control" value="Everyone"/>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-2">
                    <label htmlFor="wd-due-date" className="form-label">Due</label>
                  </div>
                  <div className="col-md-10">
                    <input id="wd-due-date" className="form-control" type="datetime-local"
                           value="2024-05-13T23:59"/>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-2">
                    <label htmlFor="wd-available-from" className="form-label">Available from</label>
                  </div>
                  <div className="col-md-4">
                    <input id="wd-available-from" className="form-control" type="datetime-local"
                           value="2024-05-06T00:00"/>
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="wd-available-until" className="form-label">Until</label>
                  </div>
                  <div className="col-md-4">
                    <input id="wd-available-until" className="form-control" type="datetime-local"
                           value="2024-05-20T00:00"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2">Cancel</button>
          <button className="btn btn-danger">Save</button>
        </div>
      </div>
  );
}


// export default function AssignmentEdit() {
//   return (
//       <div id="wd-assignments-editor">
//         <label htmlFor="wd-name">Assignment Name</label>
//         <input id="wd-name" value="A1 - ENV + HTML"/><br/><br/>
//         <textarea id="wd-description" cols={40} rows={12}>
//         The assignment is available onlineLinks to an external site.
// Submit a link to the landing page of your Web application running on Netlify.
// The landing page should include the following:
// Your full name and section
// Links to each of the lab assignments
// Link to the Kanbas application
// Links to all relevant source code repositories
// The Kanbas application should include a link to navigate back to the landing page.
//       </textarea>
//         <br/>
//         <br/>
//         <table>
//           <tr>
//             <td align="right" valign="top">
//               <label htmlFor="wd-points">Points</label>
//             </td>
//             <td>
//               <input id="wd-points" value={100}/>
//             </td>
//           </tr>
//           {/* Complete on your own */}
//           <br/>
//           <tr>
//             <td align="right" valign="top">
//               <label htmlFor="wd-group">Assignment Group</label>
//             </td>
//             <td>
//               <select id="wd-group">
//                 <option value="assignments">ASSIGNMENTS</option>
//               </select>
//             </td>
//           </tr>
//           <br/>
//           <tr>
//             <td align="right" valign="top">
//               <label htmlFor="wd-display-grade-as">Display Grade as</label>
//             </td>
//             <td>
//               <select id="wd-display-grade-as">
//                 <option value="percentage">Percentage</option>
//               </select>
//             </td>
//           </tr>
//           <br/>
//           <tr>
//             <td align="right" valign="top">
//               <label htmlFor="wd-submission-type">Submission Type</label>
//             </td>
//             <td>
//               <select id="wd-submission-type">
//                 <option value="online">Online</option>
//               </select> <br/> <br/>
//               <line>Online Entry Options</line>
//               <div>
//                 <input type="checkbox" id="wd-text-entry"/>
//                 <label htmlFor="wd-text-entry">Text Entry</label><br/>
//                 <input type="checkbox" id="wd-website-url"/>
//                 <label htmlFor="wd-website-url">Website URL</label><br/>
//                 <input type="checkbox" id="wd-media-recordings"/>
//                 <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
//                 <input type="checkbox" id="wd-student-annotation"/>
//                 <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
//                 <input type="checkbox" id="wd-file-upload"/>
//                 <label htmlFor="wd-file-upload">File Upload</label>
//               </div>
//             </td>
//           </tr>
//           <br/>
//           <tr>
//             <td align="right" valign="top">
//               <label htmlFor="wd-assign-to">Assign</label>
//             </td>
//             <td>
//               <label htmlFor="wd-assign-to">Assign to</label> <br/>
//               <input id="wd-assign-to" value="Everyone"/>
//             </td>
//           </tr>
//           <br/>
//           <tr>
//             <td align="right" valign="top">
//             </td>
//             <td>
//               <label htmlFor="wd-due-date">Due</label> <br/>
//               <input id="wd-due-date" type="date" value="2024-05-13"/>
//             </td>
//           </tr>
//           <br/>
//           <tr>
//             <td align="right" valign="top">
//             </td>
//             <td>
//               <label htmlFor="wd-available-from">Available from</label> <br/>
//               <input id="wd-available-from" type="date" value="2024-05-06"/>
//             </td>
//             <td align="right" valign="top">
//             </td>
//             <td>
//               <label htmlFor="wd-available-until">Until</label> <br/>
//               <input id="wd-available-until" type="date" value="2024-05-20"/>
//             </td>
//           </tr>
//         </table>
//         <hr/>
//         <div style={{display: 'flex', justifyContent: 'flex-end'}}>
//           <button style={{marginRight: '10px'}}>Cancel</button>
//           <button>Save</button>
//         </div>
//       </div>
//   );
// }


