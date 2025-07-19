import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "@/components/landing/Topbar";
import LandingPage from "./pages/LandingPage";
import BookingPage from "./pages/BookingPage";
import SpaceDetailPage from "./pages/SpaceDetailPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Topbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route
              path="/booking/space/:spaceId"
              element={<SpaceDetailPage />}
            />
            {/* Fallback route */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
