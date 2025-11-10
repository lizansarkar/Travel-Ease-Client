import { useEffect } from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Oops! Page Not Found.
      </h2>
      <p className="text-gray-600 mb-8">
        The page you are looking for does not exist. Redirecting to Homepage in
        3 seconds...
      </p>
      <button
        onClick={() => navigate("/")}
        className="btn bg-blue-600 text-white hover:bg-blue-700"
      >
        Go Home Now
      </button>
    </div>
  );
};

export default ErrorPage;
