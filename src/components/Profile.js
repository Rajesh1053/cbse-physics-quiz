import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";

function Profile() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      if (auth.currentUser) {
        const q = query(
          collection(db, "scores"),
          where("userId", "==", auth.currentUser.uid),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const scoreData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setScores(scoreData);
        setLoading(false);
      }
    };
    fetchScores();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <p className="text-xl text-gray-800">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h2>
        <p className="text-xl text-gray-600 mb-4">
          Email: {auth.currentUser?.email}
        </p>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Quiz History
        </h3>
        {scores.length === 0 ? (
          <p className="text-gray-600">No quiz attempts yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-gray-800">Topic</th>
                  <th className="p-3 text-gray-800">Score</th>
                  <th className="p-3 text-gray-800">Percentage</th>
                  <th className="p-3 text-gray-800">Date</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score) => (
                  <tr key={score.id} className="border-b">
                    <td className="p-3 text-gray-800 capitalize">
                      {score.topic.replace(/-/g, " ").replace("comp ", "")}
                    </td>
                    <td className="p-3 text-gray-800">
                      {score.score}/{score.totalQuestions}
                    </td>
                    <td className="p-3 text-gray-800">
                      {score.percentage.toFixed(1)}%
                    </td>
                    <td className="p-3 text-gray-800">
                      {new Date(
                        score.timestamp.seconds * 1000
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
