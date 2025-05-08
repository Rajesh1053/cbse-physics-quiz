import Explanation from "./Explanation";

function Result({ score, highScore, questions, onRestart }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">Quiz Completed!</h2>
      <p className="text-xl">
        Your Score: {score} / {questions.length}
      </p>
      <p className="text-xl">High Score: {highScore}</p>
      <button
        onClick={onRestart}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Restart Quiz
      </button>
      <Explanation questions={questions} />
    </div>
  );
}

export default Result;
