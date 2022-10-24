import express from "express";
import mysql from "mysql";
const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PassWord",
  database: "node_books",
});
app.use(express.json());
app.get("/", (req, res) => {
  res.json("hello from backend");
});
app.get("/books", (req, res) => {
  const q = "select*from books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post("/books", (req, res) => {
  const q = "insert into books (`title`,`description`,`cover`) values (?)";
  const values = [req.body.title, req.body.description, req.body.cover];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book Has been created successfully");
  });
});
app.listen(8800, () => {
  if (db) {
    console.log("connected to database");
  } else {
    console.log("error");
  }
});
