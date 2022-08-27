const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
app.use(cors());
app.use(express.json());
const pool = require("./Model/db");
const { reset } = require("nodemon");
const { response } = require("express");
const jwt = require("./jwt/jwtAuth");

// for all the data
app.get("/get", async (req, res) => {
  const getdata = await pool.query(`select * from crud_table`);
  res.json(getdata.rows);
  console.log(getdata.rows);
});
// for posting the data

app.post("/post", async (req, res) => {
  const verifyUser = await pool.query(
    `select useremail from crud_table where useremail=$1 `,
    [req.body.useremail]
  );
  if (verifyUser.rows.length > 0) {
    return res.status(401).json({ message: `user already exists` });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const postdata = await pool.query(
      `insert into crud_table(username,useremail,password) values($1,$2,$3) returning *`,
      [req.body.username, req.body.useremail, hashedPassword]
      );
      const jwttoken = jwt(postdata.rows[0].id);
      res.status(201).json({jwttoken:jwttoken});
      console.log(postdata.rows);
      console.log(jwttoken);

  }
  // }
});
// for editing
app.put("/put/:id", async (req, res) => {
  const { id } = req.params;
  const Editdata = await pool.query(
    `update crud_table set username=$1,useremail=$2,password=$3 where id=$4`,
    [req.body.username, req.body.useremail, req.body.password, id]
  );
  res.json("edited");
  console.log(req.body);
});

// for deleting
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const deletedata = await pool.query(`delete from crud_table where id=$1`, [
    id,
  ]);
  res.json({ message: "Deleted Sucessfully" });
  console.log(req.body);
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
