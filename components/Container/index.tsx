import React, { ReactNode } from "react";
import s from "./Container.module.scss";
import cn from "classnames";
interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return <div className={cn(s.container, className)}>{children}</div>;
};
