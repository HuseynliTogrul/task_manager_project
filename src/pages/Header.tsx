import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";

export function Header() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-10 py-3.5 shadow-[rgba(50,50,93,0.25)_0px_13px_27px_-5px,rgba(0,0,0,0.3)_0px_8px_16px_-8px]">
      <Link to="/">
        <img
          src={Logo}
          alt=""
          className="w-[150px]"
        />
      </Link>
      {currentUser ? (
        <button
          className="bg-[cadetblue] rounded-[10px] py-[10px] px-5 text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="bg-[cadetblue] rounded-[10px] py-[10px] px-5 text-white"
          onClick={() => navigate("/login")}
        >
          Login
        </Link>
      )}
    </div>
  );
}
