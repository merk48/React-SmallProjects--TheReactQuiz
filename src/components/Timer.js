import { useEffect } from "react";

function Timer({ secondsRemaining, dispatch }) {
  const minutes = Math.floor(secondsRemaining / 60)
    .toString()
    .padStart(2, 0);
  const seconds = (secondsRemaining % 60).toString().padStart(2, 0);
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {minutes}:{seconds}
    </div>
  );
}

export default Timer;
