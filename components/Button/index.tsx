import React from "react";
import styles from "./Button.module.scss";
import cn from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "white" | "black";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "white",
  children,
  className,
  ...props
}) => {
  return (
    <button className={cn(styles.button, styles[variant], className)} {...props}>
      <span className={styles.text}>{children}</span>
    </button>
  );
};
