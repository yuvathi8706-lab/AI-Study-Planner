import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPlan } from "../services/planService";

function GeneratePlan() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [hours, setHours] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!topic || !hours) return;

    setLoading(true);
    setGeneratedPlan(null);
    
    // Animate loader steps
    const steps = [
      "Connecting to AI generation engine...",
      "Analyzing study goals and content metrics...",
      "Structuring curricular blocks...",
      "Finalizing review schedules..."
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setLoadingStep(step);
      }, index * 600);
    });

    setTimeout(() => {
      setLoading(false);
      setGeneratedPlan({
        subject: topic,
        plannedHours: parseInt(hours, 10),
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        modules: [
          { title: "Module 1: Foundations & Core Concepts", description: "Introduction to terminology and core structural mechanics." },
          { title: "Module 2: Practical Applications", description: "Hands-on implementation projects and structured problem solving templates." },
          { title: "Module 3: Advanced Optimization & Review", description: "Deep-dives, review topics, and mock examinations." }
        ]
      });
    }, steps.length * 600);
  };

  const handleSave = async () => {
    if (!generatedPlan) return;
    try {
      await createPlan({
        subject: generatedPlan.subject,
        plannedHours: generatedPlan.plannedHours,
        deadline: generatedPlan.deadline,
        status: "Pending"
      });
      alert("AI Study Plan successfully saved to your dashboard!");
      navigate("/plans");
    } catch (err) {
      console.error(err);
      alert("Failed to save generated plan");
    }
  };

  return (
    <div className="form-page-container">
      <div className="form-header">
        <h1>AI Study Plan Generator</h1>
        <p>Harness AI models to structure custom topics into digestible study timelines</p>
      </div>

      <div className="glass-card" style={{ marginBottom: generatedPlan || loading ? '32px' : '0px' }}>
        <form onSubmit={handleGenerate} className="create-plan-form">
          <div className="form-group">
            <label htmlFor="topic">What are you studying?</label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Advanced Machine Learning, React Native"
              className="input-field"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="hours">Study Duration Target (Hours)</label>
            <input
              id="hours"
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="e.g. 45"
              className="input-field"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Generating..." : "Generate AI Plan"}
          </button>
        </form>
      </div>

      {loading && (
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
          <div className="avatar" style={{ margin: '0 auto 20px', animation: 'spin 2s linear infinite' }}>↻</div>
          <h4>Analyzing Curriculum</h4>
          <p style={{ marginTop: '8px' }}>{loadingStep}</p>
        </div>
      )}

      {generatedPlan && (
        <div className="glass-card" style={{ textAlign: 'left', animation: 'fadeIn 0.4s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
            <div>
              <h3 style={{ background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{generatedPlan.subject}</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Target: {generatedPlan.plannedHours} hours | Target Completion: {new Date(generatedPlan.deadline).toLocaleDateString()}</p>
            </div>
            <button onClick={handleSave} className="btn btn-primary" style={{ width: 'auto' }}>
              Save Plan
            </button>
          </div>

          <h4 style={{ marginBottom: '16px' }}>Generated Outline</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {generatedPlan.modules.map((mod, idx) => (
              <div key={idx} style={{ padding: '16px', background: 'rgba(148, 163, 184, 0.05)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--primary)' }}>
                <h5 style={{ marginBottom: '6px' }}>{mod.title}</h5>
                <p style={{ fontSize: '0.9rem' }}>{mod.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GeneratePlan;
