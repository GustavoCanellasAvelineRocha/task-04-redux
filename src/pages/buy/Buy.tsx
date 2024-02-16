import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Card from "../../components/card/Card";
import styles from "./Buy.module.scss";
import { findByName, fetchMovies, clearFilter } from "../../slices/MovieSlice";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

const Buy = () => {
  const movies = useAppSelector((state) => state.movie.movies);
  const status = useAppSelector((state) => state.movie.status);
  const error = useAppSelector((state) => state.movie.error);
  const [searchMovie, setSearchMovie] = useState("");
  const [isFiltred, setIsFiltred] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFiltred(true);
    dispatch(findByName(searchMovie));
  };

  const handleResetFilter = () => {
    setIsFiltred(false);
    const filterText = document.getElementById(
      "filterText"
    ) as HTMLInputElement | null;
    if (filterText) filterText.value = "";
    dispatch(clearFilter());
  };

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <main className={styles.main}>
        <h2>
          Alugue e avalie seus filmes <strong>prediletos!</strong>
        </h2>

        <p>
          Bem-vindo ao Filmex! Sua locadora de filmes online. Alugue e avalie
          seus filmes favoritos. Explore agora!
        </p>

        <form
          onSubmit={handleSubmit}
          className={styles.filterContainer}
          name="filter"
        >
          <input
            type="text"
            placeholder="Digite o nome do filme desejado"
            onChange={(e) => setSearchMovie(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>

        {isFiltred && (
          <button
            onClick={() => handleResetFilter()}
            className={styles.buttonFiltred}
          >
            Limpar filtro
          </button>
        )}

        <div className={styles.cards}>
          {movies.map((movie) => (
            <Skeleton
              key={movie.id}
              variant="rectangular"
              width={350}
              height={694}
              animation="wave"
            ></Skeleton>
          ))}
        </div>
      </main>
    );
  }

  if (status === "failed") {
    return (
      <main className={styles.main}>
        <div>Error: {error}</div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h2>
        Alugue e avalie seus filmes <strong>prediletos!</strong>
      </h2>

      <p>
        Bem-vindo ao Filmux (filme + redux)! Sua locadora de filmes online.
        Alugue e avalie seus filmes favoritos. Explore agora!
      </p>

      <form onSubmit={handleSubmit} className={styles.filterContainer}>
        <input
          type="text"
          placeholder="Digite o nome do filme desejado"
          onChange={(e) => setSearchMovie(e.target.value)}
          id="filterText"
        />
        <button type="submit">Buscar</button>
      </form>

      {isFiltred && (
        <button
          onClick={() => handleResetFilter()}
          className={styles.buttonFiltred}
        >
          Limpar filtro
        </button>
      )}

      <div className={styles.cards}>
        {movies.map((movie) => (
          <Card movie={movie} key={movie.id}></Card>
        ))}
      </div>
    </main>
  );
};

export default Buy;
