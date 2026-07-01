import {useState} from "react";
import axios from "axios";

function Login(){
    const [formData, setformData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setformData({...formData,[name]: value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:5000/api/auth/login",formData);
            localStorage.setItem("token",response.data.token);
            //alert(`Welcome ${response.data.user.name}!`);
            //alert(`Welcome ${response.data.name}!`); //undefined.name because the backend returns message and token, user no longer exists!
            alert(response.data.message);
            console.log(response.data);
        }
        catch(error){
            alert(error.response?.data?.message || "Login failed");
        }
    };

    const getProfile = async () => {
        const token = localStorage.getItem("token");
        try{
            console.log("Get profile clicked");
            const response = await axios.get("http://localhost:5000/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
        } catch(err){
            console.log(err);
        }
    }

    const getPlans = async () => {
        const token = localStorage.getItem("token");
        try{
            const response = await axios.get("http://localhost:5000/my-plans",
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
        <div style={{margin: "30px"}}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:
                    <input type="text" name="email" value={formData.email} onChange={handleChange}/>
                </label>
                <br />
                <label>Password:
                    <input type="password" value={formData.password} name="password" onChange={handleChange}/>
                    <br />
                </label>
                <button type="submit">Submit</button>
                
            </form>
            <button type="button" onClick={getProfile}>Get Profile</button>
            <button type="button" onClick={getPlans}>Get plans</button>
        </div>
        </>
    );
}

export default Login;