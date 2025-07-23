import { useQuiz } from "../contexts/QuizContext";
import MoveButton from "./MoveButton";
import Timer from "./Timer";

function Footer() {
  const { answer } = useQuiz();
  return (
    <footer>
      <Timer />
      {answer !== null && <MoveButton />}
    </footer>
  );
}

export default Footer;
