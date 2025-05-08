"use client";

import React from "react";
import s from "./NewsBlock.module.scss";
import { Container } from "../Container";
import { NewsItem } from "../NewsItem";
import { Carousel } from "../Carousel";
import { Article } from "@/@types/article_type";

export const NewsBlock: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [news, setNews] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 576);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  React.useEffect(() => {
    async function fetchNews() {
      const response = await fetch("/api/news");
      const data = await response.json();
      setTimeout(async () => {
        setNews(data);
        setIsLoaded(true);
      }, 500);
    }
    fetchNews();
  }, []);

  return (
    <>
      {isMobile ? (
        <Carousel items={news} />
      ) : (
        <Container className={s.root}>
          <h1>Новости</h1>
          {isLoaded &&
            news.map((article: Article) => (
              <NewsItem articleId={article.id} key={article.id} {...article} />
            ))}
        </Container>
      )}
    </>
  );
};
