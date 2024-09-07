import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ARfittProvider } from "./context/storeContext";
import HTTPService from "./services/base.service";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn/logIn";
import HomePage from "./pages/Home page";
import HomeLayout from "./layouts/homePageLayout";
import GetStarted from "./pages/LogIn/getStarted";
import CategoryPage from "./pages/SignUp/categoryPage";
import ResetPassword from "./pages/LogIn/resetPassword";
import ForgotPassword from "./pages/LogIn/forgotPassword";
import LandingPage from "./pages/Landing page/landingPage";
import ItemDescription from "./pages/Home page/itemDescription";
import SuggestedItems from "./pages/Home page/SuggestedItems/suggestedItems";
import CONSTANTS from "./utils/constants/CONSTANTS";

const App = () => {
  const queryClient = new QueryClient();
  // eslint-disable-next-line
  const [token, _] = useState(localStorage.getItem(CONSTANTS.ACCESS_TOKEN));

  useEffect(() => {
    if (token) {
      HTTPService.setToken(token);
    }
  }, [token]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistor}>
          <ARfittProvider>
            <Router>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/getStarted" element={<GetStarted />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
                <Route path="/categoryPage" element={<CategoryPage />} />
                <Route path="/home" element={<HomeLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="suggestion" element={<SuggestedItems />} />
                  <Route path="item" element={<ItemDescription />} />
                </Route>
              </Routes>
            </Router>
          </ARfittProvider>
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
