import React, { useContext, useState } from "react";
import { ProductContext } from "../inventory/ProductProvider";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const { authLogin } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await authLogin(credentials);
    console.log("SUccess", success);
    if (success) {
      navigate("/dashboard");
    } else {
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          {/* Simple SVG for the stacked boxes */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3"
          >
            <path d="M24 4L44 14L24 24L4 14L24 4Z" fill="#F97316" />
            <path d="M4 14V24L24 34V24L4 14Z" fill="#1F2937" />
            <path d="M44 14V24L24 34V24L44 14Z" fill="#374151" />
            <path d="M4 24V34L24 44V34L4 24Z" fill="#111827" />
            <path d="M44 24V34L24 44V34L44 24Z" fill="#1F2937" />
          </svg>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">
              In<span className="text-orange-500">App</span>
            </h1>
            <span className="text-xs text-gray-500 -mt-1">Inventory App</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-8">
          Sign in to your account
        </h2>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              placeholder="name@example.com"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <a
                href="#"
                className="text-sm font-medium text-orange-500 hover:text-orange-600"
              >
                Forgot Password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              placeholder="Password"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>{error}</div>

          {/* Remember Me */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200"
          >
            Sign in
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="#"
            className="font-medium text-orange-500 hover:text-orange-600"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
