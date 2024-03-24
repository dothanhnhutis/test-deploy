"use server";

import { axiosInstance } from "@/axiosServer";
import { isAxiosError } from "axios";

export const signinAction = async (data: any) => {
  try {
    const res = await axiosInstance.post<{ message: string }>(
      "/api/v1/auth/signin",
      data
    );
    return res.data;
  } catch (error: any) {
    if (isAxiosError(error)) {
      return { message: error.response?.data.message };
    }
    console.log(error);
    return { message: "Signin Error" };
  }
};
