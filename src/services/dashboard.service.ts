import { Dispatch, UnknownAction } from "redux";
import HTTPService from "./base.service";

class DashboardService extends HTTPService {
  getMatrix(email: any, type: string, dispatch: any) {
    return this.get(
      `${process.env.REACT_APP_BASE_URL}/${type}Matrix?email=${email}`,
      dispatch
    );
  }
}
const dashboardService = new DashboardService();
export default dashboardService;
