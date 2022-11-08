import { Paper } from "@mui/material";
import React, { useContext, useRef, useEffect } from "react";
import { VideoFrameContext } from "../../Context";
function VideoFrame({ peer }) {
  const size = useContext(VideoFrameContext);
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <Paper
      sx={{
        width: "100%",
        flexShrink: 0,
        flexBasis: `calc(${size}% - 10px)`,
        // objectFit: "cover",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <video
        playsInline
        autoPlay
        ref={ref}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
      ></video>
    </Paper>
  );
}

export default VideoFrame;
