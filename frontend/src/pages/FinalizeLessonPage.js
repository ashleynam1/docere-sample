import React, { useState } from "react";
import "../css/CreateLessonPage.css";
import Navbar from "../components/Navbar";
import ProfileHeader from "../components/ProfileHeader";
import { useLocation, useNavigate } from "react-router-dom";

function CreateLessonPage() {
  const location = useLocation();
  const { lesson } = location.state || {};
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log(lesson);
    e.preventDefault();
  };

  const goBack = (e) => {
    navigate("/create-lesson");
  };

  return (
    <div>
      <Navbar />
      <ProfileHeader />

      {/* Create lesson container */}
      <div className="create-lesson-container">
        <h2>Lesson Summary</h2>

        <form className="create-lesson-form" onSubmit={handleSubmit}>
          <div className="plan-help">
            Here's an outline of the topics that will be covered in this lesson
            based on the files you uploaded. <br /> Edit or add things as needed
            to customize your lesson.
          </div>

          <div className="form-group">
            <textarea
              placeholder="Begin creating your lesson plan..."
              required
              style={{ height: "300px" }}
            />
          </div>

          <div className="form-buttons">
            <button type="button" className="cancel-btn">
              <img src="images/sparkle.png" height={"20px"} /> &nbsp; Watch Demo
            </button>
            <button type="button" className="cancel-btn" onClick={goBack}>
              Back
            </button>
            <button type="submit" className="next-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateLessonPage;
