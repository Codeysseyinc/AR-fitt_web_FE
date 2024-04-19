import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
interface CallToActionButton {
  nav: string;
  title: string;
}
const CallToActionButton: React.FC<CallToActionButton> = ({ nav, title }) => {
  const navigate = useNavigate();
  return (
    <Button
      className={`font-Montserrat font-bold bg-primarySaturated text-contrastText h-[10%] w-[60%] mt-4 text-xs lg:text-xs xl:text-sm`}
      variant="contained"
      style={{
        borderRadius: "7px",
      }}
      onClick={() => {
        navigate(`${nav}`);
      }}
    >
      {title}
    </Button>
  );
};
export default CallToActionButton;
