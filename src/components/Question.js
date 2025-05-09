function Question({ question, options, onAnswer, selectedAnswer }) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:text-2xl">
        {question}
      </h2>
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className={`w-full p-4 text-left rounded-lg shadow-md transition-all duration-200 ${
              selectedAnswer === option
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            disabled={!!selectedAnswer}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
