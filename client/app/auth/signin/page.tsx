"use client";
import { signinAction } from "@/action/signin";
import React from "react";
type SignIn = {
  email: string;
  password: string;
};
const SignInPage = () => {
  const [form, setForm] = React.useState<SignIn>({
    email: "",
    password: "",
  });
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [isPending, startTransistion] = React.useTransition();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(() => {
      signinAction(form)
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={handleOnchange}
        value={form.email}
        disabled={isPending}
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={handleOnchange}
        value={form.password}
        disabled={isPending}
      />
      <button type="submit" disabled={isPending}>
        submit
      </button>
    </form>
  );
};

export default SignInPage;
