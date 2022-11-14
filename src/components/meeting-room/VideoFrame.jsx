import { Paper } from "@mui/material";
import React, { useContext, useRef, useEffect, useState } from "react";
import { PeersContext, VideoFrameContext } from "../../Context";
function VideoFrame({ peer }) {
  const size = useContext(VideoFrameContext);
  console.log("from video frame", peer);
  // const { peers, setPeers } = useContext(PeersContext);
  const [destroyed, setDestroyed] = useState();
  const ref = useRef();
  useEffect(() => {
    peer.on("stream", (stream) => {
      // console.log("got stream for ", peer.socketID);
      ref.current.srcObject = stream;
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
          // height: "max-content",
          flexShrink: 0,
          flexBasis: {
            xs: `calc(50% - 10px)`,
            sm: `calc(25% - 10px)`,
            md: `calc(${size}% - 10px)`,
          },
          // objectFit: "cover",
          borderRadius: 3,
          overflow: "hidden",
          lineHeight: 0,
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
            maxHeight: "90vh",
            padding: 0,
            margin: 0,
          }}
        ></video>
      </Paper>
    )
  );
}

export default VideoFrame;
