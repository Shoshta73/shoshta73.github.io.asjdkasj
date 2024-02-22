import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "@Pages/home";
import Projects from "@Pages/projects";

import Footer from "@Components/footer";
import Navbar from "@Components/navbar";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className="app">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
