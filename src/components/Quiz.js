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
        answers: [
          ...state.answers,
          {
            question: action.question,
            selectedAnswer: action.answer,
            correctAnswer: action.correctAnswer,
            isCorrect,
          },
        ],
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
        answers: [
          ...state.answers,
          {
            question: action.question,
            selectedAnswer: null,
            correctAnswer: action.correctAnswer,
            isCorrect: false,
          },
        ],
      };
    default:
      return state;
  }
};

function Quiz({ questions, onQuizEnd, topic, user }) {
  const [state, dispatch] = useReducer(quizReducer, {
    currentQuestion: 0,
    score: 0,
    timeLeft: 30,
    selectedAnswer: null,
    answers: [],
  });

  const handleAnswer = (answer) => {
    dispatch({
      type: "SELECT_ANSWER",
      answer,
      correctAnswer: questions[state.currentQuestion].correctAnswer,
      question: questions[state.currentQuestion].question,
    });
    setTimeout(() => {
      if (state.currentQuestion + 1 < questions.length) {
        dispatch({ type: "NEXT_QUESTION" });
      } else {
        const finalScore =
          state.score +
          (answer === questions[state.currentQuestion].correctAnswer ? 1 : 0);
        const finalAnswers = [
          ...state.answers,
          {
            question: questions[state.currentQuestion].question,
            selectedAnswer: answer,
            correctAnswer: questions[state.currentQuestion].correctAnswer,
            isCorrect:
              answer === questions[state.currentQuestion].correctAnswer,
          },
        ];
        onQuizEnd(finalScore, finalAnswers);
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
        {topic.replace(/-/g, " ").replace("comp ", "")} Quiz
      </h2>
      <Timer
        timeLeft={state.timeLeft}
        dispatch={dispatch}
        question={questions[state.currentQuestion].question}
        correctAnswer={questions[state.currentQuestion].correctAnswer}
      />
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
