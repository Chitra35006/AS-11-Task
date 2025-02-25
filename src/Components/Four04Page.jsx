import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import Lottie from "lottie-react";
import Four04Animation from "../assets/lottie2.json"; 
const Four04Page = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen text-center'>
        {/* Lottie Animation */}
        <div className="w-72 md:w-96">
            <Lottie animationData={Four04Animation} loop={true} />
        </div>
  
        {/* 404 Text */}
  
        <p className='text-red-700 font-bold mt-2'>This page is not available</p>
  
        {/* Home Button */}
        <Link to='/' className="btn flex items-center gap-2 bg-orange-500 hover:bg-violet-600 hover:text-white font-bold text-violet-800 border-none px-4 py-2 mt-4 rounded-lg">
            <IoMdArrowRoundBack className="text-xl" /> Home
        </Link>
    </div>
    );
};

export default Four04Page;