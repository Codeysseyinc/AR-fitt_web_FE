import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/Landing page/landingPage";
import LogIn from "./pages/LogIn/logIn";
import ForgotPassword from "./pages/LogIn/forgotPassword";
import GetStarted from "./pages/LogIn/getStarted";
import HomePage from "./pages/Home page";
import { store, persistor } from "./redux/store";
import { ARfittProvider } from "./context/storeContext";
import ResetPassword from "./pages/LogIn/resetPassword";
import Payments from "./pages/SignUp/payment";
import { PersistGate } from "redux-persist/integration/react";
import CategoryPage from "./pages/SignUp/categoryPage";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ARfittProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/getStarted" element={<GetStarted />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/categoryPage" element={<CategoryPage />} />
              InterestPage
            </Routes>
          </Router>
        </ARfittProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
