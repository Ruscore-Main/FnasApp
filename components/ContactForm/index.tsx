"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { IMaskInput } from "react-imask";
import s from "./ContactForm.module.scss";

import { Input } from "../Input";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  agree?: string;
}

export const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (touched.name) {
      validateField("name", e.target.value);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (touched.email) {
      validateField("email", e.target.value);
    }
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (touched.phone) {
      validateField("phone", value);
    }
  };

  const handleBlur = (field: "name" | "phone" | "email") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, field === "name" ? name : field === "phone" ? phone : email);
  };

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Это поле обязательно";
        } else {
          delete newErrors.name;
        }
        break;
      case "phone":
        if (!value.trim() || value.includes("_")) {
          newErrors.phone = "Это поле обязательно";
        } else {
          delete newErrors.phone;
        }
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Это поле обязательно";
        } else if (!validateEmail(value)) {
          newErrors.email = "Введите корректный E-mail";
        } else {
          delete newErrors.email;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Это поле обязательно";
    }

    if (!phone.trim() || phone.includes("_")) {
      newErrors.phone = "Это поле обязательно";
    }

    if (phone.length < 18) {
      newErrors.phone = "Введите корректный номер телефона";
    }

    if (!email.trim()) {
      newErrors.email = "Это поле обязательно";
    } else if (!validateEmail(email)) {
      newErrors.email = "Введите корректный E-mail";
    }

    if (!checked) {
      newErrors.agree = "Необходимо согласие";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log({ name, phone, email, agree: checked });
    }
  };

  return (
    <form className={s.root} onSubmit={handleSubmit}>
      <div className={s.inputWrapper}>
        <Input
          value={name}
          onChange={handleNameChange}
          onBlur={() => handleBlur("name")}
          placeholder="Имя"
        />
        {errors.name && <span className={s.errorText}>{errors.name}</span>}
      </div>

      <div className={s.inputWrapper}>
        <IMaskInput
          mask="+7 (000) 000-00-00"
          unmask={false}
          className={s.phoneInput}
          placeholder="Телефон"
          onAccept={handlePhoneChange}
          onBlur={() => handleBlur("phone")}
          value={phone}
        />
        {errors.phone && <span className={s.errorText}>{errors.phone}</span>}
      </div>

      <div className={s.inputWrapper}>
        <Input
          value={email}
          onChange={handleEmailChange}
          onBlur={() => handleBlur("email")}
          placeholder="E-mail"
        />
        {errors.email && <span className={s.errorText}>{errors.email}</span>}
      </div>

      <div className={s.checkboxWrapper}>
        <Checkbox
          checked={checked}
          onChange={setChecked}
          label="Я согласен(-а) на обработку персональных данных"
        />
        {errors.agree && <span className={s.errorText}>{errors.agree}</span>}
      </div>

      <Button variant="black" type="submit">
        Отправить
      </Button>
    </form>
  );
};
