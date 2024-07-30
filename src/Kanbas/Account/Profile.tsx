import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import "./style.css";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const account = await client.profile();
      setProfile(account);
    } catch (err) {
      navigate("/Kanbas/Account/Signin");
    }
  };


  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="wd-profile-screen">
      <h1>Profile</h1>
      {profile && (
        <div className="wd-profile-container">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="wd-username"
            value={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="wd-password"
            value={profile.password}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            className="wd-firstname"
            value={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            className="wd-lastname"
            value={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
          <label htmlFor="dob">Date of Birth</label>
          <input
            id="dob"
            className="wd-dob"
            value={profile.dob}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            type="date"
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="wd-email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <label htmlFor="role">Role</label>
          <select
            id="role"
            className="wd-role"
            value={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button onClick={signout} className="wd-signout-btn btn btn-danger w-100">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
