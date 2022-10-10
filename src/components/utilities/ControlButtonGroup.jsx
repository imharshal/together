import { ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/material";
const ControlButtonGroup = styled(ToggleButtonGroup)(({ background }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    backgroundColor:
      "linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))",
  },
  "& .MuiToggleButtonGroup-grouped:not(:last-of-type), .MuiToggleButtonGroup-grouped:not(:first-of-type) ":
    {
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: 100,
      margin: 10,
      bottom: 0,
    },
}));

export default ControlButtonGroup;
