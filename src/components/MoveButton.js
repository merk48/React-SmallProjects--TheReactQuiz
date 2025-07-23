import { useQuiz } from "../contexts/QuizContext";

function MoveButton({ children, type, className }) {
  const { dispatch, index, questions, status } = useQuiz();
  const numQuestions = questions.length;

  const isActive = status === "active" && type === undefined;
  const actionType = isActive
    ? index < numQuestions - 1
      ? "nextQuestion"
      : "finish"
    : type;

  const buttonLabel = isActive
    ? index < numQuestions - 1
      ? "Next"
      : "Show Score"
    : children;

  const buttonClass = `btn btn-ui ${
    className ?? (index < numQuestions - 1 ? "next" : "finish")
  }`;

  return (
    <button
      className={buttonClass}
      onClick={() => dispatch({ type: actionType })}
    >
      {buttonLabel}
    </button>
  );
}

export default MoveButton;
