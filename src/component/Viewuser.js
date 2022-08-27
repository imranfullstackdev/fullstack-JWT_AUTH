import React, { useState, useEffect } from "react";
import Edituser from "./Edituser";

const Viewuser = () => {
  const [viewBlog, SetviewBlog] = useState([]);

  // for getting All the data from Backend
  const getBlog = async () => {
    const Blogdata = await fetch(`http://localhost:8000/get`);
    const jsonData = await Blogdata.json();
    SetviewBlog(jsonData);
  };
  //   delete user
  const deleteuser = async (id) => {
    const response = await fetch(`http://localhost:8000/delete/${id}`, {
      method: "delete",
    });
    window.location.reload();

    const parseres = await response.json();
    alert(parseres.message);
  };

  useEffect(() => {
    getBlog();
  }, []);
  //   console.log(viewBlog)
  return (
    <>
      <table className="p-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>email</th>
            <th>password</th>
          </tr>
        </thead>
        <tfoot>
          {viewBlog.map((user) => {
            return (
              <tr>
                <td>{user.username}</td>
                <td>{user.useremail}</td>
                <td>{user.password}</td>
                <td>
                  <Edituser props={user} />
                </td>
                <button onClick={() => deleteuser(user.id)}>Delete</button>
              </tr>
            );
          })}
        </tfoot>
      </table>
    </>
  );
};

export default Viewuser;
