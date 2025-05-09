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

function Quiz({ questions, onQuizEnd, topic }) {
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
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
        {topic.replace(/-/g, " ")} Quiz
      </h2>
      <Timer timeLeft={state.timeLeft} dispatch={dispatch} />
      <Question
        question={questions[state.currentQuestion].question}
        options={questions[state.currentQuestion].options}
        onAnswer={handleAnswer}
        selectedAnswer={state.selectedAnswer}
      />
      <p className="text-lg text-gray-600 mt-4">
        Question {state.currentQuestion + 1} of {questions.length}
      </p>
    </div>
  );
}

export default Quiz;
