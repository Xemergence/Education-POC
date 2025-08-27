import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Navbar from "./components/landing/Navbar";

// Lazy load routes
const Dashboard = lazy(() => import("./routes/dashboard"));
const Admin = lazy(() => import("./routes/admin"));
const Courses = lazy(() => import("./routes/courses"));
const Features = lazy(() => import("./routes/features"));
const Pricing = lazy(() => import("./routes/pricing"));
const About = lazy(() => import("./routes/about"));

function App() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="pt-20 flex justify-center items-center min-h-screen">
            <p>Loading...</p>
          </div>
        }
      >
        <div className="pt-20">
          {/* Add padding for the fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Suspense>
    </>
  );
}

export default App;
