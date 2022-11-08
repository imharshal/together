import io from "socket.io-client";
import Peer from "simple-peer";
import { useParams } from "react-router-dom";
import { Box, Slide, Stack, Paper } from "@mui/material";
import { useContext, useRef, useState, useEffect } from "react";
import MeetingActions from "../components/meeting-room/MeetingActions";
import VideoContainer from "../components/meeting-room/VideoContainer";
import Controls from "../components/right-panel/Controls";
import RightContainer from "../components/right-panel/RightContainer";
import { TabControlContext } from "../Context";
const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};
const MeetingRoom = () => {
  let params = useParams();
  const [tab, setTab] = useState("chat");
  const handleChange = (event, tab) => {
    setTab(tab);
  };
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = params.roomID;

  useEffect(() => {
    socketRef.current = io.connect("https://together-server.onrender.com/");
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          console.log(users);
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });
          console.log(peer);
          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }
  return (
    <TabControlContext.Provider value={{ tab, handleChange }}>
      <Box height="100vh" maxWidth="100vw" overflow="hidden">
        <Stack direction="row" height="100vh" maxWidth="100vw">
          <Box
            flexGrow="100"
            width="100%"
            alignItems="center"
            pb={1}
            mb={6}
            position="relative"
          >
            <Paper
              sx={{
                zIndex: 1,
                width: 300,
                // flexShrink: 0,
                // flexBasis: `calc(${size}% - 10px)`,
                // objectFit: "cover",
                borderRadius: 3,
                overflow: "hidden",
                position: "absolute",
                right: 10,
                bottom: 10,
              }}
            >
              <video
                muted
                ref={userVideo}
                playsInline
                autoPlay
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Paper>

            <VideoContainer videos={peers} />
          </Box>
          <Slide direction="left" in={tab ? true : false}>
            <RightContainer />
          </Slide>
        </Stack>
        <Box position="sticky" bottom={0}>
          <MeetingActions />
        </Box>
      </Box>
    </TabControlContext.Provider>
  );
};

export default MeetingRoom;
