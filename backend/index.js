import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PassWord",
  database: "node_books",
});
app.use(express.json());
app.use(cors());
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
  const q =
    "INSERT INTO books(`title`, `description`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.get("/update/:id", (req, res) => {
  const q = "select*from books where id=?";
  const bookId = req.params.id;

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`=?, `description`=?, `cover`=?, `price`=? WHERE id=?";
  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json("Book updated successfully");
  });
});
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id=?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json("Book deleted successfully");
  });
});
app.listen(8800, () => {
  if (db) {
    console.log("connected to database");
  } else {
    console.log("error");
  }
});
