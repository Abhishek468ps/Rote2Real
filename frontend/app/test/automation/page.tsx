
"use client";

import { useEffect, useState } from "react";

type Option = {
  id: string;
  text: string;
};

type Question = {
  id: number;
  scenario: string;
  question: string;
  options: Option[];
  correctOptions: string[]; // multi-select
  weight: number;
  timeLimit: number; // seconds per question
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    scenario:
      "A CI pipeline fails randomly on the same test suite. Re-runs usually pass without code changes.",
    question: "What is the MOST likely root cause?",
    options: [
      { id: "A", text: "Test order dependency and shared state" },
      { id: "B", text: "Low code coverage" },
      { id: "C", text: "Incorrect assertions" },
      { id: "D", text: "Slow developer machine" },
    ],
    correctOptions: ["A"],
    weight: 5,
    timeLimit: 45,
  },
  {
    id: 2,
    scenario:
      "Your team is migrating UI automation from Selenium to Playwright for a large-scale SaaS product.",
    question: "Which tradeoffs justify Playwright over Selenium?",
    options: [
      { id: "A", text: "Auto-waiting reduces flakiness" },
      { id: "B", text: "Playwright removes need for CI" },
      { id: "C", text: "Better handling of modern SPA frameworks" },
      { id: "D", text: "Zero learning curve" },
    ],
    correctOptions: ["A", "C"],
    weight: 6,
    timeLimit: 60,
  },
  {
    id: 3,
    scenario:
      "An automation script retries API calls during failures and accidentally creates duplicate records.",
    question: "Which automation principle is violated?",
    options: [
      { id: "A", text: "Parallel execution" },
      { id: "B", text: "Idempotency" },
      { id: "C", text: "Test isolation" },
      { id: "D", text: "Code coverage" },
    ],
    correctOptions: ["B"],
    weight: 5,
    timeLimit: 40,
  },
  {
    id: 4,
    scenario:
      "End-to-end tests fail only during peak CI hours but pass locally.",
    question: "What is the BEST mitigation strategy?",
    options: [
      { id: "A", text: "Add hard waits (sleep)" },
      { id: "B", text: "Mock unstable third-party services" },
      { id: "C", text: "Disable tests during peak hours" },
      { id: "D", text: "Increase retry count blindly" },
    ],
    correctOptions: ["B"],
    weight: 6,
    timeLimit: 50,
  },
  {
    id: 5,
    scenario:
      "Management wants to automate a frequently changing UI workflow used only twice a month.",
    question: "What is the MOST rational decision?",
    options: [
      { id: "A", text: "Automate immediately to save time" },
      { id: "B", text: "Delay automation due to low ROI" },
      { id: "C", text: "Increase test coverage first" },
      { id: "D", text: "Automate with record-playback tools" },
    ],
    correctOptions: ["B"],
    weight: 7,
    timeLimit: 55,
  },
];

export default function AutomationTestPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [timeLeft, setTimeLeft] = useState(
    QUESTIONS[0].timeLimit
  );

  const question = QUESTIONS[current];

  useEffect(() => {
    setTimeLeft(question.timeLimit);
  }, [current]);

  useEffect(() => {
    if (timeLeft <= 0) {
      nextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const toggleOption = (id: string) => {
    setAnswers((prev) => {
      const selected = prev[question.id] || [];
      return {
        ...prev,
        [question.id]: selected.includes(id)
          ? selected.filter((x) => x !== id)
          : [...selected, id],
      };
    });
  };

  const nextQuestion = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      alert("Automation Test Completed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6 bg-white p-8 rounded shadow">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Automation Systems Assessment
          </h1>
          <span className="text-red-600 font-medium">
            {timeLeft}s
          </span>
        </div>

        <div className="text-sm text-gray-500">
          Scenario
        </div>
        <p className="text-gray-800">
          {question.scenario}
        </p>

        <h2 className="font-medium mt-4">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={
                  answers[question.id]?.includes(opt.id) ||
                  false
                }
                onChange={() => toggleOption(opt.id)}
              />
              <span>{opt.text}</span>
            </label>
          ))}
        </div>

        <button
          onClick={nextQuestion}
          className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}


