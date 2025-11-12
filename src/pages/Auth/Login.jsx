import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { use } from "react";

export default function Login() {
  const { signInWithGoogle, loginWithEmailPassword } = use(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL
        }

        navigate("/");

        //create user in the database
        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'content-type' : 'application/json'
          },
          body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password)

    loginWithEmailPassword(email, password)
    .then(res => {
      const user = res.user;
      console.log(user)
      toast.success("login successfull");
      navigate("/");
    })
    .catch(error => {
      console.log(error)
    })

  };

  return (
    <div className="h-auto md:min-h-screen flex justify-center items-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl md:shadow-2xl rounded-2xl p-6 md:p-8 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-neutral mb-2">
          Login
        </h2>
        <p className="text-sm text-center text-gray-500 mb-8">
          Log in to manage your vehicles and bookings
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          {/* Email Input */}
          <label className="form-control w-full">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary h-12 text-neutral"
              required
            />
          </label>

          {/* Password Input */}
          <label className="form-control w-full">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary h-12 text-neutral"
              required
            />
          </label>

          <div className="text-right text-sm pt-1">
            <a href="#" className="link link-hover text-accent text-sm">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn w-full bg-black text-white hover:bg-[#2563eb] rounded-lg border-none h-12 text-base font-semibold"
          >
            Login
          </button>
        </form>

        {/* Separator */}
        <div className="flex items-center my-4">
          <div className="border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">or</span>
          <div className="border-t border-gray-300"></div>
        </div>

        {/* Google Sign-in Button */}
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>

        {/* Switch to Register */}
        <p className="text-center text-sm mt-6 text-gray-500">
          Don't have an account?
          <Link
            className="link link-hover text-accent ml-1 font-semibold"
            to="/register"
          >
            register
          </Link>
        </p>
      </div>
    </div>
  );
}
