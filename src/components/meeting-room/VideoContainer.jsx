import { Box, Stack } from "@mui/material";
import React from "react";
import PersonVideo from "./PersonVideo";

function VideoContainer() {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, auto))",
        height: "100%",
        alignContent: "start",
        p: 2,
        mb: 4,
      }}
    >
      <PersonVideo />
      <PersonVideo />
      <PersonVideo />
      <PersonVideo />
      <PersonVideo />
      <PersonVideo />
      <PersonVideo />
      <PersonVideo />
    </Box>
  );
}

export default VideoContainer;
