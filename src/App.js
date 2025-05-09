import { useReducer } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import "./index.css";

const lightQuestions = [
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
      "A concave mirror can form a real and inverted image when the object is placed beyond the focal point but within the center of curvature.",
  },
  {
    question:
      "What is the refractive index of a medium if the speed of light in air is 3 × 10^8 m/s and in the medium is 2 × 10^8 m/s?",
    options: ["1.5", "2.0", "1.0", "0.67"],
    correctAnswer: "1.5",
    explanation:
      "The refractive index (n) is calculated as n = c/v, where c is 3 × 10^8 m/s and v is 2 × 10^8 m/s. Thus, n = 3 × 10^8 / 2 × 10^8 = 1.5.",
  },
  {
    question: "Which lens is used to correct hypermetropia (farsightedness)?",
    options: ["Concave lens", "Convex lens", "Plane lens", "Cylindrical lens"],
    correctAnswer: "Convex lens",
    explanation:
      "Hypermetropia is corrected using a convex lens, which converges light rays to focus them properly on the retina.",
  },
  {
    question: "What is the focal length of a plane mirror?",
    options: ["Zero", "Infinity", "Equal to its radius", "Negative"],
    correctAnswer: "Infinity",
    explanation:
      "A plane mirror has an infinite focal length because it does not converge or diverge light rays.",
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
      "Snell’s law states that n = sin i / sin r, where n is the refractive index.",
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
      "When an object is at the focus of a convex lens, the refracted rays are parallel, forming an image at infinity.",
  },
  {
    question: "What is the power of a lens with a focal length of 50 cm?",
    options: ["+2 D", "-2 D", "+0.5 D", "-0.5 D"],
    correctAnswer: "+2 D",
    explanation:
      "Power P = 1/f. For f = 50 cm = 0.5 m, P = 1/0.5 = 2 D (positive for convex lens).",
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
      "Concave mirrors produce a parallel beam of light when the source is at the focus, ideal for headlights.",
  },
  {
    question:
      "What happens to light when it passes from a denser to a rarer medium at an angle greater than the critical angle?",
    options: [
      "It refracts",
      "It reflects back",
      "It disperses",
      "It passes through",
    ],
    correctAnswer: "It reflects back",
    explanation:
      "At an angle greater than the critical angle, total internal reflection occurs.",
  },
];

const electricityQuestions = [
  {
    question: "What is the SI unit of electric current?",
    options: ["Volt", "Ampere", "Ohm", "Watt"],
    correctAnswer: "Ampere",
    explanation:
      "The SI unit of electric current is the ampere (A), which measures the rate of flow of electric charge.",
  },
  {
    question:
      "What is the resistance of a conductor if a current of 2 A flows through it with a potential difference of 12 V?",
    options: ["6 Ω", "4 Ω", "8 Ω", "24 Ω"],
    correctAnswer: "6 Ω",
    explanation:
      "Using Ohm’s law, R = V/I. Here, V = 12 V, I = 2 A, so R = 12/2 = 6 Ω.",
  },
  {
    question: "Which material is used as a filament in an incandescent bulb?",
    options: ["Copper", "Tungsten", "Aluminium", "Iron"],
    correctAnswer: "Tungsten",
    explanation:
      "Tungsten is used due to its high melting point and ability to withstand high temperatures.",
  },
  {
    question:
      "What is the power consumed by a 100 W bulb operated for 2 hours?",
    options: ["200 Wh", "100 Wh", "0.2 kWh", "2 kWh"],
    correctAnswer: "0.2 kWh",
    explanation: "Energy = Power × Time = 100 W × 2 h = 200 Wh = 0.2 kWh.",
  },
  {
    question: "What is the direction of conventional current?",
    options: [
      "Opposite to electron flow",
      "Same as electron flow",
      "Random",
      "No direction",
    ],
    correctAnswer: "Opposite to electron flow",
    explanation:
      "Conventional current flows from positive to negative, opposite to electron flow.",
  },
  {
    question: "Which device is used to measure potential difference?",
    options: ["Ammeter", "Voltmeter", "Galvanometer", "Ohmmeter"],
    correctAnswer: "Voltmeter",
    explanation:
      "A voltmeter measures the potential difference (voltage) across a circuit component.",
  },
  {
    question:
      "What is the equivalent resistance of two 4 Ω resistors connected in series?",
    options: ["2 Ω", "4 Ω", "8 Ω", "16 Ω"],
    correctAnswer: "8 Ω",
    explanation: "In series, R_eq = R1 + R2 = 4 Ω + 4 Ω = 8 Ω.",
  },
  {
    question:
      "What is the effect of increasing the length of a conductor on its resistance?",
    options: ["Decreases", "Increases", "No effect", "Doubles"],
    correctAnswer: "Increases",
    explanation:
      "Resistance is directly proportional to the length of the conductor (R ∝ l).",
  },
  {
    question: "Which type of circuit has only one path for current flow?",
    options: ["Parallel", "Series", "Mixed", "Open"],
    correctAnswer: "Series",
    explanation:
      "In a series circuit, there is only one path for the current to flow.",
  },
  {
    question: "What is the unit of electrical power?",
    options: ["Joule", "Watt", "Ohm", "Volt"],
    correctAnswer: "Watt",
    explanation:
      "The unit of electrical power is the watt (W), where 1 W = 1 J/s.",
  },
];

const magneticEffectsQuestions = [
  {
    question:
      "What is the shape of magnetic field lines around a straight current-carrying conductor?",
    options: ["Circular", "Straight", "Parabolic", "Elliptical"],
    correctAnswer: "Circular",
    explanation:
      "The magnetic field lines form concentric circles around a straight conductor, per the right-hand thumb rule.",
  },
  {
    question:
      "Which rule determines the direction of force on a current-carrying conductor in a magnetic field?",
    options: [
      "Right-hand thumb rule",
      "Fleming’s left-hand rule",
      "Fleming’s right-hand rule",
      "Ohm’s law",
    ],
    correctAnswer: "Fleming’s left-hand rule",
    explanation:
      "Fleming’s left-hand rule gives the direction of force, with thumb (force), index (field), and middle finger (current) perpendicular.",
  },
  {
    question: "What is the principle of an electric motor?",
    options: [
      "Electromagnetic induction",
      "Magnetic effect of current",
      "Heating effect",
      "Chemical effect",
    ],
    correctAnswer: "Magnetic effect of current",
    explanation:
      "An electric motor uses the magnetic effect of current to rotate a coil in a magnetic field.",
  },
  {
    question:
      "What induces an electric current in a coil when a magnet is moved relative to it?",
    options: [
      "Electromagnetic induction",
      "Magnetic shielding",
      "Electrostatic induction",
      "Thermal effect",
    ],
    correctAnswer: "Electromagnetic induction",
    explanation:
      "Electromagnetic induction induces current due to relative motion between a coil and a magnet.",
  },
  {
    question: "Which device converts mechanical energy into electrical energy?",
    options: ["Motor", "Generator", "Transformer", "Solenoid"],
    correctAnswer: "Generator",
    explanation:
      "A generator converts mechanical energy into electrical energy using electromagnetic induction.",
  },
  {
    question: "What is the frequency of AC in India?",
    options: ["50 Hz", "60 Hz", "100 Hz", "25 Hz"],
    correctAnswer: "50 Hz",
    explanation: "The standard frequency of AC in India is 50 Hz.",
  },
  {
    question: "What is the role of a commutator in a DC motor?",
    options: [
      "Reverses current direction",
      "Increases voltage",
      "Reduces resistance",
      "Stores charge",
    ],
    correctAnswer: "Reverses current direction",
    explanation:
      "The commutator reverses current direction every half rotation to ensure continuous rotation.",
  },
  {
    question: "What type of current is produced by a battery?",
    options: [
      "Alternating current",
      "Direct current",
      "Pulsating current",
      "Variable current",
    ],
    correctAnswer: "Direct current",
    explanation:
      "A battery produces direct current (DC), which flows in one direction.",
  },
  {
    question: "What is the magnetic field inside a solenoid similar to?",
    options: ["Bar magnet", "Circular loop", "Straight wire", "Plane mirror"],
    correctAnswer: "Bar magnet",
    explanation:
      "The magnetic field inside a solenoid is uniform and similar to a bar magnet.",
  },
  {
    question:
      "Which rule determines the direction of induced current in a generator?",
    options: [
      "Fleming’s left-hand rule",
      "Fleming’s right-hand rule",
      "Right-hand thumb rule",
      "Ohm’s law",
    ],
    correctAnswer: "Fleming’s right-hand rule",
    explanation:
      "Fleming’s right-hand rule determines the direction of induced current.",
  },
];

const quizData = {
  light: lightQuestions,
  electricity: electricityQuestions,
  magnetic: magneticEffectsQuestions,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_TOPIC":
      return {
        ...state,
        screen: "quiz",
        selectedTopic: action.topic,
        score: 0,
      };
    case "END_QUIZ":
      const highScoreKey = `highScore_${action.topic}`;
      const currentHighScore = parseInt(
        localStorage.getItem(highScoreKey) || 0
      );
      const newHighScore = Math.max(currentHighScore, action.score);
      localStorage.setItem(highScoreKey, newHighScore);
      return {
        ...state,
        screen: "result",
        score: action.score,
        highScore: newHighScore,
      };
    case "RESTART_QUIZ":
      return { ...state, screen: "quiz", score: 0 };
    case "GO_HOME":
      return {
        ...state,
        screen: "home",
        selectedTopic: null,
        score: 0,
        highScore: 0,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    screen: "home",
    selectedTopic: null,
    score: 0,
    highScore: 0,
  });

  const handleSelectTopic = (topic) => {
    dispatch({ type: "SELECT_TOPIC", topic });
  };

  const handleQuizEnd = (finalScore) => {
    dispatch({
      type: "END_QUIZ",
      score: finalScore,
      topic: state.selectedTopic,
    });
  };

  const handleRestart = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  const handleGoHome = () => {
    dispatch({ type: "GO_HOME" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      <nav className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            CBSE Physics Quiz
          </h1>
          {state.screen !== "home" && (
            <button
              onClick={handleGoHome}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Home
            </button>
          )}
        </div>
      </nav>
      <main className="flex-grow flex items-center justify-center p-4">
        {state.screen === "home" ? (
          <Home onSelectTopic={handleSelectTopic} />
        ) : state.screen === "quiz" ? (
          <Quiz
            questions={quizData[state.selectedTopic]}
            onQuizEnd={handleQuizEnd}
            topic={state.selectedTopic}
          />
        ) : (
          <Result
            score={state.score}
            highScore={state.highScore}
            questions={quizData[state.selectedTopic]}
            onRestart={handleRestart}
            onGoHome={handleGoHome}
            topic={state.selectedTopic}
          />
        )}
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2025 CBSE Physics Quiz. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
