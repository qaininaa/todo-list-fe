import { useEffect } from "react";
import axiosInstance from "../api/axios";
import useAuth from "./useAuth";
import useRefreshAccess from "./useRefreshAccess";

/**
 * Custom hook that provides an axios instance with automatic token refresh interceptors
 * Handles 401 and 403 errors by attempting to refresh the access token
 */
const useAxiosInstance = () => {
  const auth = useAuth();
  const refresh = useRefreshAccess();

  useEffect(() => {
    /**
     * Response interceptor to handle token refresh on 401/403 errors
     */
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const prevRequest = error?.config;

        /**
         * Check if error is 401 (Unauthorized) or 403 (Forbidden) and request hasn't been retried
         */
        if (
          (error?.response?.status === 401 ||
            error?.response?.status === 403) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;

          try {
            /**
             * Attempt to refresh the access token
             */
            const newAccessToken = await refresh();

            /**
             * If refresh successful, retry the original request with new token
             */
            if (newAccessToken) {
              prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return axiosInstance(prevRequest);
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (refreshError) {
            /**
             * If refresh also fails, return original error
             */
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    /**
     * Request interceptor to automatically add Authorization header
     */
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        /**
         * Add Authorization header if token exists and header is not already set
         */
        if (!config.headers.Authorization && auth?.auth?.accessToken) {
          config.headers.Authorization = `Bearer ${auth.auth.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    /**
     * Cleanup function to remove interceptors when component unmounts
     */
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [refresh, auth]);

  return axiosInstance;
};

export default useAxiosInstance;
