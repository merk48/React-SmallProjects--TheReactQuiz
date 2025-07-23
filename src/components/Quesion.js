import { useQuiz } from "../contexts/QuizContext";
import Loader from "./Loader";
import Options from "./Options";

function Quesion() {
  const { currentQuestion } = useQuiz();

  if (!currentQuestion) return <Loader />;

  return (
    <div className="question">
      <h3>{currentQuestion.question}</h3>
      <Options />
    </div>
  );
}

export default Quesion;
