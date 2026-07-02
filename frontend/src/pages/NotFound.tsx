import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center">

      <h1 className="text-7xl font-bold">
        404
      </h1>

      <p className="mt-3 text-lg text-gray-600">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-8 rounded bg-blue-600 px-6 py-3 text-white"
      >
        Go Home
      </Link>

    </div>
  );
};

export default NotFound;