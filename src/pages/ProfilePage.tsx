import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../hooks/useAxiosInstance";
import useAuth from "../hooks/useAuth";

/**
 * Interface for user profile data
 * Defines the structure of user information retrieved from the API
 */
interface User {
  /** User's email address */
  email: string;
  /** User's full name */
  name: string;
  /** User's unique username */
  username: string;
}

/**
 * Profile page component that displays user information
 * Automatically handles token refresh through axios interceptors
 *
 * Features:
 * - Fetches user profile data on mount
 * - Handles loading states
 * - Automatically retries requests on token expiration
 * - Prevents memory leaks with cleanup
 */
const ProfilePage = () => {
  // Navigation hook for routing
  const navigate = useNavigate();

  // State for storing user profile data
  const [profile, setProfile] = useState<User | null>(null);

  // Loading state to show spinner while fetching data
  const [loading, setLoading] = useState<boolean>(true);

  // Custom axios instance with interceptors for auth handling
  const axios = useAxiosInstance();

  // Auth context for authentication state
  const auth = useAuth();

  useEffect(() => {
    // Flag to track if component is still mounted
    let mounted: boolean = true;

    // Abort controller for canceling requests on unmount
    const controller = new AbortController();

    /**
     * Async function to fetch user profile data
     * Handles API calls with automatic token refresh
     */
    const fetchData = async () => {
      // Skip fetch if auth context is not available
      if (!auth) return;

      // Set loading state to true before fetching
      setLoading(true);

      try {
        // Make GET request to profile endpoint
        const response = await axios.get("/api/profile/user", {
          signal: controller.signal,
        });

        // Update profile state only if component is mounted and data exists
        if (mounted && response.data.user) {
          setProfile(response.data.user);
        }
      } catch (error) {
        // Only log errors if component is mounted and not an abort error
        if (
          mounted &&
          !(error instanceof Error && error.name === "AbortError")
        ) {
          console.error("Failed to fetch profile:", error);
        }
      } finally {
        // Always set loading to false if component is mounted
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Execute the fetch function
    fetchData();

    /**
     * Cleanup function to prevent state updates on unmounted component
     * Aborts any ongoing requests to avoid memory leaks
     */
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [axios, auth]); // Dependencies: re-run when axios or auth changes

  /**
   * Render loading state while data is being fetched
   */
  if (loading) {
    return (
      <div>
        <button onClick={() => navigate("/")}>home</button>
        <p>Loading...</p>
      </div>
    );
  }

  /**
   * Main render function for profile display
   */
  return (
    <div>
      <button onClick={() => navigate("/")}>home</button>
      {profile ? (
        <div>
          <p>Email: {profile.email}</p>
          <p>Name: {profile.name}</p>
          <p>Username: {profile.username}</p>
        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default ProfilePage;
