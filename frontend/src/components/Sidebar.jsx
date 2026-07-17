import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h3>Menu</h3>

      <ul>
        <li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/plans">
            My Plans
          </Link>
        </li>

        <li>
          <Link to="/generate-plan">
            Generate Plan
          </Link>
        </li>

        <li>
            <Link to="/create-plan">
            Create Plan
            </Link>
        </li>

        <li>
          <button onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;