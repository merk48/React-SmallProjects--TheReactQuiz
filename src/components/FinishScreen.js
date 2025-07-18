function FinishScreen({ points, maxPossiblePoints }) {
  return (
    <p className="result">
      You scored <strong>{points}</strong> ou of {maxPossiblePoints} (
      {Math.ceil((points / maxPossiblePoints) * 100)})%
    </p>
  );
}

export default FinishScreen;
