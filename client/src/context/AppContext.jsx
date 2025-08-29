
import React from 'react';
import { createContext, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const AppContext = createContext(
);
const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const [credit, setCredit] = useState(false);
   const [token, setToken] = useState(localStorage.getItem("token"));
  const loadCreditsData = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Credits data loaded:", data);
      if(data.success){
        setCredit(data.credits);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error loading credits data:", error);
      if(user)
      toast.error("An error occurred while loading credits.");
    }
  };

 const generateImage = async (prompt) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/image/generate`,
      { prompt },
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        validateStatus: () => true // 👈 fix here
      }
    );

    console.log("Image generation response data:", response.data);

    if (response.data.success) {
      loadCreditsData();
      return response.data.imageUrl;
    } else {
      toast.error(response.data.message);
      if (response.data.message === "Insufficient credits") {
        navigate("/buy");
        console.log("No credits left, redirecting to buy page.");
      }
    }
  } catch (error) {
    console.error("Error generating image:", error);
    toast.error("Failed to generate image. Please try again.");
  }
};


  // Load credits data when the component mounts
  React.useEffect(() => {
    loadCreditsData();
  }, [token]);
   
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const value = { user, setUser , showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, logout, generateImage };
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;