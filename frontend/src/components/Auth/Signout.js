import { useNavigate } from "react-router";
export default function Signout() {
  const navigate = useNavigate();
  const signoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <button
      type="button"
      className="btn btn-outline-danger"
      onClick={signoutHandler}
    >
      Logout
    </button>
  );
}