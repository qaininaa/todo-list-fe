import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../hooks/useAxiosInstance";
import useAuth from "../hooks/useAuth";
import useRefreshAccess from "../hooks/useRefreshAccess";
import axiosInstance from "../api/axios";
import axios from "axios";

interface User {
  name: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

const ProfilePage = () => {
  const [user, setUser] = useState<null | User>(null);
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const auth = useAuth();
  const [mounted, setMounted] = useState(true);
  const refresh = useRefreshAccess();

  useEffect(() => {
    console.log("ProfilePage mounted ✅");

    const checkRefresh = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/auth/refresh`, {
          withCredentials: true,
        });

        console.info("New Access Token:", res.data.accessToken);
      } catch (err) {
        console.error("Refresh failed:", err);
      }
    };

    checkRefresh();
  }, []);
  return (
    <div>
      <button onClick={() => navigate("/")}>home</button>
    </div>
  );
};

export default ProfilePage;
