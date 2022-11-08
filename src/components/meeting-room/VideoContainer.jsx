import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import VideoFrame from "./VideoFrame";
import { VideoFrameContext } from "../../Context";
const grid = {
  display: "grid",
  gap: 2,
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, auto))",
  alignContent: "start ",
  gridTemplateRows: "repeat(auto-fill, minmax(250px, 1fr))",
  p: 2,
  mb: 4,
};

function VideoContainer({ videos }) {
  console.log("videos>>", videos);
  const styles = {
    position: "relative",
    display: "flex",
    flex: "1 1 300px",
    flexFlow: "row wrap",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    gap: 2,
    p: 2,
  };
  const len = videos.length;
  let size = 0;
  const width = [100, 50, 40, 30, 25, 20, 15];
  const breakpoint = [1, 2, 4, 6, 12, 20, 30];
  if (len <= breakpoint[0]) size = 0;
  else if (len <= breakpoint[1]) size = 1;
  else if (len <= breakpoint[2]) size = 2;
  else if (len <= breakpoint[3]) size = 3;
  else if (len <= breakpoint[4]) size = 4;
  else if (len <= breakpoint[5]) size = 5;
  else if (len >= breakpoint[6]) size = 6;

  return (
    <VideoFrameContext.Provider value={width[size]}>
      <Box sx={styles}>
        {videos.map((peer, i) => {
          console.log(peer);
          return <VideoFrame key={i} peer={peer} />;
        })}
      </Box>
    </VideoFrameContext.Provider>
  );
}

export default VideoContainer;
