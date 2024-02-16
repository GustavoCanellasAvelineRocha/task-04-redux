import { FilmSlate, ShoppingCart, SignOut } from "@phosphor-icons/react";
import style from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import { showOptions, dontShowOptions } from "../../slices/NavBarSlice";
import { removeToken } from "../../slices/TokenSlice";

export default function NavBar() {
  const isShowOptions = useAppSelector((state) => state.navBar.showOptions);
  const token = useAppSelector((state) => state.token.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(showOptions());
    } else {
      dispatch(dontShowOptions());
    }
  }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(removeToken());
  };

  return (
    <>
      <header className={style.header}>
        <div className={style.navBar}>
          <div className={style.containerTile}>
            <FilmSlate size={32} className={style.icon} />
            <Link to={"/"} className={style.linkFilmex}>
              Filmux
            </Link>
          </div>
          {isShowOptions && (
            <div className={style.links}>
              <Link to={"/cart"} className={style.linkCart}>
                Carrinho <ShoppingCart size={22} className={style.icon} />
              </Link>
              <button className={style.logoutButton} onClick={handleLogout}>
                Sair <SignOut size={22} className={style.icon} />
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
