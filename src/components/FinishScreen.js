import MoveButton from "./MoveButton";

function FinishScreen({ points, maxPossiblePoints, dispatch, highScore }) {
  const percentage = Math.ceil((points / maxPossiblePoints) * 100);
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "😊";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{points}</strong> ou of {maxPossiblePoints} (
        {percentage})%
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>

      <MoveButton type={"restart"} className="repeat" dispatch={dispatch}>
        Restart Quiz
      </MoveButton>
      <MoveButton type={"newQuiz"} className="repeat" dispatch={dispatch}>
        New Quiz
      </MoveButton>
    </>
  );
}

export default FinishScreen;
