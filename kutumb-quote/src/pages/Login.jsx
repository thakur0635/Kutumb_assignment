import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApiCall } from "../utils/api";
import {  toast } from 'react-toastify';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const token = await loginApiCall(username, otp);
      localStorage.setItem("token", token);
      navigate("/quotes");
      toast.success("Login Successfull")
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Please Login to Continue!
        </h1>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-600"
          >
            OTP
          </label>
          <input
            type="text"
            id="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <button
          onClick={handleLogin}
          disabled={!username.length || !otp.length}
          className={`w-full py-2 px-4 text-white font-semibold rounded-lg 
        ${
          !username.length || !otp.length
            ? "bg-[#d1363f] cursor-not-allowed"
            : "bg-[#fa3f4a] hover:bg-[#d1363f]"
        }
    `}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
