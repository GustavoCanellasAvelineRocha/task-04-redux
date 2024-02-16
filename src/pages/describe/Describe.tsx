import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./Describe.module.scss";
import { Rate } from "../../utils/interfaces";
import DescribeContainer from "../../components/describeContainer/DescribeContainer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchMovieById } from "../../slices/MovieSlice";
import DescribeContainerSkeleton from "../../components/describeContainer/DescribeContainerSkeleton";

export default function Describe() {
  const movie = useAppSelector((state) => state.movie.movieById);
  const rates = useAppSelector((state) => state.rate.rates);
  const status = useAppSelector((state) => state.movie.status);
  const error = useAppSelector((state) => state.movie.error);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const findRate = (id: number): Rate | undefined => {
    return rates.find((rate) => rate.id_movie === id);
  };

  useEffect(() => {
    if (id) {
      const idInt = parseInt(id);
      dispatch(fetchMovieById(idInt));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "loading") {
    return (
      <main className={styles.main}>
        <DescribeContainerSkeleton movie={movie}></DescribeContainerSkeleton>
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
        <strong>{movie.title}</strong>
      </h2>

      <DescribeContainer
        movie={movie}
        rate={findRate(movie.id)}
      ></DescribeContainer>
    </main>
  );
}
