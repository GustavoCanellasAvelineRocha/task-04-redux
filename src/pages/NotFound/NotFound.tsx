import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";
import { House } from "@phosphor-icons/react";

export default function Describe() {
  return (
    <main className={styles.main}>
      <h2>
        <strong>Error 404: </strong> Page Not Found
      </h2>

      <p>
        Whops! Parece que você se perdeu, como no filme náufrago! Volte à terra
        firme, aventureiro!
      </p>

      <Link className={styles.buttonHome} to={"/"}>
        <House size={16} />
        Voltar para home
      </Link>
    </main>
  );
}
