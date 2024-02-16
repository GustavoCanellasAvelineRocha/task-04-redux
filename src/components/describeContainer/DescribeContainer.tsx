import { Movie, Rate } from "../../utils/interfaces";
import style from "./DescribeContainer.module.scss";
import { addRateMovie } from "../../slices/RateSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useState } from "react";
import { MinusCircle, PlusCircle, Star } from "@phosphor-icons/react";
import { addCartMovie, removeCartMovie } from "../../slices/CartSlice";
import { Alert, Snackbar } from "@mui/material";

interface CardProps {
  movie: Movie;
  rate?: Rate;
}

export default function DescribeContainer({ movie, rate }: CardProps) {
  const dispatch = useAppDispatch();
  const [selectedRate, setSelectedRate] = useState("");
  const [text, setText] = useState("");
  const cart = useAppSelector((state) => state.cart.cart);
  const [addSnackbarOpen, setAddSnackbarOpen] = useState(false);
  const [removeSnackbarOpen, setRemoveSnackbarOpen] = useState(false);
  const [rateSnackbarOpen, setRateSnackbarOpen] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      addRateMovie({
        id: 1,
        rate: parseInt(selectedRate),
        id_movie: movie.id,
        text: text,
      })
    );
    setRateSnackbarOpen(true);
  };

  function isMovieInCart(id: number) {
    return cart.find((movie) => movie.id === id) !== undefined;
  }

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

  const handleCloseRateSnackbar = () => {
    setRateSnackbarOpen(false);
  };

  return (
    <section className={style.container}>
      <div className={style.containerDescribe}>
        <article className={style.description}>
          <div className={style.imgAndTitle}>
            <img
              src={movie.poster_path}
              alt={"Imagem do filme: " + movie.title}
              className={style.poster}
            />
            {movie.tagline && (
              <h3 className={style.tagline}>"{movie.tagline}"</h3>
            )}
          </div>

          <div className={style.details}>
            <p>
              <strong>Lançado em:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Popularidade:</strong> {movie.popularity}
            </p>
            <p>
              <strong>Duração:</strong> {movie.runtime} minutos
            </p>
            <p>
              <strong>Preço de aluguel:</strong> ${movie.price.toFixed(2)}
            </p>
            {isMovieInCart(movie.id) ? (
              <button
                onClick={handleClickRemove}
                className={style.buttonRemove}
              >
                <MinusCircle size={16} />
                Remover do carrinho
              </button>
            ) : (
              <button onClick={handleClickAdd} className={style.button}>
                <PlusCircle size={16} />
                Adicionar ao carrinho
              </button>
            )}
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
            <Snackbar
              open={rateSnackbarOpen}
              autoHideDuration={3000}
              onClose={handleCloseRateSnackbar}
            >
              <Alert
                onClose={handleCloseRateSnackbar}
                severity="success"
                variant="filled"
                sx={{ width: "100%" }}
              >
                Avaliação feita com sucesso!
              </Alert>
            </Snackbar>
          </div>
        </article>
        <div>
          {rate ? (
            <>
              <div className={style.description}>
                <h3 className={style.textRank}>Sua avaliação foi!</h3>

                <p>
                  <strong>Nota: </strong>
                  {rate.rate}★
                </p>

                <p>
                  <strong>Comentário: </strong>
                  {rate.text
                    ? `"${rate.text}"`
                    : "Não foram feitos comentários."}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className={style.description}>
                <h3 className={style.textRank}>
                  Já assistiu? Deixe sua avaliação!
                </h3>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="rating">Selecione uma nota:</label>
                    <select
                      id="rating"
                      value={selectedRate}
                      required
                      onChange={(e) => setSelectedRate(e.target.value)}
                    >
                      <option value="" disabled>
                        Escolha uma nota!
                      </option>
                      <option value="1">★</option>
                      <option value="2">★★</option>
                      <option value="3">★★★</option>
                      <option value="4">★★★★</option>
                      <option value="5">★★★★★</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="comment">
                      Deixe um comentário (opcional):
                    </label>
                    <textarea
                      id="comment"
                      value={text}
                      maxLength={100}
                      onChange={(e) => setText(e.target.value.trim())}
                    />
                  </div>
                  <button type="submit">
                    <Star size={16} />
                    Avaliar
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={style.sinopseContainer}>
        <h3 className={style.textRank}>Sinopse</h3>
        <p className={style.sinopse}>{movie.overview}</p>
      </div>
    </section>
  );
}
