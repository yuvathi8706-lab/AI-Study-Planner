import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPlans } from "../services/planService";

function Dashboard() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getPlans();
        setPlans(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const totalPlans = plans.length;
  const pendingPlans = plans.filter(p => p.status === "Pending").length;
  const inProgressPlans = plans.filter(p => p.status === "In Progress").length;
  const completedPlans = plans.filter(p => p.status === "Completed").length;
  const totalHours = plans.reduce((acc, curr) => acc + (curr.plannedHours || 0), 0);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading workspace dashboard...</div>;
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="welcome-card">
        <h2>Welcome back to your Study Space</h2>
        <p>Keep track of your study targets, structure your preparation, and harness AI power to reach your goals.</p>
      </div>

      <h3 style={{ marginBottom: '20px', textAlign: 'left' }}>Overview</h3>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Plans</span>
            <span className="stat-value">{totalPlans}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ color: 'var(--color-pending)', backgroundColor: 'var(--bg-pending)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{pendingPlans}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ color: 'var(--color-progress)', backgroundColor: 'var(--bg-progress)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" strokeDasharray="3 3" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">In Progress</span>
            <span className="stat-value">{inProgressPlans}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ color: 'var(--color-completed)', backgroundColor: 'var(--bg-completed)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{completedPlans}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Hours</span>
            <span className="stat-value">{totalHours} hrs</span>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ textAlign: 'left', padding: '32px' }}>
        <h4 style={{ marginBottom: '12px' }}>Quick Start Guide</h4>
        <p style={{ marginBottom: '20px' }}>
          Get started with your custom preparation schedules by creating a new study plan manually, or let our AI service generate one for you instantly based on a subject descriptor.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate("/create-plan")} className="btn btn-primary" style={{ width: 'auto' }}>
            Create Plan Manually
          </button>
          <button onClick={() => navigate("/generate-plan")} className="btn btn-secondary" style={{ width: 'auto' }}>
            Generate with AI
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;