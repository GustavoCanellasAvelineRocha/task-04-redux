import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./Cart.module.scss";
import { totalCartPrice } from "../../slices/CartSlice";
import { useEffect } from "react";
import CardCart from "../../components/card/CardCart";
import { Link } from "react-router-dom";
import { House } from "@phosphor-icons/react";

export default function Cart() {
  const cart = useAppSelector((state) => state.cart.cart);
  const price = useAppSelector((state) => state.cart.cartPrice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(totalCartPrice());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCartPrice]);

  return (
    <main className={styles.main}>
      <h2>Seu Carrinho!</h2>

      {cart.length > 0 ? (
        <>
          <div className={styles.cards}>
            {cart.map((movie) => (
              <CardCart movie={movie} key={movie.id}></CardCart>
            ))}
          </div>
          <div className={styles.containerPrice}>
            <ul>
              {cart.map((movie) => (
                <li key={movie.id}>
                  Filme: {movie.title} <br />
                  Preço: {movie.price}
                </li>
              ))}
            </ul>
            <p>Preço total: {price}</p>
            <button disabled>Continuar para o pagamento!</button>
          </div>
        </>
      ) : (
        <>
          <p className={styles.warning}>
            Seu carrinho está <strong>vazio! </strong>adicione itens para
            prosseguir ao pagamento.
          </p>
          <Link to={"/buy"}>
            <House size={16} />
            Voltar para home
          </Link>
        </>
      )}
    </main>
  );
}
