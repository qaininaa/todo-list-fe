import axiosInstance from "../api/axios";
import useAuth from "./useAuth";

/**
 * Custom hook for refreshing access tokens
 * Handles the refresh token logic and updates the auth context
 */
const useRefreshAccess = () => {
  const auth = useAuth();

  /**
   * Function to fetch a new access token using the refresh token
   * @returns Promise<string | null> - Returns new access token or null if refresh fails
   */
  const fetchRefresh = async (): Promise<string | null> => {
    try {
      /**
       * Call refresh endpoint with credentials to get new access token
       */
      const res = await axiosInstance.get("/api/auth/refresh", {
        withCredentials: true,
      });

      const newAccessToken = res?.data?.accessToken;

      /**
       * Update auth context with new access token if received
       */
      if (newAccessToken) {
        auth?.refresh(newAccessToken);
      }

      return newAccessToken;
    } catch (error) {
      /**
       * If refresh fails, logout user and clear auth state
       */
      console.error("Token refresh failed:", error);
      auth?.logout();
      return null;
    }
  };

  return fetchRefresh;
};

export default useRefreshAccess;
