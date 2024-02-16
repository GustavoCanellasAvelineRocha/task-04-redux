import { useAppDispatch } from "../../hooks/hooks";
import { Movie } from "../../utils/interfaces";
import { removeCartMovie, totalCartPrice } from "../../slices/CartSlice";
import style from "./Card.module.scss";
import { MinusCircle } from "@phosphor-icons/react";

export default function CardCart({ movie }: { movie: Movie }) {
  const dispatch = useAppDispatch();

  const handleRemoveCartMovie = () => {
    dispatch(removeCartMovie(movie.id));
    dispatch(totalCartPrice());
  };

  return (
    <div className={style.cardCart}>
      <h3>{movie.title}</h3>
      <p>Preço: {movie.price}.00$</p>

      <button
        onClick={() => handleRemoveCartMovie()}
        className={style.buttonRemove}
      >
        <MinusCircle size={16} />
        Remover do carrinho
      </button>
    </div>
  );
}
