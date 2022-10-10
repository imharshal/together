import { Box, Slide, Stack } from "@mui/material";
import { useContext, useRef, useState } from "react";
import MeetingActions from "../components/meeting-room/MeetingActions";
import VideoContainer from "../components/meeting-room/VideoContainer";
import Controls from "../components/right-panel/Controls";
import RightContainer from "../components/right-panel/RightContainer";
import { TabControlContext } from "../Context";
const MeetingRoom = () => {
  const containerRef = useRef(null);
  const [tab, setTab] = useState("chat");
  const handleChange = (event, tab) => {
    setTab(tab);
  };
  return (
    <TabControlContext.Provider value={{ tab, handleChange }}>
      <Stack direction="row" ref={containerRef} height="100vh" maxWidth="100vw">
        <Box flexGrow="100" padding={0}>
          <VideoContainer />
        </Box>
        <Slide direction="left" in={tab ? true : false}>
          <RightContainer />
        </Slide>
      </Stack>
      <Box position="sticky" bottom={0}>
        <MeetingActions />
      </Box>
    </TabControlContext.Provider>
  );
};

export default MeetingRoom;
