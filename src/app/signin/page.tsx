"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ISignInUser } from "@/types";
import { connect } from "@/src/dbConfig/dbConnect";
import axios from "axios";
import Link from "next/link";
import FormButton from "#/elements/FormButton/FormButton";

connect();

export default function SignIn() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [userDetails, setUserDetails] = React.useState<ISignInUser>({
    username: "",
    password: "",
    email: "",
  });
  const onSignup = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signin", userDetails);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });

    if (
      userDetails.email.length > 0 &&
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
      <h1>{loading ? "Processing" : "Signup"}</h1>
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

      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="email"
        name="email"
        placeholder="email"
        required
        id="email"
        onChange={handleInput}
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
        clickHandler={onSignup}
        text_1="No sign-up"
        text_2="Sign-up"
        disabled={buttonDisabled}
      />
      {/* <Links linkTo="/login" text="Visit login page" /> */}
      <Link href='/login'>Visit login page</Link>
    </div>
  );
}
