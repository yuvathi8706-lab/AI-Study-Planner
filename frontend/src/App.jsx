import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import MyPlans from "./pages/MyPlans";
import GeneratePlan from "./pages/GeneratePlan";
import CreatePlan from "./pages/CreatePlan";
import EditPlan from "./pages/EditPlan";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        
        {/* Protected Routes sharing a common layout */}
        <Route element={
          <ProtectedRoute>
            <AppLayout>
              <Outlet />
            </AppLayout>
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/plans" element={<MyPlans/>}/>
          <Route path="/generate-plan" element={<GeneratePlan/>}/>
          <Route path="/create-plan" element={<CreatePlan/>}/>
          <Route path="/edit-plan/:id" element={<EditPlan/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


  export default App;