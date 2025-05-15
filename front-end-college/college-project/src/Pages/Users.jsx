import React, { useState } from "react";
import axios from "../api/axios";

const Users = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "JOB_SEEKER",
  });

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users", user);
      alert("User registered!");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        placeholder="Password"
        onChange={handleChange}
        type="password"
      />
      <select name="role" onChange={handleChange}>
        <option value="JOB_SEEKER">Job Seeker</option>
        <option value="EMPLOYER">Employer</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Users;
