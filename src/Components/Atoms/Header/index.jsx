import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../service/auth/authSlice";
import { logoutUser } from "../../../Api/users";

export default function Header() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      sessionStorage.removeItem("jwt_token");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  };

  return (
    <div className="flex py-5 justify-between items-center">
      <Link>
        <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <div className="flex space-x-10">
            <Link to={"/profile"}></Link>
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          </div>
        ) : (
          <Link to={"/login"} className="btn btn-primary text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
