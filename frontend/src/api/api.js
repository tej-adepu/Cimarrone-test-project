const BASE_URL = import.meta.env.VITE_API_URL;

export default BASE_URL;

export const getVariables = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});