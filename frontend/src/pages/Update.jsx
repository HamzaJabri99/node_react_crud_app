import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];
  const [book, setBook] = useState({
    title: "",
    description: "",
    cover: "",
    price: "",
  });
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/update/${bookId}`);
        const data = res.data[0];
        setBook({ ...data });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBook();
  }, []);
  return (
    <div className="bookform">
      <h1>Update The Book</h1>
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={handleChange}
        value={book.title}
      />
      <input
        type="text"
        placeholder="description"
        name="description"
        onChange={handleChange}
        value={book.description}
      />
      <input
        type="number"
        placeholder="price"
        name="price"
        min={0}
        onChange={handleChange}
        value={book.price}
      />
      <input
        type="text"
        placeholder="cover"
        name="cover"
        onChange={handleChange}
        value={book.cover}
      />
      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default Update;
