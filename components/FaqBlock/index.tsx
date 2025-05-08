"use client";

import { useState } from "react";
import { AccordionItem } from "../AccordionItem";
import { Container } from "../Container";
import s from "./FaqBlock.module.scss";

const accordions = [
  {
    id: 1,
    title: "Какие услуги предоставляет ваша студия?",
    content:
      "Мы придерживаемся высоких стандартов качества и стремимся создавать уникальный дизайн, отвечающий потребностям и ожиданиям наших клиентов. Наши дизайнеры постоянно совершенствуют свои навыки и следят за новыми трендами в дизайне.",
  },
  {
    id: 2,
    title: "Как вы обеспечиваете качество и уникальность дизайна?",
    content:
      "Мы придерживаемся высоких стандартов качества и стремимся создавать уникальный дизайн, отвечающий потребностям и ожиданиям наших клиентов. Наши дизайнеры постоянно совершенствуют свои навыки и следят за новыми трендами в дизайне.",
  },
  {
    id: 3,
    title: "Предоставляете ли вы услуги по созданию контента для сайтов и приложений?",
    content:
      "Мы придерживаемся высоких стандартов качества и стремимся создавать уникальный дизайн, отвечающий потребностям и ожиданиям наших клиентов. Наши дизайнеры постоянно совершенствуют свои навыки и следят за новыми трендами в дизайне.",
  },
];

export const FaqBlock: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  return (
    <div className={s.root}>
      <Container>
        <div className={s.faq_block}>
          <h1>FAQ</h1>
        </div>
        <div className={s.accordions_block}>
          {accordions.map((accordion) => (
            <AccordionItem
              key={accordion.id}
              title={accordion.title}
              isOpen={openId === accordion.id}
              setOpen={() => setOpenId((prev) => (prev === accordion.id ? null : accordion.id))}>
              {accordion.content}
            </AccordionItem>
          ))}
        </div>
      </Container>
    </div>
  );
};
