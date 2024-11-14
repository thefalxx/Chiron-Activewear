/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Navbar from "../components/common/NavBar";
import Image from "next/image";

import Link from "next/link";

const SignUp = () => {
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
                htmlFor="text"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your First Name"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="text"
              >
                Last Name
              </label>
              <input
                type="text"
                id="LastName"
                placeholder="Enter your Last Name"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
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
                id="InitialPassword"
                placeholder="Please enter a password"
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
                id="ConfirmPassword"
                placeholder="Please confirm your password"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md"
              >
                Sign Up
              </button>
            </div>
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="hover:text-gray-600 text-blue-500">
                Login Now
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

export default SignUp;
