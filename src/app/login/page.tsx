"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ILogInUser } from "@/types";
import axios from "axios";
import Link from "next/link";
import FormButton from "#/elements/FormButton/FormButton";

export default function LogIn() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [userDetails, setUserDetails] = React.useState<ILogInUser>({
    username: "",
    password: "",
  });
  const onLogin = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", userDetails);
      console.log(response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    if (
      userDetails.password.length > 0 &&
      userDetails.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Log in"}</h1>
      <hr></hr>
      <label htmlFor="username">Username</label>
      <input
        onChange={handleInput}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        name="username"
        placeholder="Username"
        required
        id="username"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        name="password"
        placeholder="password"
        required
        id="password"
        onChange={handleInput}
      />
      <FormButton
        clickHandler={onLogin}
        text_1="No Login"
        text_2="Login"
        disabled={buttonDisabled}
      />
      {/* <Links linkTo="/login" text="Visit login page" /> */}
      <Link href="/signin">Visit sign in page</Link>
    </div>
  );
}
