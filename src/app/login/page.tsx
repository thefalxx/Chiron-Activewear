/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Navbar from "../components/common/NavBar";
import Image from "next/image";

import Link from "next/link";

const Login = () => {
  return (
    <div>
      <div className="flex min-h-screen">
        {/* Left side - Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8">
          <h1 className="text-3xl font-bold mb-4">CHIRON</h1>
          <h2 className="text-xl mb-8">Login</h2>
          <form className="w-full max-w-sm">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md"
              />
              <a href="#" className="text-sm text-right block mt-2">
                Forgot Password?
              </a>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md"
              >
                LOGIN
              </button>
            </div>
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="hover:text-gray-600 text-blue-500"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
        {/* Right side - Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <Image
            src="/assets/login-banner-2.jpeg" // Replace with your image path
            alt="Workout"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
