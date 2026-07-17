import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css"; // Import the CSS file for styling

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <div className="content">
          <h1>Welcome to AI Study Planner</h1>
        </div>
      </div>
    </>
  );
}

export default Dashboard;