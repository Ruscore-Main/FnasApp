"use client";

import React, { useEffect, useRef } from "react";
import s from "./Modal.module.scss";
import cn from "classnames";
import Image from "next/image";

import { ContactForm } from "../ContactForm";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, className }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div ref={modalRef} className={cn(s.modal, className)}>
        <div className={s.modal__header}>
          <h2>Связаться с нами</h2>
        </div>
        <button className={s.closeButton} onClick={onClose}>
          <Image src="/CloseModal.svg" alt="close" width={24} height={24} />
        </button>
        <div className={s.content}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};
