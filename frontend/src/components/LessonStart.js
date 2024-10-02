import "../css/LessonStart.css";

function LessonStart() {
  return (
    <div className="how-it-works">
      <div className="how-it-works-title">How It Works</div>
      <div className="explain-row">
        <div className="explain-bubble">
          <h3>Teach</h3>
          <p>
            Docere will ask some questions covering this topic, and you will
            answer as if you’re teaching the topic to Docere.
          </p>
        </div>
        <div className="explain-bubble">
          <h3>Analyze</h3>
          <p>
            Docere will analyze the strengths and weaknesses in your topic
            understanding and tell you where you need to target.
          </p>
        </div>
        <div className="explain-bubble">
          <h3>Understand</h3>
          <p>
            Docere will go over how to strengthen your understanding, and you
            can restart the lesson with a focus on these targets.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LessonStart;
