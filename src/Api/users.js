import api from "./index"

export const fetchAllUsers = async () => {
    try {
      const response = await api.get("/user");
      return response.data;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  };    

  export const loginUser = async (email, password, role) => {
    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
        role: role
      });
  
      return response.data || null;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };
  
    export const logoutUser = async () => {
    try {
        const response = await api.get("/logout");
        return response.data;
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
    };
