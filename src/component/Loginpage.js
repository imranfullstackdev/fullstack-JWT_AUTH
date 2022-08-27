import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
  const [data, setData] = useState({
    username: "",
    useremail: "",
    password: "",
  });
  const { username, useremail, password } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const viewUser = () => {
    navigate("Viewuser");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const body = data;
      const postData = await fetch(`http://localhost:8000/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const verifyUseremail = await postData.json();
      alert(verifyUseremail.message);
      console.log(verifyUseremail.jwttoken);
      if (verifyUseremail.jwttoken) {
        localStorage.setItem("token", verifyUseremail.jwttoken);
      }
      console.log(postData);
      console.log(body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-item-center mt-5">
        <form onSubmit={submitHandler}>
          <label>NAME:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={changeHandler}
          />
          <br />
          <label>Email:</label>
          <input
            type="email"
            name="useremail"
            value={useremail}
            onChange={changeHandler}
          />
          <br />
          <label>password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={changeHandler}
          />
          <br />

          <button className="btn-primary" type="submit">
            SUBMIT
          </button>
          <br />
        </form>
        <div>
          <button className="btn-primary" onClick={viewUser}>
            VIEW ALL USER
          </button>
          <br />
        </div>
      </div>
    </>
  );
};

export default Loginpage;
