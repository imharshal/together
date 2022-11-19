import React from "react";
import { Box, Grid, ToggleButton } from "@mui/material";
import { Mic, MicOff, Videocam, VideocamOff } from "@mui/icons-material";

function ActionButtons({ audio, video, setAudio, setVideo }) {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 15,
        left: "50%",
        transform: "translate(-50%)",
      }}
    >
      <ToggleButton
        sx={{ borderRadius: "50%", marginRight: 3 }}
        value="audio"
        selected={audio}
        backgroundColor="red"
        onChange={() => setAudio(!audio)}
        aria-label="people"
      >
        {audio ? <MicOff /> : <Mic />}
      </ToggleButton>
      <ToggleButton
        sx={{ borderRadius: "50%" }}
        value="video"
        selected={video}
        onChange={() => setVideo(!video)}
        aria-label="video"
      >
        {video ? <VideocamOff /> : <Videocam />}
      </ToggleButton>
    </Box>
  );
}

export default ActionButtons;
