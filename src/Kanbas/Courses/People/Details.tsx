import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import * as client from "./client";
import { FaPencil } from "react-icons/fa6";
import {FaCheck, FaEdit, FaUserCircle} from "react-icons/fa";
import {updateUserEmail} from "./client";
import {stringify} from "node:querystring";
export default function PeopleDetails({ fetchUsers }:
                                          { fetchUsers: () => void; }) {
  const navigate = useNavigate();
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    fetchUsers();
    navigate(`/Kanbas/Courses/${cid}/People`);
  };

  const { uid, cid } = useParams();
  const [user, setUser] = useState<any>({});

  const [email, setEmail] = useState("");
  const [role, setRole] = useState(user.role || "");
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingRole, setEditingRole] = useState(false);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    fetchUsers();
    navigate(`/Kanbas/Courses/${cid}/People`);
  };

  const saveEmail = async () => {
    // const [firstName, lastName] = name.split(" ");
    //const updatedUserEmail = { ...user,email };
    await client.updateUserEmail(uid!, email);
    setUser({ ...user, email });
    //setEmail(updatedUserEmail);
    setEditingEmail(false);
    fetchUsers();
    navigate(`/Kanbas/Courses/${cid}/People`);
  };


  // const saveEmail = async () => {
  //   try {
  //     await client.updateUserEmail(uid!, email);
  //     setUser({ ...user, email });
  //     setEditingEmail(false);
  //     fetchUsers();
  //     navigate(`/Kanbas/Courses/${cid}/People`);
  //   } catch (error) {
  //     console.error("Failed to update email", error);
  //   }
  // };

  const saveRole = async () => {
    try {
      await client.updateUserRole(uid!, role);
      setUser({ ...user, role });
      setEditingRole(false);
      fetchUsers();
      navigate(`/Kanbas/Courses/${cid}/People`);
    } catch (error) {
      console.error("Failed to update role", error);
    }
  };


  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;

  const handleSaveRole = () => {
    saveRole();
    setEditingRole(false);
  };

  return (
      <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
        <Link to={`/Kanbas/Courses/${cid}/People`} className="btn position-fixed end-0 top-0 wd-close-details">
          <IoCloseSharp className="fs-1"/> </Link>
        <div className="text-center mt-2"><FaUserCircle className="text-secondary me-2 fs-1"/></div>
        <hr/>

        <div className="text-danger fs-4 wd-name"> {!editing && (
            <FaPencil onClick={() => setEditing(true)}
                      className="float-end fs-5 mt-2 wd-edit"/>)}
          {editing && (
              <FaCheck onClick={() => saveUser()}
                       className="float-end fs-5 mt-2 me-2 wd-save"/>)}
          {!editing && (
              <div className="wd-name"
                   onClick={() => setEditing(true)}>
                {user.firstName} {user.lastName}</div>)}
          {user && editing && (
              <input className="form-control w-50 wd-edit-name"
                     defaultValue={`${user.firstName} ${user.lastName}`}
                     onChange={(e) => setName(e.target.value)}
                     onKeyDown={(e) => {
                       if (e.key === "Enter") {
                         saveUser();
                       }
                     }}
              />
          )}
        </div>

        <div className="wd-email"> {!editingEmail && (
            <FaPencil onClick={() => setEditingEmail(true)}
                      className="text-danger float-end fs-5 mt-2 wd-edit"/>)}
          {editingEmail && (
              <FaCheck onClick={() => saveEmail()}
                       className="float-end fs-5 mt-2 me-2 wd-save"/>)}
          {!editingEmail && (
              <div className="wd-email"
                   onClick={() => setEditingEmail(true)}>
                {user.email} </div>)}
          {user && editingEmail && (
              <input className="form-control w-50 wd-edit-name"
                     defaultValue={`${user.email}`}
                     onChange={(e) => setEmail(e.target.value)}
                     onKeyDown={(e) => {
                       if (e.key === "Enter") {
                         saveEmail();
                       }
                     }}
              />
          )}
        </div>

        <div className="wd-role" style={{ display: 'flex', alignItems: 'center' }}>
          <b>Role:</b>
          {editingRole ? (
            <>
              <select
                className="form-control wd-edit-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '8px',
                  marginLeft: '10px'
                }}
              >
                <option value="">Select Role</option>
                <option value="STUDENT">Students</option>
                <option value="TA">Assistants</option>
                <option value="FACULTY">Faculty</option>
              </select>
              <FaCheck onClick={handleSaveRole} className="fs-5 wd-save" style={{ marginLeft: '10px' }} />
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
              <span>{role || "No role assigned"}</span>
              <FaEdit onClick={() => setEditingRole(true)} style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </div>
          )}
        </div>


        {/*<b>Roles:</b> <span className="wd-roles">         {user.role}         </span> <br/>*/}
        <b>Login ID:</b> <span className="wd-login-id">      {user.loginId}      </span> <br/>
        <b>Section:</b> <span className="wd-section">       {user.section}      </span> <br/>
        <b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity}</span>

        <hr/>
        <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete"> Delete</button>
        <button onClick={() => navigate(`/Kanbas/Courses/${cid}/People`)}
                className="btn btn-secondary float-start float-end me-2 wd-cancel"> Cancel
        </button>


      </div>);
}