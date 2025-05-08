import React from "react";
import s from "./Checkbox.module.scss";
import cn from "classnames";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <label className={s.wrapper}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={s.input}
      />
      <span className={cn(s.box, { [s.checked]: checked })}>
        {checked && <img src="/CheckboxMark.svg" alt="checkmark" />}
      </span>
      {label && <span className={s.label}>{label}</span>}
    </label>
  );
};
