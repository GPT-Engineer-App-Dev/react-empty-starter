import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Venues from "./pages/Venues.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/event/:id" element={<EventDetails />} />
        <Route exact path="/venues" element={<Venues />} />
      </Routes>
    </Router>
  );
}

export default App;