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
    <div>
      <h1>Create Study Plan</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="plannedHours"
          placeholder="Planned Hours"
          value={formData.plannedHours}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit">
          Create Plan
        </button>

      </form>
    </div>
  );
}

export default CreatePlan;