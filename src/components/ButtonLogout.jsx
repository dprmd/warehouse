import { useNavigate } from "react-router-dom";

export default function ButtonLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isUserHaveVisit");
    localStorage.removeItem("userId");
    navigate("/");
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      type="button"
      className="border px-4 py-3 text-center rounded-md cursor-pointer"
    >
      Logout
    </button>
  );
}
