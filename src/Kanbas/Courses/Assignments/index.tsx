import React from 'react';
import { FaSearch, FaCheckCircle, FaEllipsisV, FaGripVertical} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsGripVertical} from "react-icons/bs";
import {AssignmentsControlButtons} from "../Modules/LessonControlButtons";
import { HiOutlinePlus } from "react-icons/hi2";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import "./index.css";
import { MdAssignmentAdd } from "react-icons/md";


export default function Assignments() {
  return (
      <div id="wd-assignments" className="container mt-4">
        <div className="d-flex justify-content-between mb-3">
          <div className="input-group w-50">
            <span className="input-group-text"><FaSearch/></span>
            <input id="wd-search-assignment" className="form-control"
                   placeholder="Search for Assignments"/>
          </div>

          <div className="custom-button">
            <button id="wd-add-assignment-group" className="btn btn-outline-secondary me-2">
              <HiOutlinePlus className="me-1" style={{fontSize: '24px'}}/> Group
            </button>
            <button id="wd-add-assignment" className="btn btn-danger">
              <HiOutlinePlus className="me-1" style={{fontSize: '24px'}}/> Assignment
            </button>
          </div>


        </div>
        <div className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="me-1 fs-3"/>

          <button className="btn-no-border ms-2"><TbTriangleInvertedFilled
              style={{fontSize: '8px'}} className="me-2"/>
          </button>

          <strong className="me-auto align-text-top">ASSIGNMENTS </strong>
          <AssignmentsControlButtons/>
        </div>

        <ul id="wd-assignment-list" className="list-group">


          <li className="wd-title wd-assignment-list-item list-group-item d-flex justify-content-between align-items-center with-border-left">
            <div className="d-flex align-items-center">
              <div className="border-start border-success border-3 me-0"
                   style={{height: '100%'}}></div>
              <BsGripVertical className="me-2 text-muted" style={{fontSize: '25px'}}/>
              <MdAssignmentAdd className="me-3 custom-text-color-assignment-icon"
                               style={{fontSize: '20px'}}/>
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                  <a className="wd-assignment-link fw-bold me-2 custom-text-color2 no-underline"
                     href="#/Kanbas/Courses/1234/Assignments/123">A1</a>
                </div>
                <div className="d-flex align-items-center">
                  <span className="custom-text-color-multiple-module me-2">Multiple Modules</span>
                  <span className="text-muted me-2">|</span>
                  <span className="text-muted"><span className="fw-bold">Not available until</span> May 6 at 12:00am</span>
                </div>
                <div className="small text-muted mt-1">
                  <span className="fw-bold">Due</span> May 13 at 11:59pm | 100 pts
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <FaCheckCircle className="text-success me-3"/>
              <FaEllipsisV className="text-muted"/>
            </div>
          </li>


          <li className="wd-title wd-assignment-list-item list-group-item d-flex justify-content-between align-items-center with-border-left">
            <div className="d-flex align-items-center">
              <div className="border-start border-success border-3 me-0"
                   style={{height: '100%'}}></div>
              <BsGripVertical className="me-2 text-muted" style={{fontSize: '25px'}}/>
              <MdAssignmentAdd className="me-3 custom-text-color-assignment-icon"
                               style={{fontSize: '20px'}}/>
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                  <a className="wd-assignment-link fw-bold me-2 custom-text-color2 no-underline"
                     href="#/Kanbas/Courses/1234/Assignments/123">A2 - CSS + BOOTSTRAP</a>
                </div>
                <div className="d-flex align-items-center">
                  <span className="custom-text-color-multiple-module me-2">Multiple Modules</span>
                  <span className="text-muted me-2">|</span>
                  <span className="text-muted"><span className="fw-bold">Not available until</span> May 13 at 12:00am</span>
                </div>
                <div className="small text-muted mt-1">
                  <span className="fw-bold">Due</span> May 20 at 11:59pm | 100 pts
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <FaCheckCircle className="text-success me-3"/>
              <FaEllipsisV className="text-muted"/>
            </div>
          </li>


          <li className="wd-title wd-assignment-list-item list-group-item d-flex justify-content-between align-items-center with-border-left">
            <div className="d-flex align-items-center">
              <div className="border-start border-success border-3 me-0"
                   style={{height: '100%'}}></div>
              <BsGripVertical className="me-2 text-muted" style={{fontSize: '25px'}}/>
              <MdAssignmentAdd className="me-3 custom-text-color-assignment-icon"
                               style={{fontSize: '20px'}}/>
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                  <a className="wd-assignment-link fw-bold me-2 custom-text-color2 no-underline"
                     href="#/Kanbas/Courses/1234/Assignments/123">A3 - JAVASCRIPT + REACT</a>
                </div>
                <div className="d-flex align-items-center">
                  <span className="custom-text-color-multiple-module me-2">Multiple Modules</span>
                  <span className="text-muted me-2">|</span>
                  <span className="text-muted"><span className="fw-bold">Not available until</span> May 20 at 12:00am</span>
                </div>
                <div className="small text-muted mt-1">
                  <span className="fw-bold">Due</span> May 25 at 11:59pm | 100 pts
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <FaCheckCircle className="text-success me-3"/>
              <FaEllipsisV className="text-muted"/>
            </div>
          </li>

        </ul>
      </div>
  );
}
