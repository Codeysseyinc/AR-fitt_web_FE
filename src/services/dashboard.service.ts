import HTTPService from "./base.service";

class DashboardService extends HTTPService {
  getImageByEmail(email: any, type: string, dispatch: any) {
    return this.get(
      `${process.env.REACT_APP_BASE_URL}/${type}Image?email=${email}`,
      dispatch
    );
  }
  getImageById(id: any, type: string, dispatch: any) {
    return this.get(
      `${process.env.REACT_APP_BASE_URL}/${type}Image?userID=${id}`,
      dispatch
    );
  }
  getCategories(type: string, dispatch: any) {
    return this.get(
      `${process.env.REACT_APP_BASE_URL}/inventoryCategories?type=${type}`,
      dispatch
    );
  }
  getItemImage(itemId: string, ImageUrlId: string, dispatch: any) {
    return this.get(
      `${process.env.REACT_APP_BASE_URL}/itemImage/${itemId}/${ImageUrlId}`,
      dispatch
    );
  }
}
const dashboardService = new DashboardService();
export default dashboardService;
