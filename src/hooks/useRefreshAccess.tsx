import axiosInstance from "../api/axios";

const useRefreshAccess = () => {
  const fetchRefresh = async () => {
    try {
      const res = await axiosInstance.get("/api/auth/refresh", {
        withCredentials: true,
      });
      return res?.data?.accessToken;
    } catch (error) {
      console.log(error);
    }
  };
  return fetchRefresh;
};

export default useRefreshAccess;
