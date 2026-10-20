"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/* ================= TYPES ================= */
type Difficulty = "easy" | "medium" | "hard";
type Option = {
  text: string;
  correct: boolean;
};

type Question = {
  id: string;
  difficulty: Difficulty;
  caseStudy: string;
  question: string;
  options: Option[];
  multi: boolean;
  weight: number;
  timeLimit: number;
};

/* ================= QUESTION POOL ================= */

const  QUESTION_POOL: Question[] = [
 
  {
    id: "da1",
    difficulty: "easy",
    caseStudy:
      "Two dashboards show different revenue numbers for the same day.",
    question: "What should you verify first?",
    multi: false,
    weight: 2,
    timeLimit: 45,
    options: [
      { text: "Chart type", correct: false },
      { text: "Data source freshness", correct: true },
      { text: "Color coding", correct: false },
      { text: "Dashboard owner", correct: false },
    ],
  },
  {
    id: "da2",
    difficulty: "easy",
    caseStudy:
      "Sales spike appears only in one region.",
    question: "What is the FIRST check?",
    multi: false,
    weight: 2,
    timeLimit: 45,
    options: [
      { text: "Marketing spend", correct: false },
      { text: "Data duplication", correct: true },
      { text: "Seasonality", correct: false },
      { text: "UI bug", correct: false },
    ],
  },
 {
    id: "da3",
    difficulty: "easy",
    caseStudy:
      "A dashboard shows average income.",
    question: "Which metric is MOST misleading?",
    multi: false,
    weight: 2,
    timeLimit: 40,
    options: [
      { text: "Median", correct: false },
      { text: "Average", correct: true },
      { text: "Count", correct: false },
      { text: "Ratio", correct: false },
    ],
  },
  {
    id: "da4",
    difficulty: "medium",
    caseStudy:
      "Startup sees growth but churn is rising.",
    question: "Which KPI matters MOST now?",
    multi: false,
    weight: 4,
    timeLimit: 55,
    options: [
      { text: "CAC", correct: false },
      { text: "Retention & LTV", correct: true },
      { text: "Traffic", correct: false },
      { text: "Impressions", correct: false },
    ],
  },
   {
    id: "da5",
    difficulty: "medium",
    caseStudy:
      "Revenue increased but CAC doubled.",
    question: "Best leadership decision?",
    multi: false,
    weight: 4,
    timeLimit: 60,
    options: [
      { text: "Celebrate growth", correct: false },
      { text: "Pause marketing", correct: true },
      { text: "Increase ads", correct: false },
      { text: "Ignore CAC", correct: false },
    ],
  },
  {
    id: "da18",
    difficulty: "medium",
    caseStudy:
      "Overall conversion improved, but every region declined.",
    question: "What explains this?",
    multi: false,
    weight: 4,
    timeLimit: 60,
    options: [
      { text: "Sampling bias", correct: false },
      { text: "Simpson’s Paradox", correct: true },
      { text: "Overfitting", correct: false },
      { text: "Noise", correct: false },
    ],
  },

  /* ---------- HARD (31–45) ---------- */

  {
    id: "da31",
    difficulty: "hard",
    caseStudy:
      "A/B test ran 2 days with small sample.",
    question: "Correct action?",
    multi: false,
    weight: 6,
    timeLimit: 70,
    options: [
      { text: "Ship immediately", correct: false },
      { text: "Extend experiment", correct: true },
      { text: "Discard test", correct: false },
      { text: "Duplicate test", correct: false },
    ],
  },

  
  {
    id: "da32",
    difficulty: "hard",
    caseStudy:
      "Variant performs better only on weekends.",
    question: "Correct interpretation?",
    multi: false,
    weight: 6,
    timeLimit: 65,
    options: [
      { text: "Random noise", correct: false },
      { text: "Segment behavior", correct: true },
      { text: "Invalid test", correct: false },
      { text: "Bug", correct: false },
    ],
  },

  {
    id: "da33",
    difficulty: "hard",
    caseStudy:
      "JOIN causes user count inflation.",
    question: "Root cause?",
    multi: false,
    weight: 6,
    timeLimit: 60,
    options: [
      { text: "Missing index", correct: false },
      { text: "One-to-many duplication", correct: true },
      { text: "NULL values", correct: false },
      { text: "Wrong ORDER BY", correct: false },
    ],
  },
];

/* ================= SHUFFLE ================= */

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function difficultyShuffle(questions: Question[]) {
  const easy = shuffle(questions.filter(q => q.difficulty === "easy"));
  const medium = shuffle(questions.filter(q => q.difficulty === "medium"));
  const hard = shuffle(questions.filter(q => q.difficulty === "hard"));

  const final: Question[] = [];
  const max = Math.max(easy.length, medium.length, hard.length);

  for (let i = 0; i < max; i++) {
    if (easy[i]) final.push(easy[i]);
    if (medium[i]) final.push(medium[i]);
    if (hard[i]) final.push(hard[i]);
  }

  return final;
}

/* ================= PAGE ================= */

export default function DataAnalyticsTestPage() {
  const router = useRouter();

const [questions] = useState(() =>
    difficultyShuffle(QUESTION_POOL)
  );
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const [timeLeft, setTimeLeft] = useState(0);

  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const q = questions[index];
  const selected = answers[q.id] || [];

  /* ================= TIMER ================= */
 useEffect(() => {
  setMounted(true);
}, []);

  useEffect(() => {
  if (!mounted) return;

  setTimeLeft(q.timeLimit);

  timerRef.current && clearInterval(timerRef.current);

  timerRef.current = setInterval(() => {
    setTimeLeft(t => {
      if (t <= 1) {
        clearInterval(timerRef.current!);
        next();
        return 0;
      }
      return t - 1;
    });
  }, 1000);

  return () => {
    timerRef.current && clearInterval(timerRef.current);
  };
}, [index, mounted]);


  /* ================= BLOCK BACK ================= */

  useEffect(() => {
    history.pushState(null, "", location.href);
    window.onpopstate = () => history.pushState(null, "", location.href);
  }, []);

  /* ================= HANDLERS ================= */

  function toggleOption(text: string) {
    if (q.multi) {
      setAnswers(prev => ({
        ...prev,
        [q.id]: selected.includes(text)
          ? selected.filter(o => o !== text)
          : [...selected, text],
      }));
    } else {
      setAnswers(prev => ({ ...prev, [q.id]: [text] }));
    }
  }

  function next() {
    if (index === questions.length - 1) {
      evaluate();
    } else {
      setIndex(i => i + 1);
    }
  }

  function evaluate() {
    let score = 0;

    questions.forEach(q => {
      const user = answers[q.id] || [];
      const correct = q.options.filter(o => o.correct).map(o => o.text);

      const matched = user.filter(u => correct.includes(u)).length;
      const wrong = user.filter(u => !correct.includes(u)).length;

       const accuracy =
        (matched - wrong) / correct.length;

      score += Math.max(accuracy, -0.25) * q.weight;
    });

    localStorage.setItem(
      "dataAnalyticsResult",
      JSON.stringify({ score })
    );

    router.push("/test/payment");
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-semibold">
            Data Analytics Assessment
          </h1>
          <span className="text-red-600 font-medium">
            {mounted ? `${timeLeft}s` : "--"}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Case Study
        </p>

        <p className="mb-6">{q.caseStudy}</p>

        <p className="font-medium mb-4">{q.question}</p>

        <div className="space-y-3">
          {q.options.map(o => (
            <button
              key={o.text}
              onClick={() => toggleOption(o.text)}
              className={`w-full text-left p-4 border rounded ${
                selected.includes(o.text)
                  ? "border-blue-600 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            >
              {o.text}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <span className="text-sm text-gray-500">
            Question {index + 1} of {questions.length}
          </span>
          <button
            onClick={next}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            {index === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
