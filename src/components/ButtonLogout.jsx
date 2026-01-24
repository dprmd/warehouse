import { useNavigate } from "react-router-dom";

export default function ButtonLogout({ className }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isUserHaveVisit");
    localStorage.removeItem("userId");
    navigate("/");
    window.location.reload();
  };

  return (
    <button onClick={handleLogout} type="button" className={className}>
      Logout
    </button>
  );
}
