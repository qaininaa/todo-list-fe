import useAuth from "./useAuth";
import axiosInstance from "../api/axios";

const useRefreshAccess = () => {
  const auth = useAuth();

  const refreshToken = async () => {
    try {
      const response = await axiosInstance.get("/users/refresh");

      if (response) {
        auth?.refresh(response.data.accessToken);
      }
      return response.data.accessToken;
    } catch (error) {
      throw new Error(error);
    }
  };

  return refreshToken;
};

export default useRefreshAccess;
