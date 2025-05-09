const topics = [
  {
    id: "light",
    name: "Light - Reflection and Refraction",
    description: "Explore concepts of mirrors, lenses, and refraction laws.",
  },
  {
    id: "electricity",
    name: "Electricity",
    description: "Learn about circuits, resistance, and power.",
  },
  {
    id: "magnetic",
    name: "Magnetic Effects of Electric Current",
    description: "Understand magnetic fields and electromagnetic induction.",
  },
];

function Home({ onSelectTopic }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center sm:text-5xl">
        CBSE Class 10 Physics Quiz
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full">
        {topics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => onSelectTopic(topic.id)}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:scale-105 transform transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {topic.name}
            </h2>
            <p className="text-gray-600">{topic.description}</p>
            <div className="mt-4 text-blue-600 font-medium">
              Start Quiz &rarr;
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
