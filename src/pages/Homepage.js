import { useState } from "react";
import "./Homepage.css";
import {
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  FormGroup,
  Label,
  Spinner,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { AiOutlineSearch, AiFillHeart } from "react-icons/ai";
import { BookShelf } from "../components/book-shelf";
export const HomePage = () => {
  const [maxResults, setMaxResults] = useState(10);
  const [startIndex, setStartIndex] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [showFavorite, setShowFavorite] = useState(false);

  // Handle Search
  const handleSubmit = () => {
    if (maxResults > 40 || maxResults < 1) {
      toast.error("max results must be between 1 and 40");
    } else {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`
        )
        .then((res) => {
          if (startIndex >= res.data.totalItems || startIndex < 1) {
            toast.error(
              `max reults must be between 1 and ${res.data.totalItems}`
            );
          } else {
            if (res.data.items.length > 0) {
              setCards(res.data.items);
            }
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };
  // Main Show Case
  const mainHeader = () => {
    return (
      <div className="main-image d-flex justify-content-center align-items-center flex-column">
        {/* Overlay */}
        <div className="filter"></div>
        <h1
          className="display-2 text-center text-white mb-3"
          style={{ zIndex: 2 }}
        >
          Google Books
        </h1>
        <div style={{ width: "60%", zIndex: 2 }}>
          <InputGroup size="lg" className="mb-3">
            <Input
              placeholder="Book Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <InputGroupAddon addonType="append">
              <Button
                disabled={!query}
                color="secondary"
                onClick={handleSubmit}
              >
                <AiOutlineSearch size={35} />
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <div className="d-flex text-white justify-content-center">
            <select defaultValue="Sort">
              <option disabled value="Sort">
                Ordenar pelo:
              </option>
              <option value="Newest">Mais Novo</option>
              <option value="Oldest">Mais Antigo</option>
            </select>
            <Button
              onClick={() => setShowFavorite(!showFavorite)}
              style={{ marginLeft: "10px" }}
            >
              <AiFillHeart size={35} />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-100 h-100">
      {mainHeader()}
      <BookShelf loading={loading} showFavorite={showFavorite} books={cards} />
    </div>
  );
};
