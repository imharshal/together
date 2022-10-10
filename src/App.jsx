import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import MeetingRoom from "./layouts/MeetingRoom";
import CssBaseline from "@mui/material/CssBaseline";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box maxHeight="100vh" overflow="hidden">
        <MeetingRoom />
      </Box>
    </ThemeProvider>
  );
}

export default App;
