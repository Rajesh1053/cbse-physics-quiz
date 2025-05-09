import { useEffect } from "react";

function Timer({ timeLeft, dispatch, question, correctAnswer }) {
  useEffect(() => {
    if (timeLeft <= 0) {
      dispatch({ type: "TIME_UP", question, correctAnswer });
      return;
    }
    const timer = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, dispatch, question, correctAnswer]);

  return (
    <div className="text-xl font-bold text-red-600 mb-4 sm:text-2xl">
      Time Left: {timeLeft}s
    </div>
  );
}

export default Timer;
