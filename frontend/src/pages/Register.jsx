// import {useState} from "react";
// import axios from "axios";

// function Register(){
//     const [formData, setformData] = useState({
//         name: "",
//         email: "",
//         password: ""
//     });

//     const handleChange = (e)=>{
//         const {name, value} = e.target;
//         setformData({...formData, [name]: value});
//     };

//     const handleSubmit = async (e)=>{
//         e.preventDefault();
        
//         try{
//             const response = await axios.post(
//                 "http://localhost:5000/api/auth/register",
//                 formData
//             );

//             console.log(response.data);

//             alert("User registered successfully");
//         }
//         catch(error){
//             console.log(error);
//             alert(error.response.data.message || "Registration failed");
//         }
//     };

//     return(
//         <div style={{
//             margin:"20px"
//         }}>
//             <h2>Registration Form</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>Name:
//                     <input type="text" name="name" value={formData.name} onChange={handleChange}/>
//                 </label>
//                 <br/>
//                 <label>Email:
//                     <input type="text" name="email" value={formData.email} onChange={handleChange}/>
//                 </label>
//                 <br/>
//                 <label>Password:
//                     <input type="password" name="password" value={formData.password} onChange={handleChange}/>
//                 </label>
//                 <br/>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     )
// }

// export default Register;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
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
      await register(formData);

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };


  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Get Started</h1>
          <p>Create an account to begin planning</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
            Register
          </button>
        </form>

        <p style={{ marginTop: '24px', fontSize: '0.9rem' }}>
          Already have an account?{" "}
          <span 
            onClick={() => navigate("/")} 
            style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;