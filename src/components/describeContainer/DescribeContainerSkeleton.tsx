import { Movie, Rate } from "../../utils/interfaces";
import style from "./DescribeContainer.module.scss";
import { useAppDispatch } from "../../hooks/hooks";
import { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { addRateMovie } from "../../slices/RateSlice";

interface CardProps {
  movie: Movie;
  rate?: Rate;
}

export default function DescribeContainerSkeleton({ movie, rate }: CardProps) {
  window.scrollTo(0, 0);
  const dispatch = useAppDispatch();
  const [selectedRate, setSelectedRate] = useState("");
  const [text] = useState("");

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
  };

  return (
    <section className={style.container}>
      <h2>
        <Skeleton variant="text" width={200} height={30} animation="wave" />
      </h2>
      <div className={style.containerDescribe}>
        <article className={style.description}>
          <div className={style.imgAndTitle}>
            <Skeleton
              variant="rectangular"
              width={250}
              height={450}
              animation="wave"
              sx={{ margin: "auto" }}
            />
            <Skeleton variant="text" width={200} height={30} animation="wave" />
          </div>
          <div className={style.details}>
            <Skeleton variant="text" width={100} height={20} animation="wave" />
            <Skeleton variant="text" width={100} height={20} animation="wave" />
            <Skeleton variant="text" width={100} height={20} animation="wave" />
            <Skeleton variant="text" width={100} height={20} animation="wave" />
            <Skeleton variant="text" width={100} height={20} animation="wave" />
          </div>
        </article>
        <div>
          {rate ? (
            <div className={style.description}>
              <h3 className={style.textRank}>Sua avaliação foi:</h3>
              <p>{rate.rate}★</p>
            </div>
          ) : (
            <div className={style.description}>
              <h3>Já assistiu? Deixe sua avaliação!</h3>
              <form onSubmit={handleSubmit}>
                <div>
                  <Skeleton
                    variant="text"
                    width={200}
                    height={20}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width={200}
                    height={20}
                    animation="wave"
                  />
                  <select
                    id="rating"
                    value={selectedRate}
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
                    onChange={() => console.log()}
                  />
                </div>
                <button type="submit">Enviar</button>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className={style.sinopseContainer}>
        <h3>Sinopse</h3>
        <Skeleton variant="text" animation="wave" height={300} />
      </div>
    </section>
  );
}
