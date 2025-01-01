import HTTPService from "./base.service";

class AIService extends HTTPService {
  bodyScan = (blob: string) => {
    return this.post(`${process.env.REACT_APP_FLASK_BE_URL}/full_body_check`, {
      image: blob,
    });
  };
  faceScan = (blob: string) => {
    return this.post(`${process.env.REACT_APP_FLASK_BE_URL}/face_check`, {
      image: blob,
    });
  };
}
const loginService = new AIService();
export default loginService;
