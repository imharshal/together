import Button from "@mui/material/Button";
import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Keyboard, VideoCall } from "@mui/icons-material";

function Homepage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md="6">
        <Box component="h1" sx={{ fontSize: "60px" }}>
          Enjoy premium video conferencing experience for free{" "}
        </Box>
        <Box sx={{ display: "flex", alignItems: "stretch", gap: "40px" }}>
          <Button
            variant="contained"
            size="large"
            sx={{ textTransform: "none" }}
            startIcon={<VideoCall />}
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
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md="6">
        {" "}
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius rerum
        repudiandae ex harum deserunt debitis mollitia eligendi labore sed,
        pariatur possimus sit quod porro exercitationem? Facere quisquam
        accusantium eius voluptatum.
      </Grid>
    </Grid>
  );
}

export default Homepage;
