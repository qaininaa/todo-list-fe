import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../hooks/useAxiosInstance";

/**
 * Interface for user profile data
 */
interface User {
  email: string;
  name: string;
  username: string;
}

/**
 * Profile page component that displays user information
 * Automatically handles token refresh through axios interceptors
 */
const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<User | null>(null);
  const axios = useAxiosInstance();

  useEffect(() => {
    let mounted: boolean = true;
    const controller = new AbortController();

    /**
     * Fetch user profile data
     * Token refresh is handled automatically by axios interceptors
     */
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/profile/user", {
          signal: controller.signal,
        });

        /**
         * Update profile state only if component is still mounted
         */
        if (mounted && response.data.user) {
          setProfile(response.data.user);
        }
      } catch (error) {
        /**
         * Log error only if component is still mounted
         * Token refresh errors are handled by interceptors
         */
        if (mounted) {
          console.error("Failed to fetch profile:", error);
        }
      }
    };

    fetchData();

    /**
     * Cleanup function to prevent state updates on unmounted component
     */
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [axios]);

  return (
    <div>
      <button onClick={() => navigate("/")}>home</button>
      {profile && <p>{profile.email}</p>}
    </div>
  );
};

export default ProfilePage;
