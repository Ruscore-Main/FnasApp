"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import s from "./Carousel.module.scss";
import { NewsItem } from "../NewsItem";
import Image from "next/image";
import { Article } from "@/@types/article_type";

interface CarouselProps {
  items: Article[];
}

export const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <h1>Новости</h1>
      <div className={s.embla}>
        <div className={s.embla__viewport} ref={emblaRef}>
          <div className={s.embla__container}>
            {items.map((item) => (
              <div className={s.embla__slide} key={item.id}>
                <NewsItem articleId={item.id} {...item} />
              </div>
            ))}
          </div>
        </div>
        <button className={s.embla__prev} onClick={scrollPrev}>
          <Image src="/SliderArrowLeft.svg" alt="arrow-left" width={24} height={24} />
        </button>
        <button className={s.embla__next} onClick={scrollNext}>
          <Image src="/SliderArrowRight.svg" alt="arrow-right" width={24} height={24} />
        </button>
      </div>
    </>
  );
};
