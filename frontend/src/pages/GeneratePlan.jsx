import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function GeneratePlan() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Sidebar />
        <div className="content">
          <h1>Generate AI Study Plan</h1>
          <p>AI generation coming soon...</p>
        </div>
      </div>
    </>
  );
}

export default GeneratePlan;
