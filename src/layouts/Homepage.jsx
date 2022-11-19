import {useEffect} from 'react'
import Button from "@mui/material/Button";
import { Container, Grid, TextField, Box, Typography } from "@mui/material";

import { Keyboard, VideoCall } from "@mui/icons-material";
import { v1 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import onlineMeetingImage from "../assets/online-meeting.png";
function Homepage() {
  let navigate = useNavigate();
  
  function create() {
    const id = uuid();
    navigate(`/room/${id}`);
  }
  useEffect(() => { fetch('https://together-server.onrender.com') }, [])
  return (
    <Container>
      <Box>
        <Typography variant="h4" p={2} m={0}>
          Together
        </Typography>
      </Box>
      <Box
        sx={{
          display: { sm: "block", md: "flex" },
          paddingTop: { md: 10 },
          flexDirecation: { sm: "column", md: "row" },
        }}
      >
        <Box>
          <Box component="h1" sx={{ fontSize: { md: 60 }, m: 0 }}>
            Enjoy premium meeting experience for free{" "}
          </Box>
          <Box
            sx={{
              display: { sm: "block", md: "flex" },
              alignItems: "stretch",
              gap: "40px",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{ textTransform: "none" }}
              startIcon={<VideoCall />}
              onClick={create}
            >
              Create Meeting
            </Button>
            <TextField
              variant="outlined"
              placeholder="Meeting code"
              InputProps={{
                startAdornment: <Keyboard sx={{ marginRight: "5px" }} />,
                endAdornment: <Button variant="text">Join</Button>,
              }}
              sx={{ marginTop: { sm: "10px 0", md: 0 } }}
            />
          </Box>
        </Box>
        <Box sx={{ padding: { md: 0, sm: 40 } }}>
          <img
            src={onlineMeetingImage}
            width="100%"
            alt="online-meeting"
            height="auto"
          />
        </Box>
      </Box>
    </Container>
  );
}

export default Homepage;
