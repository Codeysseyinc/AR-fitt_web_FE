import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import { ARfittProvider } from "./context/storeContext";
import LandingPage from "./pages/Landing page/landingPage";
import LogIn from "./pages/LogIn/logIn";
import ForgotPassword from "./pages/LogIn/forgotPassword";
import GetStarted from "./pages/LogIn/getStarted";
import HomePage from "./pages/Home page";

const App = () => {
  return (
    <ARfittProvider>
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
    </ARfittProvider>
  );
};

export default App;
