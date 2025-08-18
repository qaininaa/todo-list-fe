import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../hooks/useAxiosInstance";

interface User {
  name: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const axios = useAxiosInstance();

  return (
    <div>
      <button onClick={() => navigate("/")}>home</button>
    </div>
  );
};

export default ProfilePage;
