import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <Outlet />
    </Container>
  );
}

export default App;
