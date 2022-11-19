import { Paper, Box, Typography } from "@mui/material";
import React, { useContext, useRef, useEffect, useState } from "react";
import { PeersContext, VideoFrameContext } from "../../Context";
import NamedAvatar from "../utilities/NamedAvatar";
function VideoFrame({ peer }) {
  const size = useContext(VideoFrameContext);
  const [videoStreaming, setVideoStreaming] = useState(true);
  console.log("from video frame", peer);
  // const { peers, setPeers } = useContext(PeersContext);
  const [destroyed, setDestroyed] = useState();
  const ref = useRef();
  const { username, video, audio } = peer.userDetails;

  useEffect(() => {
    console.log(" peer from user details", peer.userDetails);
    peer.on("stream", (stream) => {
      // console.log("got stream for ", peer.socketID);
      ref.current.srcObject = stream;
    });
    peer.on("error", (err) => {
      console.log("error in peer", peer.socketID, err);
    });
    peer.on("close", () => {
      // console.log("loose stream for ", peer.socketID);
      setDestroyed(true);
      // setPeers((prevPeers) => {
      //   let peers = prevPeers;
      //   peers.delete(socketID);
      //   return peers;
      // });
    });
  }, []);

  return (
    !destroyed && (
      <Paper
        sx={{
          width: "100%",
          height: "max-content",
          position: "relative",
          flexShrink: 1,
          flexBasis: {
            xs: `calc(50% - 10px)`,
            sm: `calc(25% - 10px)`,
            md: `calc(${size}% - 10px)`,
          },
          // objectFit: "cover",
          borderRadius: 1,
          overflow: "hidden",
          lineHeight: 0,
          position: "relative",
          maxHeight: "95%",
        }}
      >
        <video
          id={peer.socketID}
          playsInline
          autoPlay
          ref={ref}
          style={{
            objectFit: "cover",
            width: "100%",
            // height: "fill",
            padding: 0,
            margin: 0,
            zIndex: 3,
          }}
        />
        {/* <NamedAvatar
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            fontSize: 40,
            transform: "translate(-50%, -50%)",
          }}
          name={username}
        /> */}
        <Typography
          sx={{
            position: "absolute",
            minWidth: 50,
            zIndex: 1,
            padding: "2px 5px",
            bottom: 0,
            margin: 1,
            backgroundColor: "#121212",
            borderRadius: 1,
            fontSize: ".8rem",
          }}
        >
          {username}
        </Typography>
      </Paper>
    )
  );
}

export default VideoFrame;
