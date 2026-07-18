import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPlan } from "../services/planService";
import "./CreatePlan.css"; // Import the CSS file for styling

function CreatePlan() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subject: "",
    plannedHours: "",
    deadline: "",
    status: "Pending"
  });

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
      await createPlan(formData);

      alert("Study plan created successfully");

      navigate("/plans");
    } catch (error) {
      console.error(error);
      alert("Failed to create study plan");
    }
  };

  return (
    <div className="form-page-container">
      <div className="form-header">
        <h1>Create Study Plan</h1>
        <p>Set a new study target and deadline</p>
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
              Create Plan
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

export default CreatePlan;