import React, { useState } from "react";
import "./BookCard.css";
import {
  Card,
  CardTitle,
  CardImg,
  CardBody,
  Button,
  Modal,
  CardSubtitle,
} from "reactstrap";
import { AiFillHeart, AiFillCloseCircle } from "react-icons/ai";
const BookCard = ({ book, thumbnail, handleFavorite, favorite }) => {
  // States
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const { title, language, description } = book.volumeInfo;

  const authors = book.volumeInfo.authors || "Indefinido";
  const publisher = book.volumeInfo.publisher || "Indefinido";
  const publishedDate = book.volumeInfo.publishedDate || "Indefinido";
  const pageCount = book.volumeInfo.pageCount || "Indefinido";

  return (
    <>
      <div>
        <Card className="m-auto">
          <CardImg
            top
            width="200px"
            height="300px"
            src={thumbnail}
            alt={title}
          />
          <CardBody>
            <CardTitle>
              <h6>{title}</h6>
            </CardTitle>
            <CardSubtitle>
              <strong>Autor: </strong>
              {authors}
            </CardSubtitle>
            <CardSubtitle>
              <strong>Data de Publicação:</strong> {publishedDate}
            </CardSubtitle>
            <Button className="bg-dark" onClick={toggle}>
              Mais informações
            </Button>
            <CardSubtitle className="card-sub">
              Adicionar aos favoritos
              <AiFillHeart
                className="icon"
                size={28}
                color={favorite ? "red" : "#333"}
                onClick={() => handleFavorite(book)}
              />
            </CardSubtitle>
          </CardBody>
        </Card>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <div className="modal-header d-flex justify-content-center">
          <h4 className="modal-title text-center" id="exampleModalLabel">
            {title}
          </h4>
          <button
            aria-label="Close"
            className="icon"
            type="button"
            onClick={toggle}
          >
            <AiFillCloseCircle size={30} />
          </button>
        </div>
        <div className="modal-body">
          <div className="d-flex justify-content-between ml-3">
            <img
              src={thumbnail}
              alt={title}
              style={{ height: 400, width: 500 }}
            />
            <div className="row">
              <dd className="col-sm-6">Páginas: {pageCount}</dd>
              <dd>Idioma: {language}</dd>
              <dd className="col-sm-12">Autores: {authors}</dd>
              <dd>Editora: {publisher}</dd>
            </div>
          </div>
          <div className="mt-3">{description}</div>
        </div>
      </Modal>
    </>
  );
};

export default BookCard;
