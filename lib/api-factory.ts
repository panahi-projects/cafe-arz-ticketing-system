import { ApiFactoryOptions } from "@/types";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class ApiFactory {
  private instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);

    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<T>(url, config).then((response) => response.data);
  }

  public post<T>(
    url: string,
    data?: AxiosRequestConfig["data"],
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance
      .post<T>(url, data, config)
      .then((response) => response.data);
  }

  public put<T>(
    url: string,
    data?: AxiosRequestConfig["data"],
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance
      .put<T>(url, data, config)
      .then((response) => response.data);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance
      .delete<T>(url, config)
      .then((response) => response.data);
  }
}

export const apiFactory = ({ baseURL }: ApiFactoryOptions) => {
  return new ApiFactory({
    baseURL,
    timeout: 10000,
  });
};
