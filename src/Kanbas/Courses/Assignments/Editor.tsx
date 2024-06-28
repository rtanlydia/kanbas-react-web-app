import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addAssignment, updateAssignment } from './reducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string, aid: string }>();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNewAssignment = aid === "new";

  const [assignment, setAssignment] = useState<any>({
    title: '',
    description: '',
    points: 100,
    dueDate: '',
    availableFrom: '',
    availableUntil: ''
  });

  useEffect(() => {
    if (!isNewAssignment) {
      const existingAssignment = assignments.find((a: any) => a._id === aid);
      if (existingAssignment) {
        setAssignment(existingAssignment);
      }
    }
  }, [aid, assignments, isNewAssignment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setAssignment((prevAssignment: any) => ({
      ...prevAssignment,
      [id]: value
    }));
  };

  const handleSave = () => {
    if (isNewAssignment) {
      dispatch(addAssignment({ ...assignment, course: cid }));
    } else {
      dispatch(updateAssignment({ ...assignment, _id: aid, course: cid }));
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
      <div id="wd-assignments-editor" className="container mt-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Assignment Name</label>
          <input id="title" className="form-control" value={assignment.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea id="description" className="form-control" rows={6} value={assignment.description} onChange={handleChange} />
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <label htmlFor="points" className="form-label">Points</label>
          </div>
          <div className="col-md-4">
            <input id="points" className="form-control" type="number" value={assignment.points} onChange={handleChange} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <label htmlFor="dueDate" className="form-label">Due Date</label>
          </div>
          <div className="col-md-4">
            <input id="dueDate" className="form-control" type="datetime-local" value={assignment.dueDate} onChange={handleChange} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <label htmlFor="availableFrom" className="form-label">Available From</label>
          </div>
          <div className="col-md-4">
            <input id="availableFrom" className="form-control" type="datetime-local" value={assignment.availableFrom} onChange={handleChange} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <label htmlFor="availableUntil" className="form-label">Available Until</label>
          </div>
          <div className="col-md-4">
            <input id="availableUntil" className="form-control" type="datetime-local" value={assignment.availableUntil} onChange={handleChange} />
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={handleCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={handleSave}>Save</button>
        </div>
      </div>
  );
}
