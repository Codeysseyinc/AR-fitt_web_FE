import { Grid } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";
const UnauthorisedPage = () => {
  const navigate = useNavigate();
  return (
    <Grid
      className="p-2 h-screen overflow-auto flex justify-center"
      style={{
        backgroundImage: 'url("/assets/images/homePage/homeHeroBg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflowY: "auto",
        maxHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <p className="py-10 px-5 text-bold font-Montserrat text-xl text-white">
        PLEASE LOGIN OR SIGNUP TO CONTINUE
      </p>
      <ArrowBackRoundedIcon
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
        sx={{ color: "white" }}
        className=" rounded-[50%] scale-150 ml-8 mt-6 cursor-pointer"
      />
    </Grid>
  );
};

export default UnauthorisedPage;
