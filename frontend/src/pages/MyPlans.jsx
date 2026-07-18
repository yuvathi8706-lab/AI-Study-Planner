import { useState, useEffect } from "react";

import { getPlans } from "../services/planService";

function MyPlans(){

const [plans,setPlans]=useState([]);

const fetchPlans=async()=>{

try{

const data=await getPlans();

setPlans(data);

}

catch(error){

console.log(error);

}

};

useEffect(()=>{

fetchPlans();

},[]);

return(

<div>

<h1>My Study Plans</h1>

{

plans.map((plan)=>(

<div key={plan._id}>

<h2>{plan.subject}</h2>

<p>Hours : {plan.plannedHours}</p>

<p>Deadline : {plan.deadline}</p>

<p>Status : {plan.status}</p>

<hr/>

</div>

))

}

</div>

);

}

export default MyPlans;