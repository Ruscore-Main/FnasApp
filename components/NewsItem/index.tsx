import React from "react";
import s from "./NewsItem.module.scss";
import Link from "next/link";

interface NewsItemProps {
  articleId: string;
  imageUrl: string;
  title: string;
  date: string;
  subTitle: string;
}

export const NewsItem: React.FC<NewsItemProps> = ({
  articleId,
  imageUrl,
  title,
  date,
  subTitle,
}) => {
  return (
    <Link href={`/news/${articleId}`} className={s.root}>
      <img src={imageUrl} alt="NewsImage" />
      <div className={s.content}>
        <h2>{title}</h2>
        <p>{subTitle}</p>
        <span>{date}</span>
      </div>
    </Link>
  );
};
