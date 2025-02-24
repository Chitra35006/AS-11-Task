import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "../Hooks/useAuth";
const SignIn = () => {
    const { setUser, userSignIn } = useAuth();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: "User",
        };

        // Store the user in the database
        axios
          .post("http://localhost:5000/users", userInfo)
          .then((res) => {
            if (res.data.insertedId) {
              // console.log("User stored in database:", res.data);
            }
          })
          .catch((error) => {
            console.error("Error saving user to database:", error);
          });

        // Regardless of database response, update state, show toast, and navigate
        setUser(user); // Set the user context
        toast.success("Login Successful!");
        navigate(location?.state ? location.state : "/dashboard");
      })
      .catch((err) => {
        console.error("Google Sign-In Error:", err);
        setUser(null); // Clear the user context on error
        toast.error("Google Sign-In failed. Please try again.");
      });
  };

  const onSubmit = (data) => {
    const { email, password } = data;

    userSignIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login Successful!");
        navigate(location?.state ? location.state : "/dashboard");
      })
      .catch(() => {
        toast.error("Login failed. Please check your email and password.");
      });
  };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-100 to-yellow-50">
        <div className="md:w-2/5 w-4/5 mx-auto bg-white shadow-lg rounded-lg p-8">
          {/* Heading */}
          <h1 className="text-center font-semibold text-2xl text-orange-600 mb-6">
            Login to Your Account
          </h1>
  
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border border-orange-300 shadow-md rounded-lg p-6"
          >
            {/* Email Field */}
            <div className="form-control mb-4">
              <label className="label text-orange-700 font-semibold">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full rounded-md border-orange-400 focus:border-orange-600"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
  
            {/* Password Field */}
            <div className="form-control mb-4">
              <label className="label text-orange-700 font-semibold">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full rounded-md border-orange-400 focus:border-orange-600"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
  
              {/* Forgot Password Link */}
              <label className="label">
                <p className="text-sm text-orange-600 font-semibold cursor-pointer hover:underline">
                  Forgot password?
                </p>
              </label>
            </div>
  
            {/* Login Button - Centered */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn w-full text-white font-semibold py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 transition-all"
              >
                Login
              </button>
            </div>
  
            {/* Don't have an account? */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-orange-600 font-semibold hover:underline">
                  Register
                </Link>
              </p>
            </div>
  
            {/* OR Divider */}
            <div className="flex w-full flex-col mt-6">
              <div className="divider text-orange-500">Or</div>
            </div>
  
            {/* Google Login Button */}
            <div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full btn btn-outline flex items-center gap-2 border-orange-400 hover:border-orange-600"
              >
                <FaGoogle className="text-orange-500" /> Login With Google
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default SignIn;