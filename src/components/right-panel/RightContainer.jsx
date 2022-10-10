import Chatbox from "./Chatbox";
import Controls from "./Controls";
import { Stack, Paper, Slide, Box, Tab } from "@mui/material";
import { forwardRef, useContext, useRef, useState } from "react";
import People from "./People";
import { TabControlContext } from "../../Context";
const RightContainer = forwardRef((props, ref) => {
  const { tab } = useContext(TabControlContext);
  return (
    <Stack spacing={0}>
      <Stack
        position="relative"
        boxSizing="border-box"
        id="right-container"
        flexGrow={10}
        ref={ref}
      >
        {tab && (
          <Paper
            elevation={5}
            sx={{
              padding: "15px",
              borderRadius: 3,
              width: "400px",
              height: "100%",
              margin: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {tab === "people" && <People />}
            {tab === "chat" && <Chatbox />}
          </Paper>
        )}
      </Stack>
    </Stack>
  );
});

export default RightContainer;
