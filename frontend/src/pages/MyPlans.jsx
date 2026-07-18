import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPlans, deletePlan } from "../services/planService";

function MyPlans() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      const data = await getPlans();
      setPlans(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this study plan?")) {
      try {
        await deletePlan(id);
        alert("Study plan deleted successfully");
        fetchPlans();
      } catch (error) {
        console.error(error);
        alert("Failed to delete study plan");
      }
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Completed":
        return "badge badge-completed";
      case "In Progress":
        return "badge badge-progress";
      default:
        return "badge badge-pending";
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading study plans...</div>;
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="plans-header-bar">
        <div>
          <h1>My Study Plans</h1>
          <p>Manage and track your custom schedules</p>
        </div>
        <button onClick={() => navigate("/create-plan")} className="btn btn-primary" style={{ width: 'auto' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Plan
        </button>
      </div>

      {plans.length === 0 ? (
        <div className="glass-card" style={{ padding: '60px', textAlign: 'center' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-light)', marginBottom: '16px' }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <h3 style={{ marginBottom: '8px' }}>No study plans yet</h3>
          <p style={{ marginBottom: '24px' }}>Create a new study target to monitor your progress.</p>
          <button onClick={() => navigate("/create-plan")} className="btn btn-primary" style={{ width: 'auto' }}>
            Create First Plan
          </button>
        </div>
      ) : (
        <div className="plans-grid">
          {plans.map((plan) => (
            <div key={plan._id} className="plan-card">
              <div className="plan-card-header">
                <h3>{plan.subject}</h3>
                <span className={getStatusBadgeClass(plan.status)}>{plan.status}</span>
              </div>

              <div className="plan-details">
                <div className="plan-detail-item">
                  <svg className="plan-detail-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Planned: {plan.plannedHours} hours</span>
                </div>

                <div className="plan-detail-item">
                  <svg className="plan-detail-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>Due: {new Date(plan.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="plan-actions">
                <button 
                  onClick={() => navigate(`/edit-plan/${plan._id}`)} 
                  className="action-icon-btn edit"
                  title="Edit study plan"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button 
                  onClick={() => handleDelete(plan._id)} 
                  className="action-icon-btn delete"
                  title="Delete study plan"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPlans;