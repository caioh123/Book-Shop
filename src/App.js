import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [maxResults, setMaxResults] = useState(10);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(1);
  const [cards, setCards] = useState([]);

  const handleSubmit = () => {
    setLoading(true);
    if (maxResults > 40 || maxResults < 1) {
      toast.error("max results must be between 1 and 40");
    } else {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&${startIndex}`
        )
        .then((response) => {
          if (startIndex >= response.data.totalItems || startIndex < 1) {
            toast.error(
              `max results must be between 1 and ${response.data.totalItems}`
            );
          } else {
            if (response.data.items.length > 0) {
              setCards(response.data.items);
              setLoading(false);
            }
          }
          console.log(cards);
        })
        .catch((err) => {
          setLoading(true);
          toast.error(`${err.response.data.error.message}`);
        });
    }
  };
  return (
    <div>
      <Header />
      <Card data={handleSubmit} />
    </div>
  );
}

export default App;
