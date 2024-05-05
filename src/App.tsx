import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/Landing page/landingPage";
import LogIn from "./pages/LogIn/logIn";
import ForgotPassword from "./pages/LogIn/forgotPassword";
import GetStarted from "./pages/LogIn/getStarted";
import HomePage from "./pages/Home page";
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/getStarted" element={<GetStarted />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
