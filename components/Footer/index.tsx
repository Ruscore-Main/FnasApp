import { Container } from "../";
import Image from "next/image";
import s from "./Footer.module.scss";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.footer__logo}>
          <Image src="/LogoFooter.svg" alt="logoFooter" width={102} height={122} />
        </div>
        <div className={s.footer__content}>
          <h2 className={s.footer__title}>Креативное агенство 500na700</h2>
        </div>
      </Container>
    </footer>
  );
};
