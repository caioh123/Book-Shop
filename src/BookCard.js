import React, { useState } from "react";
import {
  Card,
  CardTitle,
  CardImg,
  CardBody,
  Button,
  Modal,
  CardSubtitle,
} from "reactstrap";
import { AiFillHeart } from "react-icons/ai";
const BookCard = ({
  thumbnail,
  title,
  pageCount,
  language,
  description,
  authors,
  publisher,
  previewLink,
  infoLink,
}) => {
  // States
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <Card style={{ width: "233px" }} className="m-auto ">
      <CardImg
        top
        style={{ width: "100%", height: "233px" }}
        src={thumbnail}
        alt={title}
      />
      <CardBody>
        <CardTitle className="card-title">{title}</CardTitle>
        <CardSubtitle>
          <strong>Autor:</strong> {authors}
        </CardSubtitle>
        <Button onClick={toggle}>Mais informações</Button>
        <CardSubtitle style={{ fontSize: 15, marginTop: 5 }}>
          Adicionar aos favoritos
          <AiFillHeart
            size={20}
            color="red"
            style={{ cursor: "pointer", marginLeft: 15 }}
            onClick={() => {
              console.log("clicked");
            }}
          />
        </CardSubtitle>
      </CardBody>
      <Modal isOpen={modal} toggle={toggle}>
        <div className="modal-header d-flex justify-content-center">
          <h5 className="modal-title text-center" id="exampleModalLabel">
            {title}
          </h5>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={toggle}
          >
            <span aria-hidden={true}>X</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="d-flex justify-content-between ml-3">
            <img src={thumbnail} alt={title} style={{ height: "233px" }} />
            <div>
              <p>Page Count: {pageCount}</p>
              <p>Language : {language}</p>
              <p>Authors : {authors}</p>
              <p>Publisher : {publisher}</p>
            </div>
          </div>
          <div className="mt-3">{description}</div>
        </div>
        <div className="modal-footer">
          <div className="left-silde">
            <a
              href={previewLink}
              className="btn-link"
              color="default"
              type="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Preview Link
            </a>
          </div>
          <div className="divider"></div>
          <div className="right-silde">
            <a
              href={infoLink}
              className="btn-link"
              color="default"
              type="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Info Link
            </a>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default BookCard;
