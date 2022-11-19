import React, { useState, useEffect, useRef } from "react";

import { Container, Stack, Box } from "@mui/material";
import ActionButtons from "../components/lobby/ActionButtons";
function Lobby({ setJoin, roomID, setUserDetails }) {
  //   const [audioInputs, setAudioInputs] = useState();
  //   const [audioOutputs, setAudioOutputs] = useState();
  //   const [videoInputs, setVideoInputs] = useState();

  const [devices, setDevices] = useState();
  const [username, setUsername] = useState("");
  const videoRef = useRef();
  const [audio, setAudio] = useState();
  const [video, setVideo] = useState();

  const updateDeviceList = () => {
    navigator.mediaDevices.enumerateDevices().then((mediaDevices) => {
      let audioIn = [],
        audioOut = [],
        videoIn = [];
      mediaDevices.forEach(function (device) {
        let [kind, type, direction] = device.kind.match(/(\w+)(input|output)/i);
        if (type === "audio") {
          direction === "input" ? audioIn.push(device) : audioOut.push(device);
        } else if (type === "video") {
          videoIn.push(device);
        }
      });

      setDevices({ videoIn, audioIn, audioOut });
    });
  };
  useEffect(() => {
    navigator.mediaDevices.ondevicechange = (event) => {
      console.log(event);
      updateDeviceList();
    };

    if (!devices) updateDeviceList();

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      });
  }, []);

  const handleJoinMeeting = () => {
    const userDetails = {
      username,
      roomID,
      audio: !audio,
      video: !video,
    };
    setUserDetails(userDetails);
    setJoin(true);
  };

  return (
    <Container>
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <Box sx={{ m: 3, position: "relative" }}>
          <video width="100%" muted autoPlay ref={videoRef} />
          <ActionButtons
            audio={audio}
            video={video}
            setAudio={setAudio}
            setVideo={setVideo}
          />
        </Box>
        <Box>
          <input type="text" onBlur={(e) => setUsername(e.target.value)} />
          <button onClick={handleJoinMeeting}> Join Meeting</button>
        </Box>
      </Stack>
    </Container>
  );
}

export default Lobby;
