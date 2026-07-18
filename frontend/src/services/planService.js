import api from "./api";

export const getPlans = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get(
    "/plans",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const createPlan = async (planData) => {
  const token = localStorage.getItem("token");
  const response = await api.post(
    "/plans",
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
  const response = await api.put(
    `/plans/${id}`,
    planData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const getPlanById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.get(
    `/plans/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const deletePlan = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(
    `/plans/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};