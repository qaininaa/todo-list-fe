import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../hooks/useAxiosInstance";
import useAuth from "../hooks/useAuth";

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

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        const data = await axios.get("api/profile/user", { signal });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => controller.abort();
  }, [axios]);

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <div>
      <button onClick={() => navigate("/")}>home</button>
    </div>
  );
};

export default ProfilePage;
