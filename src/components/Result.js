import Explanation from "./Explanation";

function Result({ score, highScore, questions, onRestart, onGoHome, topic }) {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
      <p className="text-xl text-gray-600 mb-2">
        Topic: {topic.replace(/-/g, " ")}
      </p>
      <p className="text-xl text-gray-600 mb-2">
        Your Score: {score} / {questions.length}
      </p>
      <p className="text-xl text-gray-600 mb-6">High Score: {highScore}</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Restart Quiz
        </button>
        <button
          onClick={onGoHome}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
      <Explanation questions={questions} />
    </div>
  );
}

export default Result;
