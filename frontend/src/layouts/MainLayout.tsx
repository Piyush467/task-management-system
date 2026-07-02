import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MainLayout = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          <Link
            to="/"
            className="text-2xl font-bold text-blue-600"
          >
            TaskFlow
          </Link>

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">

              <p className="font-semibold">
                {user?.name}
              </p>

              <p className="text-sm text-gray-500">
                {user?.email}
              </p>

            </div>

            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                Admin
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              Logout
            </button>

          </div>

        </div>

      </nav>

      <main className="mx-auto max-w-7xl p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;