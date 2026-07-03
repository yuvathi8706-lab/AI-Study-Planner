import {useState} from "react";
import axios from "axios";

function Register(){
    const [formData, setformData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setformData({...formData, [name]: value});
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        try{
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                formData
            );

            console.log(response.data);

            alert("User registered successfully");
        }
        catch(error){
            console.log(error);
            alert(error.response.data.message || "Registration failed");
        }
    };

    return(
        <div style={{
            margin:"20px"
        }}>
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange}/>
                </label>
                <br/>
                <label>Email:
                    <input type="text" name="email" value={formData.email} onChange={handleChange}/>
                </label>
                <br/>
                <label>Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange}/>
                </label>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register;