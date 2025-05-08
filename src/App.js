import { useReducer } from "react";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import "./index.css";

const quizData = [
  {
    question:
      "What is the angle of reflection if the angle of incidence is 30° for a plane mirror?",
    options: ["30°", "60°", "90°", "0°"],
    correctAnswer: "30°",
    explanation:
      "According to the first law of reflection, the angle of incidence is equal to the angle of reflection. If the angle of incidence is 30°, the angle of reflection is also 30°.",
  },
  {
    question: "Which type of mirror can form a real and inverted image?",
    options: [
      "Plane mirror",
      "Convex mirror",
      "Concave mirror",
      "None of these",
    ],
    correctAnswer: "Concave mirror",
    explanation:
      "A concave mirror can form a real and inverted image when the object is placed beyond the focal point but within the center of curvature. Plane mirrors form virtual images, and convex mirrors form virtual, diminished images.",
  },
  {
    question:
      "What is the refractive index of a medium if the speed of light in air is 3 × 10^8 m/s and in the medium is 2 × 10^8 m/s?",
    options: ["1.5", "2.0", "1.0", "0.67"],
    correctAnswer: "1.5",
    explanation:
      "The refractive index (n) is calculated as n = c/v, where c is the speed of light in vacuum (3 × 10^8 m/s) and v is the speed in the medium (2 × 10^8 m/s). Thus, n = 3 × 10^8 / 2 × 10^8 = 1.5.",
  },
  {
    question: "Which lens is used to correct hypermetropia (farsightedness)?",
    options: ["Concave lens", "Convex lens", "Plane lens", "Cylindrical lens"],
    correctAnswer: "Convex lens",
    explanation:
      "Hypermetropia is corrected using a convex lens, which converges light rays to focus them properly on the retina, allowing clear vision of nearby objects.",
  },
  {
    question: "What is the focal length of a plane mirror?",
    options: ["Zero", "Infinity", "Equal to its radius", "Negative"],
    correctAnswer: "Infinity",
    explanation:
      "A plane mirror has an infinite focal length because it does not converge or diverge light rays; the reflected rays appear to come from behind the mirror at an infinite distance.",
  },
  {
    question:
      "According to Snell’s law, what is the relationship between the angle of incidence (i) and angle of refraction (r)?",
    options: [
      "sin i / sin r = constant",
      "sin r / sin i = constant",
      "sin i = sin r",
      "tan i = tan r",
    ],
    correctAnswer: "sin i / sin r = constant",
    explanation:
      "Snell’s law states that the ratio of the sine of the angle of incidence to the sine of the angle of refraction is constant, equal to the refractive index of the second medium relative to the first: n = sin i / sin r.",
  },
  {
    question:
      "What type of image is formed by a convex lens when the object is placed at the focus?",
    options: [
      "Real and inverted",
      "Virtual and erect",
      "No image is formed",
      "Real and erect",
    ],
    correctAnswer: "No image is formed",
    explanation:
      "When an object is placed at the focus of a convex lens, the refracted rays are parallel and do not converge to form an image. The image is said to be formed at infinity.",
  },
  {
    question: "What is the power of a lens with a focal length of 50 cm?",
    options: ["+2 D", "-2 D", "+0.5 D", "-0.5 D"],
    correctAnswer: "+2 D",
    explanation:
      "The power of a lens is given by P = 1/f, where f is the focal length in meters. For a 50 cm (0.5 m) focal length, P = 1/0.5 = 2 diopters. Since it’s a converging lens (convex), the power is positive: +2 D.",
  },
  {
    question: "Which mirror is used in the headlights of a car?",
    options: [
      "Plane mirror",
      "Convex mirror",
      "Concave mirror",
      "Parabolic mirror",
    ],
    correctAnswer: "Concave mirror",
    explanation:
      "Concave mirrors are used in car headlights because they produce a parallel beam of light when the light source is placed at the focus, ensuring effective illumination.",
  },
  {
    question:
      "What happens to light when it passes from a denser medium to a rarer medium at an angle greater than the critical angle?",
    options: [
      "It refracts",
      "It reflects back",
      "It disperses",
      "It passes through",
    ],
    correctAnswer: "It reflects back",
    explanation:
      "When light travels from a denser to a rarer medium at an angle greater than the critical angle, total internal reflection occurs, and the light reflects back into the denser medium.",
  },
];

const appReducer = (state, action) => {
  switch (action.type) {
    case "END_QUIZ":
      const newHighScore = Math.max(state.highScore, action.score);
      localStorage.setItem("highScore", newHighScore);
      return {
        ...state,
        quizState: "result",
        score: action.score,
        highScore: newHighScore,
      };
    case "RESTART_QUIZ":
      return { ...state, quizState: "quiz", score: 0 };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    quizState: "quiz",
    score: 0,
    highScore: localStorage.getItem("highScore") || 0,
  });

  const handleQuizEnd = (finalScore) => {
    dispatch({ type: "END_QUIZ", score: finalScore });
  };

  const handleRestart = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">
        Physics Quiz: Light - Reflection and Refraction
      </h1>
      {state.quizState === "quiz" ? (
        <Quiz questions={quizData} onQuizEnd={handleQuizEnd} />
      ) : (
        <Result
          score={state.score}
          highScore={state.highScore}
          questions={quizData}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
