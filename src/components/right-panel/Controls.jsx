import React, { useContext } from "react";
import { Radio, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Box, Stack } from "@mui/material";
import { Chat, PeopleAlt } from "@mui/icons-material";
import ControlButtonGroup from "../utilities/ControlButtonGroup";
import { TabControlContext } from "../../Context";

function Controls() {
  const { tab, handleChange } = useContext(TabControlContext);
  return (
    <Box display="flex" justifyContent="end" marginRight={18}>
      <ControlButtonGroup
        role="group"
        color="primary"
        value={tab}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="people" aria-label="people">
          <PeopleAlt />
        </ToggleButton>
        <ToggleButton value="chat" aria-label="chat">
          <Chat />
        </ToggleButton>
        {/* <ToggleButton value="activities" aria-label="activities">
          <PeopleAlt />
        </ToggleButton> */}
      </ControlButtonGroup>
    </Box>
  );
}

export default Controls;
