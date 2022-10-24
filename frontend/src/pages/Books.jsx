import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Books = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <div>
      <h1>Node Books Shop</h1>
      <div className="books">
        {books.map((item) => {
          return (
            <div className="book" key={item.id}>
              {item.cover && <img src={item.cover} alt="" />}
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <span>{item.price}</span>
              <button className="delete" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
              <button className="update">
                <Link to={`/update/${item.id}`}>Update</Link>
              </button>
            </div>
          );
        })}
      </div>
      <button>
        <Link to="/add">Add new book</Link>
      </button>
    </div>
  );
};

export default Books;
