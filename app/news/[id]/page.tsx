import { Container } from "@/components";
import s from "./NewsPage.module.scss";
import db from "@/public/db.json";

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }];
}

export default async function NewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const currentArticle = db.find((article) => article.id === id);
  return (
    <Container className={s.root}>
      <img src={currentArticle?.imageUrl} alt="NewsImage" className={s.image} />
      <div className={s.content}>
        <h1>{currentArticle?.title}</h1>
        <p className={s.dateArticle}>{currentArticle?.date}</p>
        <h3>{currentArticle?.subTitle}</h3>
        <p>{currentArticle?.text}</p>
      </div>
    </Container>
  );
}