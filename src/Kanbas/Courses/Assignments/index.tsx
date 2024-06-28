import React, { useState } from 'react';
import { FaSearch, FaCheckCircle, FaEllipsisV, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsGripVertical } from "react-icons/bs";
import { HiOutlinePlus } from "react-icons/hi2";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import "./index.css";
import { MdAssignmentAdd } from "react-icons/md";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAssignment } from './reducer';

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const [assignmentName, setAssignmentName] = useState("");
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courseAssignments = assignments.filter((assignment: any) => assignment.course === cid);

  const addNewAssignment = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/new`);
  };

  const deleteAssignmentById = (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  return (
      <div id="wd-assignments" className="container mt-4">
        <div className="d-flex justify-content-between mb-3">
          <div className="input-group w-50">
            <span className="input-group-text"><FaSearch/></span>
            <input id="wd-search-assignment" className="form-control" placeholder="Search for Assignments" />
          </div>
          <div className="custom-button">
            <button id="wd-add-assignment-group" className="btn btn-outline-secondary me-2">
              <HiOutlinePlus className="me-1" style={{fontSize: '24px'}}/> Group
            </button>
            <button id="wd-add-assignment" className="btn btn-danger" onClick={addNewAssignment}>
              <HiOutlinePlus className="me-1" style={{fontSize: '24px'}}/> Assignment
            </button>
          </div>
        </div>
        <div className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="me-1 fs-3"/>
          <button className="btn-no-border ms-2"><TbTriangleInvertedFilled style={{fontSize: '8px'}} className="me-2"/></button>
          <strong className="me-auto align-text-top">ASSIGNMENTS</strong>
        </div>
        <ul id="wd-assignment-list" className="list-group">
          {courseAssignments.map((assignment: any) => (
              <li key={assignment._id} className="wd-title wd-assignment-list-item list-group-item d-flex justify-content-between align-items-center with-border-left">
                <div className="d-flex align-items-center">
                  <div className="border-start border-success border-3 me-0" style={{height: '100%'}}></div>
                  <BsGripVertical className="me-2 text-muted" style={{fontSize: '25px'}}/>
                  <MdAssignmentAdd className="me-3 custom-text-color-assignment-icon" style={{fontSize: '20px'}}/>
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center">
                      <Link className="wd-assignment-link fw-bold me-2 custom-text-color2 no-underline" to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                        {assignment.title}
                      </Link>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="custom-text-color-multiple-module me-2">Multiple Modules</span>
                      <span className="text-muted me-2">|</span>
                      <span className="text-muted"><span className="fw-bold">Available until</span> {assignment.availableUntil || 'N/A'}</span>
                    </div>
                    <div className="small text-muted mt-1">
                      <span className="fw-bold">Due</span> {assignment.dueDate || 'N/A'} | {assignment.points || 100} pts
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <FaCheckCircle className="text-success me-3"/>
                  <FaTrash className="text-danger" onClick={() => deleteAssignmentById(assignment._id)} />
                  <FaEllipsisV className="text-muted"/>
                </div>
              </li>
          ))}
        </ul>
      </div>
  );
}
