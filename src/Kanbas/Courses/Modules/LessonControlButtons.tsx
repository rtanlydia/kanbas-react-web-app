import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus, BsGripVertical } from "react-icons/bs";
import React from 'react';
import "./index.css";
import { HiOutlinePlus } from "react-icons/hi2";


export function LessonControlButtons() {
  return (
      <div className="float-end">
        <GreenCheckmark />
        <IoEllipsisVertical className="fs-4" />
      </div>
  );}

export function ModuleControlButtons() {
  return (
      <div className="float-end">
        <GreenCheckmark />
        <HiOutlinePlus className="me-2" />
        <IoEllipsisVertical className="fs-4" />
      </div>
  );
}

export function AssignmentsControlButtons() {
  return (
      <div className="float-end">
        {/*   <p className="wd-rounded-corners-all-around*/}
        {/*wd-border-thin wd-border-blue wd-border-solid*/}
        {/*wd-padding-fat">*/}
        {/*     40% of Total*/}
        {/*   </p>*/}

        <span className="badge bg-secondary custom-badge">40% of Total</span>
        <button className="btn-no-border ms-2"><HiOutlinePlus style={{ fontSize: '24px' }}/></button>
        <IoEllipsisVertical className="fs-4"/>
      </div>
  );
}