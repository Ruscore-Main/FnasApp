"use client";

import React, { useRef } from "react";
import styles from "./AccordionItem.module.scss";

interface AccordionItemProps {
  title: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  setOpen?: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  setOpen,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.item}>
      <button className={styles.header} onClick={() => setOpen?.()} aria-expanded={isOpen}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.icon} aria-hidden>
          <img
            className={isOpen ? styles.open : ""}
            src="/ArrowUp.svg"
            alt="ArrowUp"
            width={36}
            height={36}
          />
        </span>
      </button>
      <div
        className={styles.content}
        style={isOpen ? { maxHeight: contentRef.current?.scrollHeight } : { maxHeight: 0 }}>
        <div className={styles.contentInner} ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  );
};
