import axios from "axios";

const API = "http://localhost:5000/api/plans";

export const createPlan = async (planData) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(

        API,

        planData,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

};

export const updatePlan = async (id, planData) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(

        `${API}/${id}`,

        planData,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

};

export const getPlanById = async(id)=>{

const token=localStorage.getItem("token");

const response=

await axios.get(

`${API}/${id}`,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

return response.data;

}