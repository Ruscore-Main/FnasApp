"use client";

import s from "./MenuLink.module.scss";
import cn from "classnames";
import Image from "next/image";

export const MenuLink: React.FC<React.ComponentProps<"div">> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn(s.menuLink, className)} {...props}>
      {children}
      <Image src="/ArrowUp.svg" width={18} height={18} alt="arrow" />
    </div>
  );
};
