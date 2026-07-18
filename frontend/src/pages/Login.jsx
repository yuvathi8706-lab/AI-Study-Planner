// import {useState} from "react";
// import axios from "axios";

// function Login(){
//     const [formData, setformData] = useState({
//         email: "",
//         password: ""
//     });

//     const handleChange = (e) => {
//         const {name, value} = e.target;
//         setformData({...formData,[name]: value});
//     };

//     const handleSubmit = async(e) => {
//         e.preventDefault();
//         try{
//             const response = await axios.post("http://localhost:5000/api/auth/login",formData);
//             localStorage.setItem("token",response.data.token);
//             //alert(`Welcome ${response.data.user.name}!`);
//             //alert(`Welcome ${response.data.name}!`); //undefined.name because the backend returns message and token, user no longer exists!
//             alert(response.data.message);
//             console.log(response.data);
//         }
//         catch(error){
//             alert(error.response?.data?.message || "Login failed");
//         }
//     };

//     const getProfile = async () => {
//         const token = localStorage.getItem("token");
//         try{
//             console.log("Get profile clicked");
//             const response = await axios.get("http://localhost:5000/profile",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );
//             console.log(response.data);
//         } catch(err){
//             console.log(err);
//         }
//     }

//     const getPlans = async () => {
//         const token = localStorage.getItem("token");
//         try{
//             const response = await axios.get("http://localhost:5000/my-plans",
//                 {
//                     headers:{
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );
//             console.log(response.data);
//         }catch(err){
//             console.log(err);
//         }
//     }

//     return(
//         <>
//         <div style={{margin: "30px"}}>
//             <h1>Login</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>Email:
//                     <input type="text" name="email" value={formData.email} onChange={handleChange}/>
//                 </label>
//                 <br />
//                 <label>Password:
//                     <input type="password" value={formData.password} name="password" onChange={handleChange}/>
//                     <br />
//                 </label>
//                 <button type="submit">Submit</button>
                
//             </form>
//             <button type="button" onClick={getProfile}>Get Profile</button>
//             <button type="button" onClick={getPlans}>Get plans</button>
//         </div>
//         </>
//     );
// }

// export default Login;

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const [formData, setFormData] = useState({
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
      const data = await login(formData);

      setToken(data.token);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      alert("Invalid Credentials");
    }
  };


  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Login to manage your study plans</p>
        </div>

        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>

        <p style={{ marginTop: '24px', fontSize: '0.9rem' }}>
          Don't have an account?{" "}
          <span 
            onClick={() => navigate("/register")} 
            style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;