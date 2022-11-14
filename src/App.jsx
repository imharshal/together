import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import MeetingRoom from "./layouts/MeetingRoom";

import CssBaseline from "@mui/material/CssBaseline";
import Homepage from "./layouts/Homepage";
import Lobby from "./layouts/Lobby";
import Meeting from "./layouts/Meeting";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/join" exact element={<Lobby />} />
          <Route path="/room/:roomID" element={<Meeting />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
