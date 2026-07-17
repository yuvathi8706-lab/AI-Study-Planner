import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        {/* <Route path="/login" element={<Login/>}/> */}
        <Route path="/register" element={<Register/>}/>
        <Route path="/Dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }/>
        <Route path ="/plans" element={
          <ProtectedRoute>
            <MyPlans/>
          </ProtectedRoute>
        }/>
        <Route path="/generate-plan" element={
          <ProtectedRoute>
            <GeneratePlan/>
          </ProtectedRoute>
        }/>
        <Route path="/create-plan" element={
          <ProtectedRoute>
            <CreatePlan/>
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

  export default App;