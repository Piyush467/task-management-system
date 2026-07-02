import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          Task Manager
        </Link>

        <div className="flex items-center gap-5">

          {user && (
            <>
              <NavLink to="/">
                Dashboard
              </NavLink>

              {user.role === "admin" && (
                <NavLink to="/admin">
                  Admin
                </NavLink>
              )}

              <span className="font-medium">
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded bg-red-500 px-4 py-2"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <NavLink to="/login">
                Login
              </NavLink>

              <NavLink to="/register">
                Register
              </NavLink>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;