import { Paper } from "@mui/material";
import React, { useContext } from "react";
import { VideoFrameContext } from "../../Context";

function VideoFrame() {
  const size = useContext(VideoFrameContext);
  return (
    <Paper
      sx={{
        width: "100%",
        flexShrink: 0,
        flexBasis: `calc(${size}% - 10px)`,
        objectFit: "cover",
        borderRadius: 2,
        p: 2,
      }}
    >
      Video
    </Paper>
  );
}

export default VideoFrame;
