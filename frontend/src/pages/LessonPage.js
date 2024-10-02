import { React, useState } from "react";
import LessonStart from "../components/LessonStart";
import LessonChat from "../components/LessonChat";
import "../css/LessonPage.css";
import Navbar from "../components/Navbar";

function LessonPage() {
  const [lessonStatus, setLessonStatus] = useState("not-started");

  const handleStartClick = () => {
    setLessonStatus("chat");
  };

  return (
    <div>
      <Navbar />
      <div className="lesson-page">
        <div className="question-column">
          <h1>Main Point Questions in Legal Reasoning and Judicial Rulings</h1>
          <br />
          <div className="created-by">Created by John Smith</div>
          <div className="description">
            Learn to identify the main point or ruling in complex judicial
            opinions and legal briefs.
          </div>
          {lessonStatus === "not-started" && (
            <button
              type="button"
              className="start-button"
              onClick={handleStartClick}
            >
              Get Started
            </button>
          )}
        </div>

        {lessonStatus === "not-started" ? <LessonStart /> : <LessonChat />}
      </div>
    </div>
  );
}

export default LessonPage;
