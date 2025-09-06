import { useEffect } from "react";
import axiosInstance from "../api/axios";
import useAuth from "./useAuth";
import useRefreshAccess from "./useRefreshAccess";

const useAxiosInstance = () => {
  const auth = useAuth();
  const refresh = useRefreshAccess();

  useEffect(() => {
    const responseInceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    const requestInceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInceptor);
      axiosInstance.interceptors.response.eject(responseInceptor);
    };
  }, [refresh, auth]);

  return axiosInstance;
};

export default useAxiosInstance;
