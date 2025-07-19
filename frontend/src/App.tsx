import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "@/components/landing/Topbar";
import LandingPage from "./pages/LandingPage";
import BookingPage from "./pages/BookingPage";
import SpaceDetailPage from "./pages/SpaceDetailPage";
import OwnerLandingPage from "./pages/OwnerLandingPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Topbar />
        <main className="pt-16">
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route
              path="/booking/space/:spaceId"
              element={<SpaceDetailPage />}
            />

            {/* Owner Routes */}
            <Route path="/owner" element={<OwnerLandingPage />} />
            <Route
              path="/owner/list-space"
              element={
                <div className="p-8 text-center">
                  List Space Page - Coming Soon
                </div>
              }
            />
            <Route
              path="/owner/dashboard"
              element={
                <div className="p-8 text-center">
                  Owner Dashboard - Coming Soon
                </div>
              }
            />
            <Route
              path="/owner/analytics"
              element={
                <div className="p-8 text-center">
                  Analytics Page - Coming Soon
                </div>
              }
            />
            <Route
              path="/owner/support"
              element={
                <div className="p-8 text-center">
                  Support Page - Coming Soon
                </div>
              }
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
