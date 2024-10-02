import React from "react";
import HomePage from "./pages/HomePage.js";
import CreateLessonPage from "./pages/CreateLessonPage.js";
import FinalizeLessonPage from "./pages/FinalizeLessonPage.js";
import LessonPage from "./pages/LessonPage.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./css/Global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-lesson" element={<CreateLessonPage />} />
        <Route path="/finalize-lesson" element={<FinalizeLessonPage />} />
        <Route path="/lesson" element={<LessonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
