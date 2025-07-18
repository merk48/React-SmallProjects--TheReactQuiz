import Options from "./Options";

function Quesion({ question, index, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="question">
      <h3>{question.question}</h3>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Quesion;
