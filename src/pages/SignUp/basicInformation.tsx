import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Alert, Button, Grid, Link } from "@mui/material";
import InputField from "../../components/inputField";
import ContentArea from "../../components/contentArea";
import AssetSection from "../../components/assetSection";
import GenderDropDown from "../../components/genderDropdown";
import InputPhoneField from "../../components/inputPhoneField";
import {
  registerUserStartAsync,
  setCurrentForm,
} from "../../redux/signup/SignupActions";
import CONSTANTS from "../../utils/constants/CONSTANTS";

const BasicInformation: React.FC<any> = () => {
  const dispatch: any = useDispatch();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  useEffect(() => {
    dispatch(setCurrentForm(CONSTANTS.SIGN_UP_BASIC_INFO));
  });

  // const handleSubmit = () => {
  //   if (password === confirmPassword && password) {
  //     dispatch(
  //       registerUserStartAsync(
  //         {
  //           email: email,
  //           fullName: firstName.concat(" ", lastName),
  //           phone: phone,
  //           password: password,
  //         },
  //         setError
  //       )
  //     );
  //   } else {
  //     setError("Confirm Password does not match");
  //   }
  // };

  return (
    // page
    <Grid
      container
      direction="row"
      xs={12}
      className="w-screen h-screen relative"
    >
      {/* asset section */}
      <AssetSection
        backgroundSrc="/assets/images/signUp/basicInfoBg.png"
        modelsSrc="/assets/images/signUp/basicInfoModels.png"
      />
      {/* content section */}
      <ContentArea title="Create Account">
        {error ? (
          <Alert severity="error" className="absolute">
            {error}{" "}
          </Alert>
        ) : (
          ""
        )}
        <Grid direction="column" className="w-[70%] flex justify-center">
          {/* First Name & Last Name */}
          <Grid
            direction="row"
            className="flex items-center justify-evenly w-full mt-4"
          >
            <InputField
              type="text"
              placeholder="First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <InputField
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Grid>
          {/* Email */}
          <Grid className="flex items-center justify-evenly w-full mt-2">
            <InputField
              placeholder="Email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid>
          {/* Password & Confirm Password */}
          <Grid className="flex items-center justify-evenly w-full mt-2">
            <InputField
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <InputField
              placeholder="Confirm Password"
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Grid>
          {/* Phone Number*/}
          <Grid className="flex items-center justify-evenly w-full mt-2">
            <InputPhoneField setPhone={setPhone} />
          </Grid>
          {/* DOB & Gender*/}
          <Grid className="flex items-center justify-evenly w-full mt-2">
            <InputField
              type="date"
              placeholder="Date of Birth"
              setValue={setDob}
            />
            <GenderDropDown setGender={setGender} />
          </Grid>
          {/* Sign Up Button */}
          <Grid className="flex items-center justify-evenly w-full mt-[4%]">
            <Button
              className="bg-primary text-contrastText drop-shadow-lg"
              variant="contained"
              style={{
                width: "100%",
                fontFamily: "Montserrat",
                margin: "4%",
                borderRadius: "15px",
                height: "70%",
              }}
              onClick={() => {
                if (!(password && email && firstName && lastName)) {
                  setError("Please fill required fields");
                } else if (password === confirmPassword && password) {
                  dispatch(
                    registerUserStartAsync(
                      {
                        email: email,
                        fullName: firstName.concat(" ", lastName),
                        phone: phone,
                        password: password,
                        gender: gender,
                        dob: dob,
                      },
                      setError
                    )
                  );
                } else {
                  setError("Confirm Password does not match");
                }
              }}
            >
              Sign Up
            </Button>{" "}
          </Grid>
          {/* Sign In option */}
          <Grid className="Montserrat-text text-xs flex justify-start w-full m-4">
            Have an account ?&nbsp;
            <Link href="/login" className="text-link font-bold">
              {" "}
              Sign In
            </Link>
          </Grid>
        </Grid>
      </ContentArea>
    </Grid>
  );
};

export default BasicInformation;
