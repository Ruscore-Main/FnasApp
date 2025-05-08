"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";
import cn from "classnames";
import { MenuLink } from "../MenuLink";
import { Button } from "../Button";
import { Modal } from "../Modal";

type MenuItem = {
  title: string;
  href: string;
  hasSubmenu: boolean;
  submenu?: { title: string; href: string }[];
};

const navItems: MenuItem[] = [
  {
    title: "О нас",
    href: "#",
    hasSubmenu: true,
    submenu: [
      { title: "О 500на700", href: "#" },
      { title: "Документы", href: "#" },
      { title: "Устойчивое развитие", href: "#" },
      { title: "Команда", href: "#" },
      { title: "Стратегия", href: "#" },
    ],
  },
  {
    title: "Проекты",
    href: "#projects",
    hasSubmenu: true,
    submenu: [
      { title: "О 500на700", href: "#" },
      { title: "Документы", href: "#" },
      { title: "Устойчивое развитие", href: "#" },
      { title: "Команда", href: "#" },
      { title: "Стратегия", href: "#" },
    ],
  },
  {
    title: "Новости",
    href: "#news",
    hasSubmenu: false,
  },
  {
    title: "FAQ",
    href: "#faq",
    hasSubmenu: false,
  },
  {
    title: "Контакты",
    href: "#subscribe",
    hasSubmenu: false,
  },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLinks, setActiveLinks] = useState<{ [key: number]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);

  // Устанавливаем флаг монтирования после первого рендера
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? "hidden" : "auto";
  };

  const handleLinkMouseOver = (index: number) => {
    setActiveLinks((prev) => ({ ...prev, [index]: true }));
    setShowOverlay(true);
  };

  const handleLinkMouseOut = (index: number) => {
    setActiveLinks((prev) => ({ ...prev, [index]: false }));
    setShowOverlay(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  // Проверяем, есть ли активные подменю
  useEffect(() => {
    if (isMounted) {
      const hasActiveSubmenu = Object.values(activeLinks).some((isActive) => isActive);
      setShowOverlay(hasActiveSubmenu);
    }
  }, [activeLinks, isMounted]);

  // Закрытие меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target as Node)
      ) {
        closeMobileMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.headerInner}>
            <Link href="/" className={styles.logo}>
              <Image src="/Logo.svg" alt="500на700" width={56} height={67} />
            </Link>

            <div ref={menuRef} className={cn(styles.menu, { [styles.menuActive]: mobileMenuOpen })}>
              <nav>
                <ul className={styles.nav}>
                  {navItems.map((item, index) => (
                    <li
                      key={index}
                      className={styles.navItem}
                      onMouseOver={() => {
                        setActiveLink(index);
                        return item.hasSubmenu && handleLinkMouseOver(index);
                      }}
                      onMouseOut={() => {
                        setActiveLink(null);
                        return item.hasSubmenu && handleLinkMouseOut(index);
                      }}>
                      {item.hasSubmenu ? (
                        <>
                          <MenuLink
                            className={cn(styles.navPoint, {
                              [styles.muted]: activeLink !== null && activeLink !== index,
                            })}>
                            {item.title}
                          </MenuLink>

                          <div
                            className={cn(styles.links, {
                              [styles.linksActive]: activeLinks[index],
                            })}>
                            <div className={styles.linksWrapper}>
                              {item.submenu &&
                                item.submenu.map((subItem, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    href={subItem.href}
                                    className={styles.link}
                                    onClick={closeMobileMenu}>
                                    {subItem.title}
                                  </Link>
                                ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(styles.link, {
                            [styles.muted]: activeLink !== null && activeLink !== index,
                          })}
                          onClick={closeMobileMenu}>
                          {item.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <Button onClick={() => setIsModalOpen(true)}>Связаться с нами</Button>
            </div>
            <div
              ref={burgerRef}
              className={cn(
                styles.burger,
                styles.burgerMain,
                mobileMenuOpen ? styles.burgerActive : "",
              )}
              onClick={toggleMobileMenu}></div>
          </div>
        </div>
        {/* Отображаем оверлей только после монтирования компонента */}
        {(isMounted && !mobileMenuOpen) && (
          <div className={cn(styles.overlay, { [styles.overlayActive]: showOverlay })} />
        )}
      </header>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Заголовок модального окна</h2>
        <p>Содержимое модального окна</p>
      </Modal>
    </>
  );
};
