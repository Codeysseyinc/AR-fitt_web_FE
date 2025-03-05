import axios, { CancelTokenStatic, CancelTokenSource } from "axios";
import CONSTANTS from "../utils/constants/CONSTANTS";
import { setCurrentForm, setErrorMsg } from "../redux/signup/SignupActions";

export default class HTTPService {
  CancelToken: CancelTokenStatic;
  source: CancelTokenSource;
  constructor() {
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
  }

  static setToken(token: string) {
    (axios as any).defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  protected get = async (
    url: string,
    dispatch: any,
    param?: any
  ): Promise<any> => {
    return axios
      .get(`${url}`, {
        ...param,
        cancelToken: this.source.token,
      })
      .catch((err: any) => {
        if (err?.response.data.message === "Unauthorized access") {
          window.location.href = "/";
          dispatch(setCurrentForm(CONSTANTS.SIGN_UP_BASIC_INFO));
          localStorage.clear();
          sessionStorage.clear();
        }
        dispatch(setErrorMsg(err?.response.data.message));
        throw err;
      });
  };
  protected post = async (
    url: string,
    body?: any,
    options?: any
  ): Promise<any> => {
    return axios.post(`${url}`, body, {
      ...options,
      headers: {
        ...(options?.headers || {}), // Include any existing headers from options
      },
      cancelToken: this.source.token,
    });
  };
  private updateCancelToken() {
    this.source = this.CancelToken.source();
  }
  cancel = () => {
    this.source.cancel("Explicitly cancelled HTTP request");
    this.updateCancelToken();
  };
}
