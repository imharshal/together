import React, { useState, useEffect, useRef } from "react";

import { Container, Stack, Box } from "@mui/material";
function Lobby({ setJoin }) {
  //   const [audioInputs, setAudioInputs] = useState();
  //   const [audioOutputs, setAudioOutputs] = useState();
  //   const [videoInputs, setVideoInputs] = useState();
  const [devices, setDevices] = useState();
  const videoRef = useRef();
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
    // if (!audioInputs || !videoInputs || !audioOutputs) {
    //   console.log("udpated");
    //   updateDeviceList();
    // }
    if (!devices) updateDeviceList();
  }, []);
  //   useEffect(() => {
  //     console.log("udpated directly", devices);
  //   }, [devices]);

  const handleJoinMeeting = () => {
    setJoin(true);
  };
  return (
    <Container>
      <Stack direction="row" spacing="3">
        <Box>
          <video ref={videoRef} width="50%" />
        </Box>
        <Box>
          <button onClick={handleJoinMeeting}> Join Meeting</button>
        </Box>
      </Stack>
    </Container>
  );
}

export default Lobby;
