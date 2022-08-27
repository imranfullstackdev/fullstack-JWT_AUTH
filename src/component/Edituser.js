import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Edituser = (props) => {
  const [editdata, setEditdata] = useState(props.props);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeHandler = (e) => {
    setEditdata({...editdata,[e.target.name]:e.target.value})
  };
  const editHandler = async (id) => {
    try {
        const body={editdata}
        console.log();

        const edituser = await fetch(`http://localhost:8000/put/${id}`, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body:JSON.stringify(body.editdata)
          });
          alert(`DATA IS EDITED TO  ${body.editdata.username}`)
        
    } catch (error) {
        console.log(error)
    }
   
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        EDIT
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>NAME:</label>
            <input
              type="text"
              name="username"
              defaultValue={props.props.username}
              onChange={changeHandler}
            />
            <br />
            <label>Email:</label>
            <input
              type="email"
              name="useremail"
              defaultValue={props.props.useremail}
              onChange={changeHandler}
            />
            <br />
            <label>password:</label>
            <input
              type="password"
              name="password"
              defaultValue={props.props.password}
              onChange={changeHandler}
            />
            <br />

            <Button
              variant="primary"
              onClick={() => {
                editHandler(props.props.id);
              }}
            >
              Save Changes
            </Button>
            <br />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Edituser;
