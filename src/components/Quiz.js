import { useReducer } from "react";
import Question from "./Question";
import Timer from "./Timer";

const quizReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_ANSWER":
      const isCorrect = action.answer === action.correctAnswer;
      return {
        ...state,
        selectedAnswer: action.answer,
        score: isCorrect ? state.score + 1 : state.score,
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        timeLeft: 30,
        selectedAnswer: null,
      };
    case "TICK":
      return { ...state, timeLeft: state.timeLeft - 1 };
    case "TIME_UP":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        timeLeft: 30,
        selectedAnswer: null,
      };
    default:
      return state;
  }
};

function Quiz({ questions, onQuizEnd }) {
  const [state, dispatch] = useReducer(quizReducer, {
    currentQuestion: 0,
    score: 0,
    timeLeft: 30,
    selectedAnswer: null,
  });

  const handleAnswer = (answer) => {
    dispatch({
      type: "SELECT_ANSWER",
      answer,
      correctAnswer: questions[state.currentQuestion].correctAnswer,
    });
    setTimeout(() => {
      if (state.currentQuestion + 1 < questions.length) {
        dispatch({ type: "NEXT_QUESTION" });
      } else {
        onQuizEnd(
          state.score +
            (answer === questions[state.currentQuestion].correctAnswer ? 1 : 0)
        );
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Timer timeLeft={state.timeLeft} dispatch={dispatch} />
      <Question
        question={questions[state.currentQuestion].question}
        options={questions[state.currentQuestion].options}
        onAnswer={handleAnswer}
        selectedAnswer={state.selectedAnswer}
      />
      <p className="text-lg">
        Question {state.currentQuestion + 1} of {questions.length}
      </p>
    </div>
  );
}

export default Quiz;
