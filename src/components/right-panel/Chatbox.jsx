import { Send, Close } from "@mui/icons-material";
import { TextField, Box, IconButton } from "@mui/material";
import { useContext } from "react";
import { TabControlContext } from "../../Context";
const Chatbox = ({ messages }) => {
  const { handleChange } = useContext(TabControlContext);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
    >
      <Box
        sx={{
          padding: 0.1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <Box fontSize="18px">Meeting Chat</Box>
        <IconButton component="label" onClick={handleChange}>
          <Close />
        </IconButton>
      </Box>
      <div>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Send message to everyone"
          multiline={true}
          fullWidth={true}
          maxRows="2"
          InputProps={{
            endAdornment: (
              <IconButton
                area-label="send"
                sx={{ marginLeft: "5px" }}
                color="primary"
              >
                <Send />
              </IconButton>
            ),
          }}
        />
      </div>
    </Box>
  );
};

export default Chatbox;
