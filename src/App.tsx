import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BasicInformation from "./pages/SignUp/basicInformation";
import SignUp from "./pages/SignUp";
import { ARfittProvider } from "./context/storeContext";
import LandingPage from "./pages/Landing page/landingPage";
import LogIn from "./pages/LogIn/logIn";
import GetStarted from "./pages/LogIn/getStarted";
// import TemplateSelector from './components/TemplateSelector';

const App = () => {
  return (
    <ARfittProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/getStarted" element={<GetStarted />} />
        </Routes>
      </Router>
    </ARfittProvider>
  );
};

export default App;
