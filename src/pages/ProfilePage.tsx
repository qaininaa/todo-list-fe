import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../hooks/useAxiosInstance";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState();
  const axios = useAxiosInstance();

  useEffect(() => {
    let mounted: boolean = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/profile/user", {
          signal: controller.signal,
        });
        console.log("ini response profile", response);

        mounted && setProfile(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    return () => {
      (mounted = false), controller.abort();
    };
  }, [axios]);

  return (
    <div>
      <button onClick={() => navigate("/")}>home</button>
      {profile && <p>{profile?.email}</p>}
    </div>
  );
};

export default ProfilePage;
