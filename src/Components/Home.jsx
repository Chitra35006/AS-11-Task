import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import lottieImg from "../assets/lottie.json";
import { FaTasks } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";

const Home = () => {
    const navigate = useNavigate();
    const{user} = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-4/5 mx-auto flex flex-col md:flex-row items-center py-10">
                {/* Left Side - Text and Button */}
                <div className="flex flex-col items-start md:w-1/2">
                    {/* Animated BIG Heading */}
                    <motion.h1
                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-orange-500 via-red-400 to-yellow-300 text-transparent bg-clip-text"
                        initial={{ opacity: 0, scale: 0.8, y: -10, rotateX: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                        transition={{
                            duration: 1.5,
                            ease: "easeOut",
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                        whileHover={{
                            textShadow: "0px 0px 15px rgba(255, 140, 0, 0.9), 0px 0px 25px rgba(255, 69, 0, 0.8)",
                            scale: 1.05,
                            y: -3,
                            transition: { duration: 0.3 },
                        }}
                    >
                        Welcome to Task Tracker
                    </motion.h1>

                    {/* Animated Description */}
                    <motion.p
                        className="mt-4 text-base md:text-lg lg:text-xl bg-gradient-to-r from-orange-500 to-yellow-300 bg-clip-text text-transparent"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        Boost your productivity by effortlessly tracking and managing your tasks.
                        Stay on top of your daily goals, plan smarter, and accomplish more with ease!
                        Take control of your time and make every task count!
                    </motion.p>

                    {/* Animated "Set Tasks" Button */}
                    <motion.button
  className="mt-10 px-6 py-3 bg-orange-700 text-white rounded-lg shadow-lg text-lg font-semibold hover:bg-blue-600 transition-all flex items-center gap-2"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 1.5 }}
  whileHover={{ scale: 1.1 }}
  onClick={() => navigate(user ? "/dashboard" : "/signIn")}
>
  <FaTasks /> Set Tasks
</motion.button>

                </div>

                {/* Right Side - Lottie Animation */}
                <motion.div
                    className="flex justify-center relative my-14 md:w-1/2 h-80 md:h-96"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                >
                    {/* Soft Glowing Background */}
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="w-[70%] md:w-[50%] lg:w-[40%] h-full bg-gradient-to-r from-orange-500 to-yellow-300 rounded-full blur-3xl opacity-50"></div>
                    </div>

                    {/* Lottie Animation */}
                    <Lottie animationData={lottieImg} className="w-4/5 md:w-3/5 lg:w-2/5 relative h-full" />
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
