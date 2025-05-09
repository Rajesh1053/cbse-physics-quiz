function Explanation({ questions }) {
  return (
    <div className="mt-8 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Answer Explanations
      </h2>
      <div className="space-y-4">
        {questions.map((q, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="font-semibold text-gray-800">{q.question}</p>
            <p className="text-gray-600">
              <strong>Correct Answer:</strong> {q.correctAnswer}
            </p>
            <p className="text-gray-600">
              <strong>Explanation:</strong> {q.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explanation;
