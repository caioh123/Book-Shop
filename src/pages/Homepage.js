import { useState } from "react";
import "./Homepage.css";
import {
  Collapse,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import axios from "axios";
import { AiOutlineSearch, AiFillHeart } from "react-icons/ai";
import { BookShelf } from "../components/book-shelf";
import Logo from "../assets/images/riachuelo.png";

export const HomePage = () => {
  const [query, setQuery] = useState("");
  const [loading] = useState(false);
  const [cards, setCards] = useState([]);
  const [showFavorite, setShowFavorite] = useState(false);

  // Handle Search
  const handleSubmit = () => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((res) => {
        if (res.data.items.length > 0) {
          setCards(res.data.items);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // Main Show Case
  const mainHeader = () => {
    return (
      <>
        <Container className="colors" style={{ marginTop: 15 }}>
          <div
            style={{
              justifyContent: "space-around",
              display: "flex",
            }}
          >
            <img src={Logo} alt="" className="image-logo" />
            <Navbar light expand="md">
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto navbar navbar-light colors" navbar>
                  <NavItem>
                    <NavLink style={{ fontSize: 20, color: "black" }} href="#">
                      Página inicial
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink style={{ fontSize: 20, color: "black" }} href="#">
                      Categorias
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        </Container>
        <div className="main-image d-flex justify-content-center align-items-center flex-column">
          {/* Overlay */}
          <div className="filter"></div>
          <h1
            className="display-2 text-center text-white mb-3 main-title"
            style={{ zIndex: 2 }}
          >
            Riachuelo Books
          </h1>
          <div style={{ width: "60%", zIndex: 2 }}>
            <InputGroup size="lg" className="mb-3">
              <Input
                placeholder="Qual livro você está procurando?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <InputGroupAddon addonType="append">
                <Button
                  disabled={!query}
                  className="search-button"
                  onClick={handleSubmit}
                  color=""
                >
                  <AiOutlineSearch color="black" size={40} />
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <div className="d-flex text-white justify-content-center">
              <Button
                color="black"
                onClick={() => setShowFavorite(!showFavorite)}
              >
                <h5 className="text-dark">
                  Clique para visualizar seus livros favoritos!
                  <span className="badge">
                    <AiFillHeart className="icon" color="red" size={35} />
                  </span>
                </h5>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="w-100 h-100">
        {mainHeader()}
        <BookShelf
          loading={loading}
          showFavorite={showFavorite}
          books={cards}
        />
      </div>
    </>
  );
};
