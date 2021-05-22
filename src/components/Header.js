import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import {
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  FormGroup,
  Label,
} from "reactstrap";
import { AiOutlineSearch } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Header = () => {
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
    <>
      <ToastContainer />

      <div className="main-image d-flex justify-content-center align-items-center flex-column">
        <div className="filter"></div>
        <h1 className="display-2 text-center text-white mb-3 filter-title">
          Riachuelo books
        </h1>
        <div style={{ width: "60%", zIndex: 2 }}>
          <InputGroup size="lg" className="mb-3">
            <Input
              placeholder="Book Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <InputGroupAddon addonType="append">
              <Button
                style={{ height: 50 }}
                color="secondary"
                onClick={handleSubmit}
              >
                <AiOutlineSearch size={20} />
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <div className="d-flex text-white justify-content-center">
            <FormGroup style={{ marginRight: 50 }}>
              <Label for="maxResults">Max Results</Label>
              <Input
                type="number"
                id="maxResults"
                placeholder="Max Results"
                value={maxResults}
                onChange={(e) => setMaxResults(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="ml-5">
              <Label for="startIndex">Start Index</Label>
              <Input
                type="number"
                id="startIndex"
                placeholder="Start Index"
                value={startIndex}
                onChange={(e) => setStartIndex(e.target.value)}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
