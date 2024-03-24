"use client";
import React from "react";
import axios, { isAxiosError } from "axios";
type SignIn = {
  email: string;
  password: string;
};
const SignInClient = () => {
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
      axios
        .post("/api/v1/auth/signin", form, {
          baseURL: "http://localhost:4000",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        })
        .then((res: any) => {
          console.log(res.data.message);
        })
        .catch((error) => {
          if (isAxiosError(error)) {
            console.log(error.response?.data.message);
          } else {
            console.log("Signin Error");
          }
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

export default SignInClient;
