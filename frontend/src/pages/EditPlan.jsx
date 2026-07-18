import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlanById, updatePlan } from "../services/planService";

function EditPlan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subject: "",
    plannedHours: "",
    deadline: "",
    status: "Pending"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const data = await getPlanById(id);
        // Format the ISO date string to YYYY-MM-DD for the HTML date input
        const formattedDate = data.deadline ? new Date(data.deadline).toISOString().split('T')[0] : "";
        setFormData({
          subject: data.subject || "",
          plannedHours: data.plannedHours || "",
          deadline: formattedDate,
          status: data.status || "Pending"
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load study plan details");
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePlan(id, formData);
      alert("Study plan updated successfully");
      navigate("/plans");
    } catch (error) {
      console.error(error);
      alert("Failed to update study plan");
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading study plan...</div>;
  }

  return (
    <div className="form-page-container">
      <div className="form-header">
        <h1>Edit Study Plan</h1>
        <p>Modify targets, schedule hours, or update plan status</p>
      </div>

      <div className="glass-card">
        <form onSubmit={handleSubmit} className="create-plan-form">
          <div className="form-group">
            <label htmlFor="subject">Subject Name</label>
            <input
              id="subject"
              type="text"
              name="subject"
              placeholder="e.g. Data Structures & Algorithms"
              value={formData.subject}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="plannedHours">Planned Hours</label>
            <input
              id="plannedHours"
              type="number"
              name="plannedHours"
              placeholder="e.g. 40"
              value={formData.plannedHours}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="deadline">Target Deadline</label>
            <input
              id="deadline"
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Plan Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input-field"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Save Changes
            </button>
            <button 
              type="button" 
              onClick={() => navigate("/plans")} 
              className="btn btn-secondary" 
              style={{ width: 'auto' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPlan;
