import { useEffect } from "react";

function Timer({ timeLeft, dispatch }) {
  useEffect(() => {
    if (timeLeft <= 0) {
      dispatch({ type: "TIME_UP" });
      return;
    }
    const timer = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, dispatch]);

  return (
    <div className="text-xl font-bold text-red-500">Time Left: {timeLeft}s</div>
  );
}

export default Timer;
