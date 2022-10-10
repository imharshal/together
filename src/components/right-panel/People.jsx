import { Close } from "@mui/icons-material";
import { Box, Alert, Paper, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { TabControlContext } from "../../Context";

function People() {
  const { handleChange } = useContext(TabControlContext);
  return (
    <Box>
      <Box
        sx={{
          padding: 0.1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <Box fontSize="18px">People</Box>
        <IconButton component="label" onClick={handleChange}>
          <Close />
        </IconButton>
      </Box>
      <Box component="div" sx={{ flexGrow: "10" }}></Box>
    </Box>
  );
}

export default People;
