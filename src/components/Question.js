function Question({ question, options, onAnswer, selectedAnswer }) {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{question}</h2>
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className={`w-full p-3 rounded-lg text-left ${
              selectedAnswer === option
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
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
