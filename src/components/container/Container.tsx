import { ReactNode } from "react";
import style from "./Container.module.scss";

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <>
      <section className={style.container}>{children}</section>
    </>
  );
}
