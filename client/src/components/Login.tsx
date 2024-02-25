// components/LoginForm.tsx
"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import {
  loginFailed,
  loginStart,
  loginSuccess,
} from "../redux/slices/userSlice";
import Popup from "reactjs-popup";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const dispatch = useDispatch();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      return;
    }
    dispatch(loginStart());
    try {
      // Send a POST request to the server
      const response = await axios.post(
        `http://localhost:8800/api/auth/signin`,
        {
          username: "username",
          email: email,
          pw: password,
        }
      );
      dispatch(loginSuccess(response.data));
      // Handle the response here (e.g., check if login was successful)
      console.log("Server Response:", response.data);

      // Clear form and error message
      setemail("");
      setPassword("");
      setErrorMessage("");
      setIsPopupOpen(false);
    } catch (error) {
      dispatch(loginFailed());
      // Handle errors, e.g., display error message
      if (axios.isAxiosError(error)) {
        // This ensures 'error' is of type 'AxiosError'
        const axiosError = error as AxiosError;
        console.error("Error:", axiosError.message);
        setErrorMessage("Login failed. Please check your credentials.");
      } else {
        // Handle other types of errors if needed
        dispatch(loginFailed());
        console.error("Unknown Error:", error);
        setErrorMessage("An unknown error occurred.");
      }
    }
  };
  return (
    isPopupOpen && (
      <Popup 
        trigger={
          <button
            type="button"
            className="profile bg-black text-white p-2 rounded-full"
          >
            Login
          </button>
        }
        modal
        nested
        closeOnDocumentClick
        contentStyle={{
          width: "auto",
          height: "auto",
          padding: "0",
          borderRadius: "0.5rem", // Set your desired border radius
        }}
      >
        <div className="h-[50vh]  flex  items-center justify-center rounded-md">
          <div className=" h-full rounded-md">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={handleLogin}
            >
              <h2 className="text-2xl mb-6 text-center">Login Form</h2>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  email:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-red-500 mb-4">{errorMessage}</div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </Popup>
    )
  );
};

export default Login;
