function Explanation({ questions }) {
  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-2xl font-bold">Answer Explanations</h2>
      {questions.map((q, index) => (
        <div key={index} className="p-4 bg-gray-100 rounded-lg">
          <p className="font-semibold">{q.question}</p>
          <p>
            <strong>Correct Answer:</strong> {q.correctAnswer}
          </p>
          <p>
            <strong>Explanation:</strong> {q.explanation}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Explanation;
