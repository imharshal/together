import React, { useContext, useRef, useState, useEffect } from "react";
import Peer from "simple-peer";
import { useParams } from "react-router-dom";
import { Box, Slide, Stack, Paper } from "@mui/material";
import MeetingActions from "../components/meeting-room/MeetingActions";
import VideoContainer from "../components/meeting-room/VideoContainer";
import Controls from "../components/right-panel/Controls";
import RightContainer from "../components/right-panel/RightContainer";
import { PeersContext, TabControlContext } from "../Context";
const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};
const MeetingRoom = React.memo(({ socket }) => {
  let params = useParams();
  const [tab, setTab] = useState("chat");
  const handleChange = (event, tab) => {
    setTab(tab);
  };
  const [peers, setPeers] = useState(new Map());
  const userVideo = useRef();
  const roomID = params.roomID;
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    console.log(import.meta.env.VITE_SOCKET_URL);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;

        const userDetails = {
          username: "harshal",
          roomID,
          audio: true,
          video: true,
        };
        console.log(socket.id);
        socket.emit("joinRoom", userDetails);

        socket.on("allUsers", (users) => {
          const peersMap = peers; // copying state peers
          users = users.filter((id) => id !== socket.id);
          // console.log("allUsers>>>", users);
          users.forEach((userID) => {
            const peer = createPeer(userID, socket.id, stream);

            if (!peersMap.has(userID)) peersMap.set(userID, peer); //creating new state for peers
          });
          setPeers(peersMap); // setting peers with all users
          forceUpdate();
        });

        //this event triggers when any participant left the room
        socket.on("participantLeft", (userID) => {
          let peer = peers.get(userID);
          peer.destroy();
          console.log("lefted peer", peer);

          // setPeers((prevPeers) => {
          //   let peers = prevPeers;
          //   peers.delete(userID);
          //   return peers;
          // });
          console.log("participant left", userID, "remaining", peers);
          forceUpdate();
        });

        //this event triggers when new participant join the room
        socket.on("participantJoined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          setPeers((prevPeers) => prevPeers.set(peer.socketID, peer));
          console.log("participantJoined", payload, "participants", peers);
          forceUpdate();
        });

        socket.on("stream", (payload) => {
          const item = peers.get(payload.id);
          item.signal(payload.signal);
          forceUpdate();
        });
      });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      reconnectTimer: 100,
      iceTransportPolicy: "relay",
      sdpSemantics: "unified-plan",
      config: {
        iceServers: [
          {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
          {
            urls: "turn:openrelay.metered.ca:443",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
        ],
      },
      stream,
    });

    peer.on("signal", (signal) => {
      console.log("signal in create peer");
      socket.emit("requestToJoin", {
        userToSignal,
        callerID,
        roomID,
        signal,
      });
    });
    // console.log("inside create peer", peer);
    peer.socketID = callerID;

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      reconnectTimer: 100,
      iceTransportPolicy: "relay",
      config: {
        iceServers: [
          {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
          {
            urls: "turn:openrelay.metered.ca:443",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
        ],
      },
      stream,
    });
    // console.log("inside add peer", peer);

    peer.on("signal", (signal) => {
      socket.emit("allowToJoin", { signal, callerID });
    });
    peer.on("disconnect", (err) => console.log("disconnect", err));

    peer.signal(incomingSignal);
    peer.socketID = callerID;
    return peer;
  }

  useEffect(() => {
    console.log("useEffect peers changed", peers);
  });
  return (
    <PeersContext.Provider value={{ peers, setPeers }}>
      <TabControlContext.Provider value={{ tab, handleChange }}>
        <Box>
          <Stack
            flexGrow="100"
            direction="row"
            height="100vh"
            maxWidth="100vw"
            position="relative"
          >
            <Box
              sx={{
                // flexGrow: "100",
                width: "100%",
                alignItems: "center",
                pb: 1,
                mb: 6,
                position: "relative",
              }}
            >
              <Paper
                sx={{
                  width: { xs: 120, sm: 120, md: 180 },
                  height: { xs: 90, sm: 90, md: 120 },
                  zIndex: 1,
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "absolute",
                  right: 10,
                  bottom: 20,
                  lineHeight: 0,
                }}
              >
                <video
                  muted
                  ref={userVideo}
                  playsInline
                  autoPlay
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </Paper>

              <VideoContainer videos={peers} />
            </Box>
            <Slide direction="left" in={tab ? true : false}>
              <RightContainer />
            </Slide>
          </Stack>
          <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
            <MeetingActions />
          </Box>
        </Box>
      </TabControlContext.Provider>
    </PeersContext.Provider>
  );
}, []);

export default MeetingRoom;
