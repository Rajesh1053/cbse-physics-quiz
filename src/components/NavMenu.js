import { useState } from "react";

function NavMenu({ mainTopics }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTopicClick = (topicName) => {
    const element = document.getElementById(
      topicName.toLowerCase().replace(/ /g, "-")
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors sm:hidden"
      >
        Menu
      </button>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } sm:flex sm:items-center sm:gap-4 absolute sm:static top-12 right-0 bg-white sm:bg-transparent shadow-lg sm:shadow-none rounded-lg p-4 sm:p-0 z-20 w-48 sm:w-auto`}
      >
        {mainTopics.map((topic) => (
          <button
            key={topic.name}
            onClick={() => handleTopicClick(topic.name)}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors sm:w-auto"
          >
            {topic.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NavMenu;
