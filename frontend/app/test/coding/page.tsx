
"use client";

import { useEffect, useMemo, useState } from "react";
import Editor from "@monaco-editor/react";

/* ================= TYPES ================= */

type Difficulty = "hard";

type Question = {
  id: string;
  title: string;
  description: string;
  constraints: string[];
  examples: string[];
  difficulty: Difficulty;
  tags: string[];
};

type Answer = {
  code: string;
  approach: string;
  language: "javascript" | "python" | "java" | "cpp";
  locked: boolean;
};

/* ================= QUESTION POOL ================= */

const QUESTION_POOL: Question[] = [
  {
    id: "rate-limiter",
    title: "Implement a Token Bucket Rate Limiter",
    description:
      "Design and implement a token bucket rate limiter that allows N requests per second. The solution should be efficient and thread-safe.",
    constraints: [
      "1 ≤ N ≤ 10^6",
      "O(1) per request",
      "No external libraries",
    ],
    examples: [
      "Input: allowRequest() called 5 times per second",
      "Output: true until limit exceeded, then false",
    ],
    difficulty: "hard",
    tags: ["system-design", "concurrency"],
  },
  {
    id: "memory-leak",
    title: "Fix the Memory Leak",
    description:
      "Given a long-running service that consumes increasing memory over time, identify the cause and refactor the code to prevent memory leaks.",
    constraints: [
      "Service must run continuously",
      "No global unbounded storage",
    ],
    examples: ["Explain the leak source and fix"],
    difficulty: "hard",
    tags: ["performance", "debugging"],
  },
  {
    id: "api-design",
    title: "Design REST API Contract",
    description:
      "Design a REST API contract for a scalable user authentication service. Focus on endpoints, request/response structure, and error handling.",
    constraints: [
      "REST compliant",
      "Stateless",
      "Secure token handling",
    ],
    examples: ["POST /auth/login", "POST /auth/refresh"],
    difficulty: "hard",
    tags: ["api-design", "backend"],
  },
];

/* ================= LANGUAGE TEMPLATES ================= */

const LANGUAGE_TEMPLATES: Record<string, string> = {
  javascript: `// JavaScript Solution
function solve() {

}`,
  python: `# Python Solution
def solve():
    pass`,
  java: `// Java Solution
class Solution {
    public static void main(String[] args) {

    }
}`,
  cpp: `// C++ Solution
#include <bits/stdc++.h>
using namespace std;

int main() {

}`,
};

/* ================= UTIL ================= */

function seededShuffle<T>(array: T[], seed: number): T[] {
  const result = [...array];
  let m = result.length;
  let s = seed;

  while (m) {
    const i = Math.floor(Math.abs(Math.sin(s++)) * m--);
    [result[m], result[i]] = [result[i], result[m]];
  }

  return result;
}

/* ================= PAGE ================= */

export default function SoftwareCodingTestPage() {
  const USER_SEED = 2025;

  const QUESTIONS = useMemo(
    () => seededShuffle(QUESTION_POOL, USER_SEED).slice(0, 2),
    []
  );

  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [fullscreen, setFullscreen] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  const [answers, setAnswers] = useState<Record<string, Answer>>(() => {
    const initial: Record<string, Answer> = {};
    QUESTIONS.forEach(q => {
      initial[q.id] = {
        code: LANGUAGE_TEMPLATES.javascript,
        approach: "",
        language: "javascript",
        locked: false,
      };
    });
    return initial;
  });

  const q = QUESTIONS[currentQ];
  const answer = answers[q.id];

  /* ================= TIMER ================= */

  useEffect(() => {
    if (timeLeft <= 0) {
      handleNext();
      return;
    }

    const t = setInterval(() => {
      setTimeLeft(v => v - 1);
    }, 1000);

    return () => clearInterval(t);
  }, [timeLeft]);

  /* ================= TAB SWITCH TRACK ================= */

  useEffect(() => {
    const onBlur = () => setTabSwitchCount(c => c + 1);

    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) onBlur();
    });

    return () => window.removeEventListener("blur", onBlur);
  }, []);

  /* ================= COPY PASTE BLOCK ================= */

  useEffect(() => {
    const block = (e: Event) => e.preventDefault();

    ["copy", "paste", "cut", "contextmenu"].forEach(evt =>
      document.addEventListener(evt, block)
    );

    return () => {
      ["copy", "paste", "cut", "contextmenu"].forEach(evt =>
        document.removeEventListener(evt, block)
      );
    };
  }, []);

  /* ================= HANDLERS ================= */

  function updateAnswer(partial: Partial<Answer>) {
    setAnswers(prev => ({
      ...prev,
      [q.id]: { ...prev[q.id], ...partial },
    }));
  }

  function handleNext() {
    if (!answer.code.trim()) {
      alert("Code is mandatory");
      return;
    }

    setAnswers(prev => ({
      ...prev,
      [q.id]: { ...prev[q.id], locked: true },
    }));

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(c => c + 1);
      setTimeLeft(45 * 60);
    } else {
      if (!answer.approach.trim()) {
        alert("Approach explanation is required");
        return;
      }

      console.log("SUBMISSION PAYLOAD", {
        answers,
        tabSwitchCount,
        completedAt: new Date().toISOString(),
      });

      alert("Coding Test Submitted Successfully");
    }
  }

  /* ================= UI ================= */

  return (
    <div className={`h-screen flex flex-col ${fullscreen ? "fixed inset-0 z-50 bg-black" : ""}`}>
      {/* Header */}
      <div className="flex justify-between px-6 py-4 border-b bg-white">
        <div>
          <h1 className="font-semibold text-lg">Software Development Coding Test</h1>
          <p className="text-xs text-gray-500">
            HARD • {q.tags.join(", ")}
          </p>
        </div>
        <div className="text-red-600 font-semibold">
          {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </div>
      </div>

      <div className="flex flex-1">
        {/* Question Panel */}
        <div className="w-2/5 p-6 border-r overflow-y-auto bg-white">
          <h2 className="text-xl font-semibold mb-4">{q.title}</h2>
          <p className="mb-4">{q.description}</p>

          <h3 className="font-medium">Constraints</h3>
          <ul className="list-disc ml-6 mb-4">
            {q.constraints.map(c => (
              <li key={c}>{c}</li>
            ))}
          </ul>

          <h3 className="font-medium">Examples</h3>
          {q.examples.map(e => (
            <pre key={e} className="bg-gray-100 p-2 rounded mb-2 text-sm">
              {e}
            </pre>
          ))}
        </div>

        {/* Editor Panel */}
        <div className="w-3/5 flex flex-col p-6">
          <div className="flex justify-between mb-2">
            <select
              disabled={answer.locked}
              value={answer.language}
              onChange={e =>
                updateAnswer({
                  language: e.target.value as Answer["language"],
                  code: LANGUAGE_TEMPLATES[e.target.value],
                })
              }
              className="border px-2 py-1 rounded"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>

            <button
              onClick={() => setFullscreen(f => !f)}
              className="text-sm underline"
            >
              {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
          </div>

          <div className="flex-1 border rounded overflow-hidden">
            <Editor
              height="100%"
              language={answer.language}
              theme="vs-dark"
              value={answer.code}
              onChange={v => updateAnswer({ code: v || "" })}
              options={{
                readOnly: answer.locked,
                minimap: { enabled: false },
                fontSize: 14,
                automaticLayout: true,
              }}
            />
          </div>

          <textarea
            disabled={answer.locked}
            className="mt-4 border rounded p-4"
            placeholder="Explain your approach, trade-offs, and complexity"
            value={answer.approach}
            onChange={e => updateAnswer({ approach: e.target.value })}
          />

          <div className="flex justify-between mt-4">
            <span className="text-xs text-gray-500">
              Tab switches detected: {tabSwitchCount}
            </span>
            <button
              onClick={handleNext}
              className="bg-indigo-600 text-white px-6 py-2 rounded"
            >
              {currentQ === QUESTIONS.length - 1 ? "Submit Test" : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
