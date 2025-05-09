import { useReducer } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import "./index.css";

const mainTopics = [
  {
    name: "Class 10 Physics",
    subTopics: [
      {
        id: "light",
        name: "Light - Reflection and Refraction",
        description: "Explore mirrors, lenses, and refraction laws.",
      },
      {
        id: "electricity",
        name: "Electricity",
        description: "Learn about circuits, resistance, and power.",
      },
      {
        id: "magnetic",
        name: "Magnetic Effects of Electric Current",
        description:
          "Understand magnetic fields and electromagnetic induction.",
      },
    ],
  },
  {
    name: "Class 9 Physics",
    subTopics: [
      {
        id: "motion",
        name: "Motion",
        description:
          "Study distance, displacement, velocity, and acceleration.",
      },
      {
        id: "force",
        name: "Force and Laws of Motion",
        description: "Explore Newton’s laws and their applications.",
      },
      {
        id: "gravitation",
        name: "Gravitation",
        description: "Understand gravity and its effects.",
      },
    ],
  },
  {
    name: "Competitive Exams",
    subTopics: [
      {
        id: "comp-physics-mechanics",
        name: "Physics - Mechanics",
        description: "Master kinematics, dynamics, and energy.",
      },
      {
        id: "comp-physics-thermo",
        name: "Physics - Thermodynamics",
        description: "Learn about heat, work, and energy transfer.",
      },
      {
        id: "comp-physics-electro",
        name: "Physics - Electromagnetism",
        description: "Study electric and magnetic fields.",
      },
      {
        id: "comp-maths-algebra",
        name: "Mathematics - Algebra",
        description: "Solve equations and inequalities.",
      },
      {
        id: "comp-maths-calculus",
        name: "Mathematics - Calculus",
        description: "Explore limits, derivatives, and integrals.",
      },
      {
        id: "comp-maths-geometry",
        name: "Mathematics - Geometry",
        description: "Understand shapes, angles, and theorems.",
      },
      {
        id: "comp-gs-history",
        name: "General Studies - History",
        description: "Discover key historical events and eras.",
      },
      {
        id: "comp-gs-geography",
        name: "General Studies - Geography",
        description: "Learn about physical and human geography.",
      },
      {
        id: "comp-gs-polity",
        name: "General Studies - Polity",
        description: "Understand governance and constitutions.",
      },
    ],
  },
];

const lightQuestions = [
  {
    question:
      "What is the angle of reflection if the angle of incidence is 30° for a plane mirror?",
    options: ["30°", "60°", "90°", "0°"],
    correctAnswer: "30°",
    explanation:
      "According to the first law of reflection, the angle of incidence is equal to the angle of reflection.",
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
      "A concave mirror forms a real and inverted image when the object is beyond the focal point.",
  },
  {
    question:
      "What is the refractive index if the speed of light in air is 3 × 10^8 m/s and in the medium is 2 × 10^8 m/s?",
    options: ["1.5", "2.0", "1.0", "0.67"],
    correctAnswer: "1.5",
    explanation: "Refractive index n = c/v = 3 × 10^8 / 2 × 10^8 = 1.5.",
  },
  {
    question: "Which lens corrects hypermetropia?",
    options: ["Concave lens", "Convex lens", "Plane lens", "Cylindrical lens"],
    correctAnswer: "Convex lens",
    explanation:
      "A convex lens converges light to correct hypermetropia (farsightedness).",
  },
  {
    question: "What is the focal length of a plane mirror?",
    options: ["Zero", "Infinity", "Equal to its radius", "Negative"],
    correctAnswer: "Infinity",
    explanation:
      "A plane mirror has an infinite focal length as it does not focus light.",
  },
];

const electricityQuestions = [
  {
    question: "What is the SI unit of electric current?",
    options: ["Volt", "Ampere", "Ohm", "Watt"],
    correctAnswer: "Ampere",
    explanation: "The ampere (A) measures the rate of electric charge flow.",
  },
  {
    question:
      "What is the resistance if 2 A flows with a 12 V potential difference?",
    options: ["6 Ω", "4 Ω", "8 Ω", "24 Ω"],
    correctAnswer: "6 Ω",
    explanation: "R = V/I = 12 V / 2 A = 6 Ω (Ohm’s law).",
  },
  {
    question: "Which material is used as a filament in an incandescent bulb?",
    options: ["Copper", "Tungsten", "Aluminium", "Iron"],
    correctAnswer: "Tungsten",
    explanation: "Tungsten’s high melting point makes it ideal for filaments.",
  },
  {
    question: "What is the power consumed by a 100 W bulb for 2 hours?",
    options: ["200 Wh", "100 Wh", "0.2 kWh", "2 kWh"],
    correctAnswer: "0.2 kWh",
    explanation: "Energy = 100 W × 2 h = 200 Wh = 0.2 kWh.",
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
    explanation: "Conventional current flows from positive to negative.",
  },
];

const magneticQuestions = [
  {
    question:
      "What is the shape of magnetic field lines around a straight conductor?",
    options: ["Circular", "Straight", "Parabolic", "Elliptical"],
    correctAnswer: "Circular",
    explanation: "Field lines form concentric circles (right-hand thumb rule).",
  },
  {
    question:
      "Which rule determines the force on a current-carrying conductor?",
    options: [
      "Right-hand thumb rule",
      "Fleming’s left-hand rule",
      "Fleming’s right-hand rule",
      "Ohm’s law",
    ],
    correctAnswer: "Fleming’s left-hand rule",
    explanation: "Fleming’s left-hand rule gives force direction.",
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
    explanation: "A motor uses the magnetic effect to rotate a coil.",
  },
  {
    question:
      "What induces current in a coil when a magnet moves relative to it?",
    options: [
      "Electromagnetic induction",
      "Magnetic shielding",
      "Electrostatic induction",
      "Thermal effect",
    ],
    correctAnswer: "Electromagnetic induction",
    explanation: "Relative motion induces current (Faraday’s law).",
  },
  {
    question: "Which device converts mechanical energy to electrical energy?",
    options: ["Motor", "Generator", "Transformer", "Solenoid"],
    correctAnswer: "Generator",
    explanation: "A generator uses electromagnetic induction.",
  },
];

const motionQuestions = [
  {
    question: "What is the SI unit of acceleration?",
    options: ["m/s", "m/s²", "m", "s"],
    correctAnswer: "m/s²",
    explanation:
      "Acceleration is the rate of change of velocity, measured in m/s².",
  },
  {
    question:
      "What is the distance covered by an object moving with uniform velocity of 10 m/s for 5 s?",
    options: ["50 m", "25 m", "100 m", "10 m"],
    correctAnswer: "50 m",
    explanation: "Distance = velocity × time = 10 m/s × 5 s = 50 m.",
  },
  {
    question:
      "Which equation relates initial velocity (u), final velocity (v), and acceleration (a)?",
    options: ["v = u + at", "s = ut + ½at²", "v² = u² + 2as", "All of these"],
    correctAnswer: "v = u + at",
    explanation: "The first equation of motion is v = u + at.",
  },
  {
    question: "What is uniform motion?",
    options: [
      "Constant speed in a straight line",
      "Changing speed",
      "Circular motion",
      "Random motion",
    ],
    correctAnswer: "Constant speed in a straight line",
    explanation: "Uniform motion has constant speed and direction.",
  },
  {
    question: "What is the slope of a velocity-time graph?",
    options: ["Distance", "Acceleration", "Speed", "Displacement"],
    correctAnswer: "Acceleration",
    explanation:
      "The slope represents the rate of change of velocity, i.e., acceleration.",
  },
];

const forceQuestions = [
  {
    question: "What is Newton’s first law of motion also called?",
    options: [
      "Law of acceleration",
      "Law of inertia",
      "Law of action-reaction",
      "Law of gravitation",
    ],
    correctAnswer: "Law of inertia",
    explanation:
      "It states that an object remains at rest or in motion unless acted upon by a force.",
  },
  {
    question: "What is the SI unit of force?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    correctAnswer: "Newton",
    explanation: "Force is measured in newtons (N), where 1 N = 1 kg·m/s².",
  },
  {
    question: "What is the momentum of a 2 kg object moving at 5 m/s?",
    options: ["10 kg·m/s", "7 kg·m/s", "2.5 kg·m/s", "20 kg·m/s"],
    correctAnswer: "10 kg·m/s",
    explanation: "Momentum = mass × velocity = 2 kg × 5 m/s = 10 kg·m/s.",
  },
  {
    question:
      "Which law states that for every action, there is an equal and opposite reaction?",
    options: ["First law", "Second law", "Third law", "Law of gravitation"],
    correctAnswer: "Third law",
    explanation: "Newton’s third law describes action-reaction pairs.",
  },
  {
    question: "What is the acceleration of a 10 kg object with a 20 N force?",
    options: ["2 m/s²", "0.5 m/s²", "10 m/s²", "20 m/s²"],
    correctAnswer: "2 m/s²",
    explanation: "F = ma, so a = F/m = 20 N / 10 kg = 2 m/s².",
  },
];

const gravitationQuestions = [
  {
    question:
      "What is the value of gravitational acceleration on Earth’s surface?",
    options: ["9.8 m/s²", "8.9 m/s²", "10 m/s²", "7.8 m/s²"],
    correctAnswer: "9.8 m/s²",
    explanation: "The standard value of g is approximately 9.8 m/s².",
  },
  {
    question: "What is the formula for gravitational force between two masses?",
    options: [
      "F = G m1 m2 / r²",
      "F = m1 m2 / r",
      "F = G m1 m2 r²",
      "F = m1 m2 / G",
    ],
    correctAnswer: "F = G m1 m2 / r²",
    explanation: "Newton’s law of gravitation states F = G m1 m2 / r².",
  },
  {
    question:
      "What happens to gravitational force if the distance between two objects doubles?",
    options: ["Doubles", "Halves", "Quartered", "Quadruples"],
    correctAnswer: "Quartered",
    explanation: "F ∝ 1/r², so doubling r reduces F to 1/4.",
  },
  {
    question: "What is the weight of a 5 kg object on Earth (g = 9.8 m/s²)?",
    options: ["49 N", "5 N", "98 N", "25 N"],
    correctAnswer: "49 N",
    explanation: "Weight = m × g = 5 kg × 9.8 m/s² = 49 N.",
  },
  {
    question: "Why do objects fall toward Earth?",
    options: [
      "Electromagnetic force",
      "Gravitational force",
      "Frictional force",
      "Magnetic force",
    ],
    correctAnswer: "Gravitational force",
    explanation: "Gravity causes objects to fall toward Earth’s center.",
  },
];

const mechanicsQuestions = [
  {
    question:
      "What is the work done by a 10 N force over 5 m in the direction of the force?",
    options: ["50 J", "2 J", "15 J", "25 J"],
    correctAnswer: "50 J",
    explanation: "Work = force × distance = 10 N × 5 m = 50 J.",
  },
  {
    question: "What is the kinetic energy of a 2 kg object moving at 3 m/s?",
    options: ["9 J", "6 J", "18 J", "3 J"],
    correctAnswer: "9 J",
    explanation: "KE = ½ mv² = ½ × 2 kg × (3 m/s)² = 9 J.",
  },
  {
    question: "What is the law of conservation of energy?",
    options: [
      "Energy can be created",
      "Energy can be destroyed",
      "Energy is conserved",
      "Energy is lost",
    ],
    correctAnswer: "Energy is conserved",
    explanation: "Total energy remains constant in an isolated system.",
  },
  {
    question: "What is the acceleration due to a 50 N force on a 25 kg mass?",
    options: ["2 m/s²", "1 m/s²", "4 m/s²", "0.5 m/s²"],
    correctAnswer: "2 m/s²",
    explanation: "a = F/m = 50 N / 25 kg = 2 m/s².",
  },
  {
    question: "What is the unit of power?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    correctAnswer: "Watt",
    explanation: "Power is measured in watts (W), where 1 W = 1 J/s.",
  },
];

const thermoQuestions = [
  {
    question: "What is the first law of thermodynamics?",
    options: [
      "Energy is conserved",
      "Entropy increases",
      "Heat flows from hot to cold",
      "No work is done",
    ],
    correctAnswer: "Energy is conserved",
    explanation:
      "The first law states that the internal energy change equals heat added minus work done.",
  },
  {
    question: "What is the SI unit of temperature?",
    options: ["Celsius", "Fahrenheit", "Kelvin", "Rankine"],
    correctAnswer: "Kelvin",
    explanation: "Kelvin is the SI unit for thermodynamic temperature.",
  },
  {
    question: "What is absolute zero in Celsius?",
    options: ["0°C", "-273.15°C", "-100°C", "-459.67°C"],
    correctAnswer: "-273.15°C",
    explanation: "Absolute zero is 0 K, equivalent to -273.15°C.",
  },
  {
    question: "What is the specific heat capacity of water?",
    options: ["4184 J/kg·K", "1000 J/kg·K", "2000 J/kg·K", "500 J/kg·K"],
    correctAnswer: "4184 J/kg·K",
    explanation: "Water’s specific heat is approximately 4184 J/kg·K.",
  },
  {
    question: "What is an adiabatic process?",
    options: [
      "No heat transfer",
      "Constant temperature",
      "Constant pressure",
      "Constant volume",
    ],
    correctAnswer: "No heat transfer",
    explanation:
      "An adiabatic process involves no heat exchange with the surroundings.",
  },
];

const electroQuestions = [
  {
    question: "What is the SI unit of electric charge?",
    options: ["Ampere", "Coulomb", "Volt", "Ohm"],
    correctAnswer: "Coulomb",
    explanation: "The coulomb (C) measures electric charge.",
  },
  {
    question:
      "What is the force between two 1 C charges 1 m apart (k = 9 × 10^9 N·m²/C²)?",
    options: ["9 × 10^9 N", "1 N", "9 N", "10^9 N"],
    correctAnswer: "9 × 10^9 N",
    explanation: "F = k q1 q2 / r² = 9 × 10^9 × 1 × 1 / 1² = 9 × 10^9 N.",
  },
  {
    question:
      "What is the direction of the magnetic field due to a current-carrying wire?",
    options: [
      "Parallel to the wire",
      "Perpendicular to the wire",
      "Opposite to current",
      "Random",
    ],
    correctAnswer: "Perpendicular to the wire",
    explanation: "The field forms circular loops around the wire.",
  },
  {
    question: "What is the unit of electric field strength?",
    options: ["N/C", "J/C", "V/m", "Both N/C and V/m"],
    correctAnswer: "Both N/C and V/m",
    explanation: "Electric field is measured in N/C or V/m.",
  },
  {
    question: "What is Faraday’s law related to?",
    options: [
      "Electric field",
      "Magnetic field",
      "Electromagnetic induction",
      "Capacitance",
    ],
    correctAnswer: "Electromagnetic induction",
    explanation:
      "Faraday’s law describes induced EMF due to changing magnetic flux.",
  },
];

const algebraQuestions = [
  {
    question: "What is the solution to the equation 2x + 3 = 7?",
    options: ["x = 2", "x = 3", "x = 1", "x = 4"],
    correctAnswer: "x = 2",
    explanation: "2x + 3 = 7 → 2x = 4 → x = 2.",
  },
  {
    question: "What is the quadratic formula?",
    options: [
      "x = (-b ± √(b² - 4ac)) / 2a",
      "x = (-b ± √(b² + 4ac)) / 2a",
      "x = (b ± √(b² - 4ac)) / 2a",
      "x = (-b ± √(b² - 4ac)) / a",
    ],
    correctAnswer: "x = (-b ± √(b² - 4ac)) / 2a",
    explanation: "The quadratic formula solves ax² + bx + c = 0.",
  },
  {
    question: "What is the value of x in 3x - 5 = x + 7?",
    options: ["x = 6", "x = 3", "x = 4", "x = 2"],
    correctAnswer: "x = 6",
    explanation: "3x - 5 = x + 7 → 2x = 12 → x = 6.",
  },
  {
    question: "What is the degree of the polynomial 2x³ + x² - 4?",
    options: ["2", "3", "1", "4"],
    correctAnswer: "3",
    explanation: "The degree is the highest power, which is 3.",
  },
  {
    question: "What is the solution to x² - 4 = 0?",
    options: ["x = ±2", "x = ±4", "x = 2", "x = -2"],
    correctAnswer: "x = ±2",
    explanation: "x² - 4 = (x - 2)(x + 2) = 0 → x = ±2.",
  },
];

const calculusQuestions = [
  {
    question: "What is the derivative of x²?",
    options: ["2x", "x", "2", "x²"],
    correctAnswer: "2x",
    explanation: "d/dx (x²) = 2x (power rule).",
  },
  {
    question: "What is the integral of 3x² dx?",
    options: ["x³ + C", "3x³ + C", "x² + C", "9x + C"],
    correctAnswer: "x³ + C",
    explanation: "∫ 3x² dx = 3 × (x³/3) + C = x³ + C.",
  },
  {
    question: "What is the limit of (x² - 1)/(x - 1) as x approaches 1?",
    options: ["1", "2", "0", "Undefined"],
    correctAnswer: "2",
    explanation:
      "(x² - 1)/(x - 1) = (x - 1)(x + 1)/(x - 1) = x + 1 → 1 + 1 = 2.",
  },
  {
    question: "What is the derivative of sin(x)?",
    options: ["cos(x)", "-sin(x)", "sin(x)", "-cos(x)"],
    correctAnswer: "cos(x)",
    explanation: "d/dx sin(x) = cos(x).",
  },
  {
    question: "What is the integral of 1/x dx?",
    options: ["ln|x| + C", "1/x² + C", "x + C", "e^x + C"],
    correctAnswer: "ln|x| + C",
    explanation: "∫ 1/x dx = ln|x| + C.",
  },
];

const geometryQuestions = [
  {
    question: "What is the sum of angles in a triangle?",
    options: ["180°", "360°", "90°", "270°"],
    correctAnswer: "180°",
    explanation: "The angles in a triangle always sum to 180°.",
  },
  {
    question: "What is the area of a circle with radius r?",
    options: ["πr²", "2πr", "πr", "r²"],
    correctAnswer: "πr²",
    explanation: "Area = πr².",
  },
  {
    question: "What is the Pythagorean theorem?",
    options: ["a² + b² = c²", "a + b = c", "a² - b² = c²", "a/b = c"],
    correctAnswer: "a² + b² = c²",
    explanation: "For a right triangle, a² + b² = c² (hypotenuse c).",
  },
  {
    question: "What is the volume of a cube with side length s?",
    options: ["s³", "s²", "3s", "6s²"],
    correctAnswer: "s³",
    explanation: "Volume = s × s × s = s³.",
  },
  {
    question: "What is the sum of interior angles of a pentagon?",
    options: ["540°", "360°", "720°", "180°"],
    correctAnswer: "540°",
    explanation: "Sum = (n-2) × 180° = (5-2) × 180° = 540°.",
  },
];

const historyQuestions = [
  {
    question: "Who was the first Prime Minister of India?",
    options: [
      "Mahatma Gandhi",
      "Jawaharlal Nehru",
      "Sardar Patel",
      "Indira Gandhi",
    ],
    correctAnswer: "Jawaharlal Nehru",
    explanation:
      "Jawaharlal Nehru served as India’s first Prime Minister from 1947 to 1964.",
  },
  {
    question: "In which year did India gain independence?",
    options: ["1945", "1947", "1950", "1962"],
    correctAnswer: "1947",
    explanation: "India gained independence on August 15, 1947.",
  },
  {
    question: "What was the main cause of the French Revolution?",
    options: [
      "Economic inequality",
      "Colonial wars",
      "Religious conflicts",
      "Technological advancements",
    ],
    correctAnswer: "Economic inequality",
    explanation:
      "Social and economic disparities led to the French Revolution in 1789.",
  },
  {
    question: "Who led the Dandi Salt March?",
    options: [
      "Bhagat Singh",
      "Subhas Chandra Bose",
      "Mahatma Gandhi",
      "Lala Lajpat Rai",
    ],
    correctAnswer: "Mahatma Gandhi",
    explanation:
      "Gandhi led the Dandi Salt March in 1930 to protest British salt taxes.",
  },
  {
    question: "Which empire was known as the ‘Sick Man of Europe’?",
    options: [
      "Ottoman Empire",
      "Roman Empire",
      "British Empire",
      "Mughal Empire",
    ],
    correctAnswer: "Ottoman Empire",
    explanation:
      "The Ottoman Empire was called so due to its decline in the 19th century.",
  },
];

const geographyQuestions = [
  {
    question: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    correctAnswer: "Nile",
    explanation: "The Nile River is approximately 6,650 km long.",
  },
  {
    question: "Which is the largest continent by area?",
    options: ["Africa", "Asia", "Australia", "Europe"],
    correctAnswer: "Asia",
    explanation: "Asia covers about 44.58 million km².",
  },
  {
    question: "What is the capital of Brazil?",
    options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    correctAnswer: "Brasília",
    explanation: "Brasília has been the capital of Brazil since 1960.",
  },
  {
    question: "Which desert is the largest in the world?",
    options: ["Sahara", "Gobi", "Kalahari", "Antarctic"],
    correctAnswer: "Antarctic",
    explanation:
      "The Antarctic Desert is the largest, covering 13.8 million km².",
  },
  {
    question:
      "What is the primary source of energy for Earth’s climate system?",
    options: [
      "Geothermal energy",
      "Solar energy",
      "Wind energy",
      "Tidal energy",
    ],
    correctAnswer: "Solar energy",
    explanation: "Solar radiation drives Earth’s climate system.",
  },
];

const polityQuestions = [
  {
    question: "What is the supreme law of India?",
    options: ["Constitution", "Penal Code", "Civil Code", "Parliament Acts"],
    correctAnswer: "Constitution",
    explanation:
      "The Constitution of India, adopted in 1950, is the supreme law.",
  },
  {
    question: "Who is the head of state in India?",
    options: ["Prime Minister", "President", "Chief Justice", "Vice President"],
    correctAnswer: "President",
    explanation: "The President is the ceremonial head of state.",
  },
  {
    question:
      "How many fundamental rights are there in the Indian Constitution?",
    options: ["Six", "Seven", "Five", "Eight"],
    correctAnswer: "Six",
    explanation:
      "The Constitution originally had seven, but currently lists six fundamental rights.",
  },
  {
    question:
      "What is the minimum age to become a Member of Parliament in India?",
    options: ["21", "25", "30", "35"],
    correctAnswer: "25",
    explanation: "The minimum age for Lok Sabha membership is 25 years.",
  },
  {
    question:
      "Which article of the Indian Constitution deals with the Right to Equality?",
    options: ["Article 14", "Article 19", "Article 21", "Article 32"],
    correctAnswer: "Article 14",
    explanation: "Article 14 ensures equality before the law.",
  },
];

const quizData = {
  light: lightQuestions,
  electricity: electricityQuestions,
  magnetic: magneticQuestions,
  motion: motionQuestions,
  force: forceQuestions,
  gravitation: gravitationQuestions,
  "comp-physics-mechanics": mechanicsQuestions,
  "comp-physics-thermo": thermoQuestions,
  "comp-physics-electro": electroQuestions,
  "comp-maths-algebra": algebraQuestions,
  "comp-maths-calculus": calculusQuestions,
  "comp-maths-geometry": geometryQuestions,
  "comp-gs-history": historyQuestions,
  "comp-gs-geography": geographyQuestions,
  "comp-gs-polity": polityQuestions,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_TOPIC":
      return {
        ...state,
        screen: "quiz",
        selectedTopic: action.topic,
        score: 0,
        answers: [],
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
        answers: action.answers,
      };
    case "RESTART_QUIZ":
      return { ...state, screen: "quiz", score: 0, answers: [] };
    case "GO_HOME":
      return {
        ...state,
        screen: "home",
        selectedTopic: null,
        score: 0,
        highScore: 0,
        answers: [],
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
    answers: [],
  });

  const handleSelectTopic = (topic) => {
    dispatch({ type: "SELECT_TOPIC", topic });
  };

  const handleQuizEnd = (finalScore, answers) => {
    dispatch({
      type: "END_QUIZ",
      score: finalScore,
      topic: state.selectedTopic,
      answers,
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
            Quiz App
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
          <Home mainTopics={mainTopics} onSelectTopic={handleSelectTopic} />
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
            answers={state.answers}
            onRestart={handleRestart}
            onGoHome={handleGoHome}
            topic={state.selectedTopic}
          />
        )}
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>© 2025 Quiz App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
