import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Movie } from "../../utils/interfaces";
import { addCartMovie, removeCartMovie } from "../../slices/CartSlice";
import style from "./Card.module.scss";
import { BookOpen, MinusCircle, PlusCircle } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { Alert, Skeleton } from "@mui/material";

interface CardProps {
  movie: Movie;
}

export default function Card({ movie }: CardProps) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const [addSnackbarOpen, setAddSnackbarOpen] = useState(false);
  const [removeSnackbarOpen, setRemoveSnackbarOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  function isMovieInCart(id: number) {
    return cart.find((movie) => movie.id === id) !== undefined;
  }

  const handleDescriptionButton = (id: number) => {
    navigate(`/describe/${id}`);
  };

  const handleClickAdd = () => {
    setAddSnackbarOpen(true);
    dispatch(addCartMovie(movie));
  };

  const handleClickRemove = () => {
    setRemoveSnackbarOpen(true);
    dispatch(removeCartMovie(movie.id));
  };

  const handleCloseAddSnackbar = () => {
    setAddSnackbarOpen(false);
  };

  const handleCloseRemoveSnackbar = () => {
    setRemoveSnackbarOpen(false);
  };

  return (
    <div className={style.card}>
      {!imageLoaded && ( // Renderizar o skeleton enquanto a imagem está sendo carregada
        <Skeleton variant="rectangular" width={300} height={450} />
      )}
      <img
        src={movie.poster_path}
        alt={"Imagem do filme: " + movie.title}
        width={300}
        height={450}
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? "block" : "none" }}
      />
      <h3>{movie.title}</h3>
      <p>Preço: {movie.price}.00$</p>
      {isMovieInCart(movie.id) ? (
        <button onClick={handleClickRemove} className={style.buttonRemove}>
          <MinusCircle size={16} />
          Remover do carrinho
        </button>
      ) : (
        <button onClick={handleClickAdd} className={style.button}>
          <PlusCircle size={16} />
          Adicionar ao carrinho
        </button>
      )}
      <p>Veja detalhes ou avalie!</p>
      <button
        onClick={() => handleDescriptionButton(movie.id)}
        className={style.button}
      >
        <BookOpen size={16} /> Detalhes/Avaliar
      </button>
      <Snackbar
        open={addSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseAddSnackbar}
      >
        <Alert
          onClose={handleCloseAddSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Filme adicionado ao carrinho!
        </Alert>
      </Snackbar>
      <Snackbar
        open={removeSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseRemoveSnackbar}
      >
        <Alert
          onClose={handleCloseRemoveSnackbar}
          severity="info"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Filme removido do carrinho!
        </Alert>
      </Snackbar>
    </div>
  );
}
