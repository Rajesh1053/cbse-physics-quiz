function Home({ mainTopics, onSelectTopic }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center sm:text-5xl">
        Interactive Quiz App
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
        Test your knowledge across various subjects and topics for school and
        competitive exams.
      </p>
      {mainTopics.map((mainTopic) => (
        <div
          key={mainTopic.name}
          id={mainTopic.name.toLowerCase().replace(/ /g, "-")}
          className="w-full max-w-5xl mb-12 scroll-mt-20"
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            {mainTopic.name}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mainTopic.subTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => onSelectTopic(topic.id)}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:scale-105 transform transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {topic.name}
                </h3>
                <p className="text-gray-600">{topic.description}</p>
                <div className="mt-4 text-blue-600 font-medium">
                  Start Quiz →
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
