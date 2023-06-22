import { useAppStore } from "@/store/app.store";
import { BASE_URL } from "@/types/type";
import axios, { AxiosRequestConfig } from "axios";

axios.defaults.baseURL = BASE_URL;

const useAxios = () => {
  const { setLoading, setError } = useAppStore();

  const fetchData = async (
    url: string,
    method: AxiosRequestConfig["method"],
    body: object | null = null,
    headers: AxiosRequestConfig["headers"] = {},
    defaultLoader: boolean = true
  ) => {
    try {
      setLoading(true && defaultLoader);
      const config: AxiosRequestConfig = {
        method,
        url,
        headers,
        withCredentials: true,
      };
      if (body) {
        config.data = body;
      }
      const res = await axios(config);
      return res.data;
    } catch (err: any) {
      console.log(err);
      setError(err.response.data.message);
      // console.log(err.response.data.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { fetchData };
};

export default useAxios;
