import { Button, Grid, Link, TextField } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import { useARfittContext } from "../../context/storeContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setErrorMsg } from "../../redux/signup/SignupActions";
import { useEffect } from "react";

const GetStarted: React.FC<{}> = ({}) => {
  const { email, setEmail } = useARfittContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setErrorMsg(null));
  }, []);
  return (
    <Grid
      container
      direction="row"
      xs={12}
      className="w-screen h-screen relative"
    >
      {/* asset section */}
      <AssetSection
        backgroundSrc="/assets/images/logIn/logInBg.png"
        modelsSrc="/assets/images/logIn/logInModels.png"
      />
      <ContentArea removeLogo>
        <Grid
          direction="column"
          className="w-[70%] h-[90%] flex justify-start items-center "
        >
          <img src="/assets/images/logo.png" className=" mb-10 h-[20%]" />
          {/* Login and Guest buttons */}
          <Grid
            direction="column"
            className="flex items-center justify-center w-[80%] h-[60%] mt-[3%] "
          >
            {/* Login button */}
            <Button
              className="bg-primary text-contrastText font-bold"
              disableElevation={true}
              variant="contained"
              style={{
                width: "100%",
                fontFamily: "Montserrat",
                margin: "4%",
                borderRadius: "10px",
                height: "75%",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            {/* OR */}
            <Grid
              direction="row"
              item
              className="font-Montserrat flex w-[90%]  my-6 "
            >
              <div className="border-b border-x-0 border-t-0 border-solid border-[#969696] w-[40%] m-2" />
              OR
              <div className="border-b border-x-0 border-t-0 border-solid border-[#969696] w-[40%] m-2" />
            </Grid>
            {/* Guest Button */}
            <Button
              className="bg-white text-primary border-solid border-black border h-[80%] font-bold"
              variant="contained"
              disableElevation={true}
              style={{
                width: "100%",
                fontFamily: "Montserrat",
                margin: "4%",
                borderRadius: "10px",
                height: "75%",
              }}
              onClick={() => {}}
            >
              Continue As Guest
            </Button>
            {/* SIGN UP TEXT */}
            <Grid className="Montserrat-text text-xs flex justify-center w-full m-4">
              Don't have an account ?&nbsp;
              <Link href="/signup" className="text-link font-bold">
                {" "}
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </ContentArea>
    </Grid>
  );
};
export default GetStarted;
