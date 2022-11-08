import React from "react";
import Controls from "../right-panel/Controls";
import { TabControlContext } from "../../Context";
import ControlButtonGroup from "../utilities/ControlButtonGroup";
import { Stack, ToggleButton } from "@mui/material";
import { Mic, Videocam } from "@mui/icons-material";
function MeetingActions() {
  return (
    <Stack direction="row" justifyContent="center">
      <ControlButtonGroup
        role="group"
        color="primary"
        // value={tab}
        exclusive
        // onChange={handleChange}
      >
        <ToggleButton value="people" aria-label="people">
          <Mic />
        </ToggleButton>
        <ToggleButton value="people" aria-label="people">
          <Videocam />
        </ToggleButton>
      </ControlButtonGroup>
      <Controls />
    </Stack>
  );
}

export default MeetingActions;
