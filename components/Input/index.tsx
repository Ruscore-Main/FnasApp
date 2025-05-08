import React from "react";
import s from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ placeholder, value, onChange }) => {
  return <input className={s.root} placeholder={placeholder} value={value} onChange={onChange} />;
};
