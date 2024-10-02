import React, { useState } from "react";
import "../css/CreateLessonPage.css";
import Navbar from "../components/Navbar";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import axios from "axios";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

function CreateLessonPage() {
  const [lesson, setLesson] = useState("");
  const [fileChanging, setFileChanging] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFileChanging(true);
    if (!file) return;

    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileExtension === "txt") {
      // Handle text files
      const reader = new FileReader();
      reader.onload = () => {
        setLesson(lesson + "\n" + reader.result);
        setFileChanging(false);
      };
      reader.readAsText(file);
    } else if (fileExtension === "docx") {
      // Handle DOCX files using mammoth
      const arrayBuffer = await file.arrayBuffer();
      mammoth
        .extractRawText({ arrayBuffer: arrayBuffer })
        .then((result) => {
          setLesson(lesson + "\n" + result.value); // The raw text content of the DOCX file
          setFileChanging(false);
        })
        .catch((err) => console.error("Error processing DOCX file:", err));
    } else if (fileExtension === "pdf") {
      // Handle PDF files using pdfjs-dist
      const reader = new FileReader();
      reader.onload = async function () {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let textContent = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const text = await page.getTextContent();
          text.items.forEach((item) => {
            textContent += item.str + " ";
          });
        }
        setLesson(lesson + "\n" + textContent);
        setFileChanging(false);
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.log(
        "Unsupported file type. Please upload a .pdf, .docx, or .txt file."
      );
      setFileChanging(false);
    }
  };

  const aiAugmentLessonContents = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/ai_augment_uploaded_lesson_contents/",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error in aiAugmentLessonContents:", error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    while (fileChanging) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    const lessonData = {
      topic: e.target.elements.lessonName.value,
      question: e.target.elements.taskDescription.value,
      lesson: lesson,
    };

    try {
      const result = await aiAugmentLessonContents(lessonData);
      setLoading(false);

      setLesson(result);

      navigate("/finalize-lesson", {
        state: {
          topic: e.target.elements.lessonName.value,
          question: e.target.elements.taskDescription.value,
          answer: result,
          privacy: e.target.elements.privacy.value,
          lessonLength: e.target.elements.lessonLength.value,
          answerVisible: e.target.elements.answerVisible.value,
        },
      });

      console.log("Augmented Lesson Contents:", result);
    } catch (error) {
      console.error("Error during form submission:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <ProfileHeader />

      <div className="create-lesson-container">
        {/* Create lesson container */}
        <h2>Create Lesson</h2>

        <form className="create-lesson-form" onSubmit={handleSubmit}>
          <div className="form-columns">
            {/* Left column - form fields */}
            <div className="left-column">
              <div className="form-group">
                <label>Lesson Name</label>
                <input
                  type="text"
                  name="lessonName"
                  placeholder="e.g. Photosynthesis and Cellular Respiration"
                  required
                />
              </div>

              <div className="form-group">
                <label>Task Description</label>
                <textarea
                  name="taskDescription"
                  placeholder="e.g. Explain the processes by which plants convert sunlight into energy..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Lesson Length</label>
                <select name="lessonLength">
                  <option>30 mins ~ 1 hour</option>
                  <option>1 hour ~ 2 hours</option>
                  <option>2 hours ~ 3 hours</option>
                </select>
              </div>

              <div className="form-group">
                <label>Answer Visible After Completion</label>
                <select name="answerVisible">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="form-group">
                <label>Privacy</label>
                <div className="privacy-options">
                  <label>
                    <input
                      type="radio"
                      name="privacy"
                      value="public"
                      defaultChecked
                    />{" "}
                    Public (anyone can join)
                  </label>
                  <label>
                    <input type="radio" name="privacy" value="class" /> Students
                    in your class
                  </label>
                  <label>
                    <input type="radio" name="privacy" value="private" />{" "}
                    Private (only you)
                  </label>
                </div>
              </div>
            </div>

            {/* Right column - file upload and buttons */}
            <div className="right-column">
              <div className="form-group">
                <label>Lesson Content</label>
                <div
                  className="file-upload-box"
                  onClick={() => document.getElementById("file-input").click()}
                >
                  <input
                    id="file-input"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.docx,.txt"
                    style={{ display: "none" }}
                  />
                  <img src="images/upload.png" alt="Docere Logo" />
                  <p>
                    (Optional) Drag file here or select a file <br /> We'll
                    create a lesson plan together before finishing <br />{" "}
                    Accepted file types: .pdf, .docx, .txt
                  </p>
                </div>
              </div>

              <div className="form-buttons">
                <button type="button" className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="next-btn">
                  Next
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-container">
            <div className="loading-message">Loading your lesson plan...</div>
            <div className="loading-subtext">Give us a second</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateLessonPage;
