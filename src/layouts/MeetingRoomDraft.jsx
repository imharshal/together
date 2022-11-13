import io from "socket.io-client";
import Peer from "simple-peer";
import { useParams } from "react-router-dom";
import { Box, Slide, Stack, Paper } from "@mui/material";
import { useContext, useRef, useState, useEffect } from "react";
import MeetingActions from "../components/meeting-room/MeetingActions";
import VideoContainer from "../components/meeting-room/VideoContainer";
import Controls from "../components/right-panel/Controls";
import RightContainer from "../components/right-panel/RightContainer";
import { PeersContext, TabControlContext } from "../Context";
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
    const persistedID = localStorage.getItem("together-user-id");
    const persistedMeetingID = localStorage.getItem("together-meeting-id");
    // socketRef.current = io.connect(import.meta.env.VITE_SOCKET_URL);
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL);
    console.log(import.meta.env.VITE_SOCKET_URL);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        if (persistedID && persistedMeetingID) {
        } else {
          console.log("joinRoom", socketRef.current);
          const userDetails = {
            username: "harshal",
            roomID,
            audio: true,
            video: true,
          };
          socketRef.current.emit("joinRoom", userDetails);
        }

        socketRef.current.on("allUsers", (users) => {
          const peers = [];
          users = users.filter((user) => user.id !== socketRef.current.id);
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
        socketRef.current.on("participantLeft", (userID) => {
          console.log("participant left", userID);
          let peers = peers.filter((id) => id !== userID);
          setPeers(peers);
          console.log("from participants left", peers);
          // let peerStreams = peersRef.current;
        });
        socketRef.current.on("participantJoined", (payload) => {
          console.log(socketRef.current);
          console.log("participantJoined", payload);
          const peerObj = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peerObj, //obj of {participantID, peer)
          });
          // console.log(peer);
          console.log(peersRef.current);
          // setPeers((users) => [...users, { ...peerObj }]);
        });

        socketRef.current.on("stream", (payload) => {
          console.log(peersRef.current);
          console.log("stream", payload);
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          console.log("item", item);
          item.peer.peer.signal(payload.signal);
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
      console.log("signal in create peer", signal);
      socketRef.current.emit("requestToJoin", {
        userToSignal,
        callerID,
        roomID,
        signal,
      });
    });

    return { participantId: callerID, peer };
  }

  function addPeer(incomingSignal, callerID, stream) {
    console.log("inside add peer");

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

    peer.on("signal", (signal) => {
      console.log("signal in add peer", signal);
      socketRef.current.emit("allowToJoin", { signal, callerID });
    });
    peer.on("error", (err) => console.log("error", err));

    peer.signal(incomingSignal);

    return { participantId: callerID, peer };
  }
  return (
    // <PeersContext.Provider>
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
                width: { sm: 3, md: 180 },
                height: { sm: 2, md: 120 },
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
    // </PeersContext.Provider>
  );
};

export default MeetingRoom;
