import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "@Pages/home";

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
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
