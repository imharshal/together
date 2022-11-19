import { Box, Stack, Container } from "@mui/material";
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
  let peerVideos = Array.from(videos.values());
  // let peerVideos = Videos.filter((peer) => peer.connected == true);

  const len = peerVideos.length;
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

  const flexflowForMobile = size < 2 ? "column wrap" : "row wrap";
  const styles = {
    position: "relative",
    display: "flex",
    flex: "1 1 300px",
    height: "95vh",
    flexFlow: { xs: flexflowForMobile, sm: "row wrap", md: "row wrap" },
    justifyContent: "center",
    gap: 2,
    p: 2,
  };
  return (
    <VideoFrameContext.Provider value={width[size]}>
      <Container id="video-container" sx={styles}>
        {peerVideos.map((peer, i) => (
          <VideoFrame key={i} peer={peer} />
        ))}
        {/* <VideoFrame key={i} peer={peer.peer} socketID={peer.socketID} /> */}
      </Container>
    </VideoFrameContext.Provider>
  );
}

export default VideoContainer;
