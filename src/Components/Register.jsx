
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from '../Hooks/useAuth';
// const img_hosting_key = import.meta.env.VITE_IMAGE_HOST_KEY;
// const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const Register = () => {
    const { createNewUser, setUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm();

const onSubmit = async (data) => {
    const { name, email, password, image } = data;
    const photoURL = image; 

    // Password validation
    const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!regex.test(password)) {
        toast.error(
            "Password should have at least one uppercase and one lowercase letter and must be 6 characters long"
        );
        return;
    }

    // Create user
    createNewUser(email, password)
        .then((result) => {
            const user = result.user;
            setUser(user);

            updateUserProfile({
                displayName: name,
                photoURL,
            })
                .then(() => {
                    setUser({
                        ...user,
                        displayName: name,
                        photoURL,
                    });

                    // Save user info to the database
                    const userInfo = {
                        name,
                        email,
                        photoURL,
                        role: "User",
                    };

                    axios.post("http://localhost:5000/users", userInfo)
                        .then((res) => {
                            if (res.data.insertedId) {
                                toast.success("Registration Successful!");
                            }
                        });

                    navigate(location?.state?.from || "/dashboard");
                })
                .catch((err) => console.error(err));
        })
        .catch((error) => {
            toast.error(error.message);
        });

  };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-100 to-yellow-50">
      <div className="md:w-2/5 w-4/5 mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Heading */}
        <h1 className="text-center font-semibold text-2xl text-orange-600 mb-6">
          Register Your Account
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-orange-300 shadow-md rounded-lg p-6"
        >
          {/* Name Field */}
          <div className="form-control mb-4">
            <label className="label text-orange-700 font-semibold">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full rounded-md border-orange-400 focus:border-orange-600"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Photo URL Field */}
          <div className="form-control mb-4">
  <label className="label text-orange-700 font-semibold">Image URL</label>
  <input
    type="text"
    placeholder="Enter image URL"
    className="input input-bordered w-full rounded-md border-orange-400 focus:border-orange-600"
    {...register("image", { required: "Image URL is required" })}
  />
  {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
</div>

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
          <div className="form-control mb-6">
            <label className="label text-orange-700 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full rounded-md border-orange-400 focus:border-orange-600"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button - Centered */}
          <div className="flex justify-center">
            <button className="btn w-full text-white font-semibold py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 transition-all">
              Register
            </button>
          </div>

          {/* Already have an account */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/signIn" className="text-orange-600 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    );
};

export default Register;