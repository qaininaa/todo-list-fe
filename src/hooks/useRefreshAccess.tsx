import useAuth from "./useAuth";
import axiosInstance from "../api/axios";

const useRefreshAccess = () => {
  const auth = useAuth();

  const refreshToken = async () => {
    try {
      const response = await axiosInstance.get("/api/auth/refresh");
      const token = await response.data.accessToken;
      console.log("ini token", token);

      return token;
    } catch (error) {
      console.info(error);
    }
  };

  return refreshToken;
};

export default useRefreshAccess;
