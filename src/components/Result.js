import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Explanation from "./Explanation";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

function Result({
  score,
  questions,
  answers,
  onRestart,
  onGoHome,
  topic,
  user,
}) {
  const [showConfetti, setShowConfetti] = useState(false);
  const percentage = (score / questions.length) * 100;

  const getPerformance = () => {
    if (percentage <= 50) return { rank: 3, label: "Average", emoji: "😊" };
    if (percentage <= 75) return { rank: 2, label: "Good", emoji: "👍" };
    return { rank: 1, label: "Best", emoji: "🏆" };
  };

  const performance = getPerformance();

  useEffect(() => {
    const saveScore = async () => {
      if (user) {
        // Save quiz attempt
        await addDoc(collection(db, "scores"), {
          userId: user.uid,
          topic,
          score,
          totalQuestions: questions.length,
          percentage,
          timestamp: new Date(),
        });

        // Update high score
        const highScoreQuery = query(
          collection(db, "highScores"),
          where("userId", "==", user.uid),
          where("topic", "==", topic)
        );
        const highScoreSnapshot = await getDocs(highScoreQuery);
        if (
          highScoreSnapshot.empty ||
          highScoreSnapshot.docs[0].data().score < score
        ) {
          await setDoc(
            doc(db, "highScores", `${user.uid}_${topic}`),
            {
              userId: user.uid,
              topic,
              score,
            },
            { merge: true }
          );
        }
      }
    };
    saveScore();
  }, [score, questions.length, topic, user, percentage]);

  useEffect(() => {
    if (performance.rank <= 2) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [performance.rank]);

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-8 relative">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
      <p className="text-xl text-gray-600 mb-2 capitalize">
        Topic: {topic.replace(/-/g, " ").replace("comp ", "")}
      </p>
      <p className="text-xl text-gray-600 mb-2">
        Your Score: {score} / {questions.length} ({percentage.toFixed(1)}%)
      </p>
      <p className="text-xl text-gray-600 mb-6">
        Rank: {performance.rank} ({performance.label} {performance.emoji})
      </p>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Your Answers
        </h3>
        {answers.map((answer, index) => (
          <div key={index} className="mb-2">
            <p className="text-gray-800">{answer.question}</p>
            <p className={answer.isCorrect ? "text-green-600" : "text-red-600"}>
              Your Answer: {answer.selectedAnswer || "None"}{" "}
              {answer.isCorrect ? "✅" : "❌"}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
