import { useState, useEffect } from "react";
import BookCard from "../../BookCard";
import "./index.css";
import { Spinner } from "reactstrap";

export const BookShelf = ({ books, showFavorite, loading }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("books")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(favorites));
  }, [favorites]);

  const booksToShow = books.map((book) => {
    if (
      favorites.find((fav) => fav.volumeInfo.title === book.volumeInfo.title)
    ) {
      book["favorite"] = true;
    } else {
      book["favorite"] = false;
    }

    return book;
  });

  const handleFavorite = (favorite) => {
    //removing if its on localstorage
    const favoriteBook = favorites.find(
      (book) => favorite.volumeInfo.title === book.volumeInfo.title
    );

    let newFavorite = [];
    if (favoriteBook) {
      newFavorite = favorites.filter(
        (book) => book.volumeInfo.title !== favorite.volumeInfo.title
      );
      setFavorites(newFavorite);
    } else {
      newFavorite = [...favorites, favorite];
      setFavorites(newFavorite);
    }
  };

  return loading ? (
    <div className="d-flex justify-content-center mt-3">
      <Spinner style={{ width: "3rem", height: "3rem" }} />
    </div>
  ) : (
    <div className="book-shelf">
      {showFavorite
        ? favorites.map((item, i) => {
            let thumbnail = "";
            if (item.volumeInfo.imageLinks) {
              thumbnail = item.volumeInfo.imageLinks.thumbnail;
            }
            return (
              <div className="" key={item.id}>
                <BookCard
                  favorite={true}
                  book={item}
                  thumbnail={
                    thumbnail
                      ? thumbnail
                      : "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png"
                  }
                  handleFavorite={handleFavorite}
                />
              </div>
            );
          })
        : booksToShow.map((item, i) => {
            let thumbnail = "";
            if (item.volumeInfo.imageLinks) {
              thumbnail = item.volumeInfo.imageLinks.thumbnail;
            }

            return (
              <div className="" key={item.id}>
                <BookCard
                  book={item}
                  favorite={item.favorite}
                  thumbnail={
                    thumbnail
                      ? thumbnail
                      : "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png"
                  }
                  handleFavorite={handleFavorite}
                />
              </div>
            );
          })}
    </div>
  );
};
