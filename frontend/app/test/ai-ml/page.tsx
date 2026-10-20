"use client";

import { useEffect, useMemo, useState } from "react";

/* ================= TYPES ================= */

type Option = {
  id: string;
  text: string;
  correct: boolean;
};

type Question = {
  id: string;
  question: string;
  scenario?: string;
  options: Option[];
  multiSelect: boolean;
  weight: number;
};

/* ================= QUESTION BANK ================= */

const QUESTION_POOL: Question[] = [
  {
    id: "q1",
    question: "A model shows 98% accuracy but fails in production. What is the MOST likely reason?",
    scenario:
      "The dataset used for training was collected from a controlled environment. In production, real user behavior differs significantly.",
    multiSelect: false,
    weight: 5,
    options: [
      { id: "a", text: "Overfitting due to data leakage", correct: true },
      { id: "b", text: "Low learning rate", correct: false },
      { id: "c", text: "Too many epochs", correct: false },
      { id: "d", text: "High batch size", correct: false },
    ],
  },
  {
    id: "q2",
    question: "Which metrics are MOST appropriate for fraud detection?",
    scenario:
      "Fraud cases are rare compared to normal transactions.",
    multiSelect: true,
    weight: 6,
    options: [
      { id: "a", text: "Accuracy", correct: false },
      { id: "b", text: "Precision", correct: true },
      { id: "c", text: "Recall", correct: true },
      { id: "d", text: "ROC-AUC", correct: true },
    ],
  },
  {
    id: "q3",
    question: "Bias-Variance tradeoff in an imbalanced dataset means?",
    multiSelect: false,
    weight: 5,
    options: [
      { id: "a", text: "High bias ignores minority class", correct: true },
      { id: "b", text: "High variance improves recall", correct: false },
      { id: "c", text: "Variance solves imbalance", correct: false },
      { id: "d", text: "Bias is unrelated to imbalance", correct: false },
    ],
  },
  {
    id: "q4",
    question: "Which is a strong indicator of feature leakage?",
    scenario:
      "A feature is derived from future information not available at prediction time.",
    multiSelect: true,
    weight: 6,
    options: [
      { id: "a", text: "Sudden spike in validation accuracy", correct: true },
      { id: "b", text: "Consistent train and test scores", correct: false },
      { id: "c", text: "Feature uses post-event data", correct: true },
      { id: "d", text: "Model converges faster", correct: false },
    ],
  },
  {
    id: "q5",
    question: "Best strategy to handle concept drift in production?",
    multiSelect: false,
    weight: 5,
    options: [
      { id: "a", text: "Periodic retraining with fresh data", correct: true },
      { id: "b", text: "Increase model depth", correct: false },
      { id: "c", text: "Freeze model weights", correct: false },
      { id: "d", text: "Use larger batch size", correct: false },
    ],
  }, {
    id: "q6",
    question: "A high AUC but low precision usually indicates?",
    multiSelect: false,
    weight: 4,
    options: [
      { id: "a", text: "Class imbalance", correct: true },
      { id: "b", text: "Model underfitting", correct: false },
      { id: "c", text: "Feature scaling issue", correct: false },
      { id: "d", text: "High variance", correct: false },
    ],
  },
  {
    id: "q7",
    question: "Which action REDUCES variance?",
    multiSelect: true,
    weight: 5,
    options: [
      { id: "a", text: "Increase training data", correct: true },
      { id: "b", text: "Reduce model complexity", correct: true },
      { id: "c", text: "Increase epochs", correct: false },
      { id: "d", text: "Add noise to labels", correct: false },
    ],
  },
  {
    id: "q8",
    question: "Why accuracy is misleading for rare disease detection?",
    multiSelect: false,
    weight: 4,
    options: [
      { id: "a", text: "True negatives dominate", correct: true },
      { id: "b", text: "Accuracy ignores recall", correct: false },
      { id: "c", text: "Precision becomes zero", correct: false },
      { id: "d", text: "Accuracy favors false positives", correct: false },
    ],
  },
  {
    id: "q9",
    question: "Which is a sign of data leakage?",
    multiSelect: true,
    weight: 6,
    options: [
      { id: "a", text: "Feature derived from target", correct: true },
      { id: "b", text: "Train accuracy slightly higher than test", correct: false },
      { id: "c", text: "Using future timestamps", correct: true },
      { id: "d", text: "Low bias", correct: false },
    ],
  },
  {
    id: "q10",
    question: "Concept drift refers to?",
    multiSelect: false,
    weight: 4,
    options: [
      { id: "a", text: "Change in data distribution over time", correct: true },
      { id: "b", text: "Overfitting on training data", correct: false },
      { id: "c", text: "Label noise", correct: false },
      { id: "d", text: "Poor feature selection", correct: false },
    ],
  },
  {
    id: "q11",
    question: "Which metric is MOST sensitive to class imbalance?",
    multiSelect: false,
    weight: 4,
    options: [
      { id: "a", text: "Accuracy", correct: true },
      { id: "b", text: "Recall", correct: false },
      { id: "c", text: "F1-score", correct: false },
      { id: "d", text: "ROC-AUC", correct: false },
    ],
  },
  {
    id: "q12",
    question: "Regularization primarily helps to?",
    multiSelect: false,
    weight: 4,
    options: [
      { id: "a", text: "Reduce overfitting", correct: true },
      { id: "b", text: "Increase learning rate", correct: false },
      { id: "c", text: "Balance dataset", correct: false },
      { id: "d", text: "Improve label quality", correct: false },
    ],
  },
  {
    id: "q13",
    question: "Which techniques handle imbalanced datasets?",
    multiSelect: true,
    weight: 6,
    options: [
      { id: "a", text: "SMOTE", correct: true },
      { id: "b", text: "Class weighting", correct: true },
      { id: "c", text: "Dropout", correct: false },
      { id: "d", text: "Early stopping", correct: false },
    ],
  },
  {
    id: "q14",
    question: "High bias model behavior?",
    multiSelect: false,
    weight: 4,
    options: [
      { id: "a", text: "Underfits training data", correct: true },
      { id: "b", text: "Overfits noise", correct: false },
      { id: "c", text: "Very low training error", correct: false },
      { id: "d", text: "Sensitive to small changes", correct: false },
    ],
  },
  {
    id: "q15",
    question: "Feature scaling is critical for?",
    multiSelect: true,
    weight: 5,
    options: [
      { id: "a", text: "KNN", correct: true },
      { id: "b", text: "SVM", correct: true },
      { id: "c", text: "Decision Trees", correct: false },
      { id: "d", text: "Random Forest", correct: false },
    ],
  },
  {
    id: "q16",
    question: "Why cross-validation is used?",
    multiSelect: false,
    weight: 4,
    options: [
      { id: "a", text: "Estimate generalization performance", correct: true },
      { id: "b", text: "Reduce dataset size", correct: false },
      { id: "c", text: "Avoid feature scaling", correct: false },
      { id: "d", text: "Increase bias", correct: false },
    ],
  },
  {
    id: "q17",
    question: "Which causes label leakage?",
    multiSelect: true,
    weight: 6,
    options: [
      { id: "a", text: "Including target in features", correct: true },
      { id: "b", text: "Using post-event attributes", correct: true },
      { id: "c", text: "Data augmentation", correct: false },
      { id: "d", text: "Normalization", correct: false },
    ],
  },
  {
    id: "q18",
    question: "ROC curve plots?",
    multiSelect: false,
    weight: 4,
    options: [
      { id: "a", text: "TPR vs FPR", correct: true },
      { id: "b", text: "Precision vs Recall", correct: false },
      { id: "c", text: "Loss vs Epoch", correct: false },
      { id: "d", text: "Accuracy vs Threshold", correct: false },
    ],
  },
  {
    id: "q19",
    question: "Which is NOT a valid reason for model failure in production?",
    multiSelect: false,
    weight: 4,
    options: [
      { id: "a", text: "Concept drift", correct: false },
      { id: "b", text: "Data leakage", correct: false },
      { id: "c", text: "Training on GPU", correct: true },
      { id: "d", text: "Distribution shift", correct: false },
    ],
  },
  {
    id: "q20",
    question: "Which improves recall?",
    multiSelect: true,
    weight: 5,
    options: [
      { id: "a", text: "Lower decision threshold", correct: true },
      { id: "b", text: "Class weighting", correct: true },
      { id: "c", text: "Higher precision constraint", correct: false },
      { id: "d", text: "Reducing training data", correct: false },
    ],
  }, 
];

/* ================= PAGE ================= */

export default function AIMLTestPage() {
  const TOTAL_TIME = 15 * 60;

  const QUESTIONS = useMemo(() => QUESTION_POOL, []);

  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState(false);

  const q = QUESTIONS[currentQ];

  /* ================= TIMER ================= */

  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const t = setInterval(() => setTimeLeft(v => v - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, submitted]);

  /* ================= HANDLERS ================= */

  function toggleOption(optionId: string) {
    setAnswers(prev => {
      const selected = prev[q.id] || [];

      if (!q.multiSelect) {
        return { ...prev, [q.id]: [optionId] };
      }

      return {
        ...prev,
        [q.id]: selected.includes(optionId)
          ? selected.filter(id => id !== optionId)
          : [...selected, optionId],
      };
    });
  }

  function handleNext() {
    if (!answers[q.id] || answers[q.id].length === 0) {
      alert("Select at least one option");
      return;
    }

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      handleSubmit();
    }
  }

  function handleSubmit() {
    let score = 0;
    let maxScore = 0;

    QUESTIONS.forEach(question => {
      maxScore += question.weight;

      const selected = answers[question.id] || [];
      const correctOptions = question.options.filter(o => o.correct).map(o => o.id);

      const isCorrect =
        selected.length === correctOptions.length &&
        selected.every(id => correctOptions.includes(id));

      if (isCorrect) score += question.weight;
    });

    console.log("AI ML TEST RESULT", {
      answers,
      score,
      maxScore,
      completedAt: new Date().toISOString(),
    });

    setSubmitted(true);
    alert("AI / ML Test Submitted");
  }

  /* ================= UI ================= */

  if (submitted) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-3">Test Completed</h1>
          <p className="text-gray-600">
            Your AI / ML reasoning assessment has been submitted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex justify-between">
        <div>
          <h1 className="font-semibold text-lg">AI / ML Reasoning Test</h1>
          <p className="text-xs text-gray-500">
            Scenario based. No coding.
          </p>
        </div>
        <div className="text-red-600 font-semibold">
          {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto p-6 w-full">
        <h2 className="text-xl font-medium mb-3">
          Question {currentQ + 1} of {QUESTIONS.length}
        </h2>

        {q.scenario && (
          <div className="bg-blue-50 border p-4 rounded mb-4 text-sm">
            {q.scenario}
          </div>
        )}

        <p className="mb-4 font-medium">{q.question}</p>

        <div className="space-y-3">
          {q.options.map(opt => (
            <label
              key={opt.id}
              className="flex items-start gap-3 p-3 border rounded cursor-pointer bg-white"
            >
              <input
                type={q.multiSelect ? "checkbox" : "radio"}
                name={q.id}
                checked={(answers[q.id] || []).includes(opt.id)}
                onChange={() => toggleOption(opt.id)}
              />
              <span>{opt.text}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleNext}
            className="bg-indigo-600 text-white px-6 py-2 rounded"
          >
            {currentQ === QUESTIONS.length - 1 ? "Submit Test" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
