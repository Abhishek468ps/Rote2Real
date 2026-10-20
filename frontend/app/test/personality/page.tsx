"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/* ---------------- TYPES ---------------- */

type Trait = "logic" | "leadership" | "stress" | "ethics";

type Option = {
  text: string;
  trait: Trait;
  weight: number;
};

type Question = {
  id: string;
  scenario: string;
  options: Option[];
};

/* ---------------- QUESTIONS ---------------- */
/* Add as many as you want. 50+ is fine */

const QUESTIONS: Question[] = [
  {
    id: "p1",
    scenario: "A critical bug appears one hour before deployment. What do you do?",
    options: [
      { text: "Rollback and analyze calmly", trait: "logic", weight: 4 },
      { text: "Inform team and stakeholders", trait: "leadership", weight: 3 },
      { text: "Push a quick fix immediately", trait: "stress", weight: 2 },
      { text: "Ignore unless users complain", trait: "ethics", weight: 1 },
    ],
  },
  {
    id: "p2",
    scenario: "Your teammate consistently misses deadlines. What is your response?",
    options: [
      { text: "Talk privately and help them improve", trait: "leadership", weight: 4 },
      { text: "Report the issue formally", trait: "ethics", weight: 3 },
      { text: "Take over their tasks silently", trait: "stress", weight: 1 },
      { text: "Analyze workflow problems", trait: "logic", weight: 2 },
    ],
  },
  {
    id: "p3",
    scenario: "Requirements are unclear but deadline is fixed.",
    options: [
      { text: "Clarify scope with stakeholders", trait: "leadership", weight: 4 },
      { text: "Break problem into assumptions", trait: "logic", weight: 3 },
      { text: "Start coding and adjust later", trait: "stress", weight: 2 },
      { text: "Delay work until clarity", trait: "ethics", weight: 1 },
    ],
  },
  {
    id: "p4",
    scenario: "You notice a security loophole nobody reported.",
    options: [
      { text: "Report immediately with details", trait: "ethics", weight: 4 },
      { text: "Fix quietly and move on", trait: "logic", weight: 3 },
      { text: "Ignore since no incident yet", trait: "stress", weight: 1 },
      { text: "Discuss with team first", trait: "leadership", weight: 2 },
    ],
  },
  {
    id: "p5",
    scenario: "Client requests a feature that breaks system design.",
    options: [
      { text: "Explain technical risks clearly", trait: "logic", weight: 4 },
      { text: "Escalate decision to management", trait: "leadership", weight: 3 },
      { text: "Implement quickly to satisfy client", trait: "stress", weight: 1 },
      { text: "Reject request politely", trait: "ethics", weight: 2 },
    ],
  },

  /* ---- Continue pattern ---- */

  {
    id: "p6",
    scenario: "You are assigned a task outside your expertise.",
    options: [
      { text: "Learn basics and attempt solution", trait: "logic", weight: 3 },
      { text: "Ask for guidance immediately", trait: "leadership", weight: 4 },
      { text: "Delay until reassigned", trait: "stress", weight: 1 },
      { text: "Decline responsibility", trait: "ethics", weight: 2 },
    ],
  },

  {
    id: "p7",
    scenario: "A deadline is impossible without cutting corners.",
    options: [
      { text: "Negotiate deadline realistically", trait: "leadership", weight: 4 },
      { text: "Cut corners silently", trait: "stress", weight: 1 },
      { text: "Deliver partial but honest work", trait: "ethics", weight: 3 },
      { text: "Optimize scope logically", trait: "logic", weight: 2 },
    ],
  },

  {
    id: "p8",
    scenario: "You disagree with your manager’s technical decision.",
    options: [
      { text: "Present data and alternatives", trait: "logic", weight: 4 },
      { text: "Accept decision silently", trait: "ethics", weight: 2 },
      { text: "Argue emotionally", trait: "stress", weight: 1 },
      { text: "Discuss privately", trait: "leadership", weight: 3 },
    ],
  },

  {
    id: "p9",
    scenario: "A teammate takes credit for your work.",
    options: [
      { text: "Address issue professionally", trait: "ethics", weight: 4 },
      { text: "Escalate with evidence", trait: "leadership", weight: 3 },
      { text: "Ignore to avoid conflict", trait: "stress", weight: 1 },
      { text: "Document future work clearly", trait: "logic", weight: 2 },
    ],
  },

  {
    id: "p10",
    scenario: "You are overloaded with tasks.",
    options: [
      { text: "Prioritize based on impact", trait: "logic", weight: 4 },
      { text: "Ask for help or redistribution", trait: "leadership", weight: 3 },
      { text: "Work overtime silently", trait: "stress", weight: 2 },
      { text: "Drop low priority tasks without notice", trait: "ethics", weight: 1 },
    ],
  },

  {
  id: "p11",
  scenario: "You are asked to estimate a task with limited data.",
  options: [
    { text: "Break task into assumptions", trait: "logic", weight: 4 },
    { text: "Ask senior for estimate", trait: "leadership", weight: 3 },
    { text: "Give random estimate", trait: "stress", weight: 1 },
    { text: "Refuse estimation", trait: "ethics", weight: 2 },
  ],
},
{
  id: "p12",
  scenario: "A teammate pushes untested code to production.",
  options: [
    { text: "Stop deployment and test", trait: "ethics", weight: 4 },
    { text: "Fix issues post release", trait: "stress", weight: 1 },
    { text: "Create rollback plan", trait: "logic", weight: 3 },
    { text: "Escalate immediately", trait: "leadership", weight: 2 },
  ],
},
{
  id: "p13",
  scenario: "You receive negative feedback publicly.",
  options: [
    { text: "Accept and improve", trait: "ethics", weight: 4 },
    { text: "Discuss privately later", trait: "leadership", weight: 3 },
    { text: "Defend aggressively", trait: "stress", weight: 1 },
    { text: "Analyze feedback objectively", trait: "logic", weight: 2 },
  ],
},
{
  id: "p14",
  scenario: "Multiple bugs reported simultaneously.",
  options: [
    { text: "Prioritize by impact", trait: "logic", weight: 4 },
    { text: "Assign team roles", trait: "leadership", weight: 3 },
    { text: "Fix randomly", trait: "stress", weight: 1 },
    { text: "Document before fixing", trait: "ethics", weight: 2 },
  ],
},
{
  id: "p15",
  scenario: "A shortcut saves time but reduces quality.",
  options: [
    { text: "Avoid shortcut", trait: "ethics", weight: 4 },
    { text: "Discuss tradeoffs", trait: "leadership", weight: 3 },
    { text: "Use shortcut silently", trait: "stress", weight: 1 },
    { text: "Evaluate risks logically", trait: "logic", weight: 2 },
  ],
},
{
  id: "p21",
  scenario: "You are unsure about requirements.",
  options: [
    { text: "Clarify before proceeding", trait: "ethics", weight: 4 },
    { text: "Prototype assumptions", trait: "logic", weight: 3 },
    { text: "Proceed blindly", trait: "stress", weight: 1 },
    { text: "Ask team consensus", trait: "leadership", weight: 2 },
  ],
},
{
  id: "p22",
  scenario: "Your idea is rejected in meeting.",
  options: [
    { text: "Accept gracefully", trait: "ethics", weight: 4 },
    { text: "Ask for reasoning", trait: "logic", weight: 3 },
    { text: "Argue emotionally", trait: "stress", weight: 1 },
    { text: "Follow up later", trait: "leadership", weight: 2 },
  ],
},
{
  id: "p23",
  scenario: "Production system slows unexpectedly.",
  options: [
    { text: "Analyze metrics first", trait: "logic", weight: 4 },
    { text: "Inform stakeholders", trait: "leadership", weight: 3 },
    { text: "Restart blindly", trait: "stress", weight: 1 },
    { text: "Document incident", trait: "ethics", weight: 2 },
  ],
},
{
  id: "p24",
  scenario: "A junior asks same question repeatedly.",
  options: [
    { text: "Explain patiently", trait: "leadership", weight: 4 },
    { text: "Share resources", trait: "logic", weight: 3 },
    { text: "Ignore", trait: "stress", weight: 1 },
    { text: "Ask them to self learn", trait: "ethics", weight: 2 },
  ],
},
{
  id: "p25",
  scenario: "Deadline conflicts with personal commitment.",
  options: [
    { text: "Communicate early", trait: "ethics", weight: 4 },
    { text: "Reprioritize tasks", trait: "logic", weight: 3 },
    { text: "Miss deadline silently", trait: "stress", weight: 1 },
    { text: "Ask help from team", trait: "leadership", weight: 2 },
  ],
},
{
  id: "p31",
  scenario: "You detect copied code in project.",
  options: [
    { text: "Report issue", trait: "ethics", weight: 4 },
    { text: "Verify license", trait: "logic", weight: 3 },
    { text: "Ignore", trait: "stress", weight: 1 },
    { text: "Discuss with team", trait: "leadership", weight: 2 },
  ],
},
{
  id: "p32",
  scenario: "Unexpected scope increase occurs.",
  options: [
    { text: "Re-evaluate timeline", trait: "logic", weight: 4 },
    { text: "Inform stakeholders", trait: "leadership", weight: 3 },
    { text: "Work extra hours", trait: "stress", weight: 2 },
    { text: "Deliver reduced quality", trait: "ethics", weight: 1 },
  ],
},
{
  id: "p33",
  scenario: "Team morale is low.",
  options: [
    { text: "Motivate and listen", trait: "leadership", weight: 4 },
    { text: "Analyze root cause", trait: "logic", weight: 3 },
    { text: "Ignore emotions", trait: "stress", weight: 1 },
    { text: "Escalate concern", trait: "ethics", weight: 2 },
  ],
},
{
  id: "p34",
  scenario: "A fix breaks another feature.",
  options: [
    { text: "Rollback and test", trait: "logic", weight: 4 },
    { text: "Inform affected users", trait: "ethics", weight: 3 },
    { text: "Patch quickly", trait: "stress", weight: 1 },
    { text: "Coordinate team response", trait: "leadership", weight: 2 },
  ],
},
{
  id: "p35",
  scenario: "You are asked to work unpaid overtime.",
  options: [
    { text: "Clarify expectations", trait: "ethics", weight: 4 },
    { text: "Negotiate scope", trait: "logic", weight: 3 },
    { text: "Agree silently", trait: "stress", weight: 1 },
    { text: "Discuss with manager", trait: "leadership", weight: 2 },
  ],
},
{
  id: "p41",
  scenario: "Client misunderstands technical limitation.",
  options: [
    { text: "Explain clearly", trait: "leadership", weight: 4 },
    { text: "Show data proof", trait: "logic", weight: 3 },
    { text: "Ignore confusion", trait: "stress", weight: 1 },
    { text: "Document explanation", trait: "ethics", weight: 2 },
  ],
},
{
  id: "p42",
  scenario: "You feel burned out.",
  options: [
    { text: "Communicate workload", trait: "ethics", weight: 4 },
    { text: "Reprioritize tasks", trait: "logic", weight: 3 },
    { text: "Push harder", trait: "stress", weight: 1 },
    { text: "Ask team support", trait: "leadership", weight: 2 },
  ],
},
{
  id: "p43",
  scenario: "A feature is technically correct but confusing for users.",
  options: [
    { text: "Improve UX", trait: "ethics", weight: 4 },
    { text: "Analyze user feedback", trait: "logic", weight: 3 },
    { text: "Ship as is", trait: "stress", weight: 1 },
    { text: "Discuss redesign", trait: "leadership", weight: 2 },
  ],
},
{
  id: "p44",
  scenario: "A teammate violates process.",
  options: [
    { text: "Address respectfully", trait: "ethics", weight: 4 },
    { text: "Explain process value", trait: "leadership", weight: 3 },
    { text: "Ignore", trait: "stress", weight: 1 },
    { text: "Document issue", trait: "logic", weight: 2 },
  ],
},
{
  id: "p45",
  scenario: "You are unsure about a decision you made.",
  options: [
    { text: "Review decision calmly", trait: "logic", weight: 4 },
    { text: "Ask feedback", trait: "leadership", weight: 3 },
    { text: "Avoid thinking", trait: "stress", weight: 1 },
    { text: "Accept responsibility", trait: "ethics", weight: 2 },
  ],
},
{
  id: "p46",
  scenario: "Team faces tight deadline.",
  options: [
    { text: "Plan and prioritize", trait: "logic", weight: 4 },
    { text: "Motivate team", trait: "leadership", weight: 3 },
    { text: "Rush work", trait: "stress", weight: 1 },
    { text: "Maintain quality", trait: "ethics", weight: 2 },
  ],
},
{
  id: "p47",
  scenario: "A solution works but is hard to maintain.",
  options: [
    { text: "Refactor", trait: "ethics", weight: 4 },
    { text: "Analyze tradeoffs", trait: "logic", weight: 3 },
    { text: "Ship anyway", trait: "stress", weight: 1 },
    { text: "Discuss alternatives", trait: "leadership", weight: 2 },
  ],
},
{
  id: "p48",
  scenario: "You receive unclear feedback.",
  options: [
    { text: "Ask clarification", trait: "leadership", weight: 4 },
    { text: "Analyze context", trait: "logic", weight: 3 },
    { text: "Ignore", trait: "stress", weight: 1 },
    { text: "Document concerns", trait: "ethics", weight: 2 },
  ],
},
{
  id: "p49",
  scenario: "You see risk others ignore.",
  options: [
    { text: "Raise concern", trait: "ethics", weight: 4 },
    { text: "Prepare mitigation", trait: "logic", weight: 3 },
    { text: "Stay silent", trait: "stress", weight: 1 },
    { text: "Convince team", trait: "leadership", weight: 2 },
  ],
},
{
  id: "p50",
  scenario: "Project succeeds but credit distribution is unfair.",
  options: [
    { text: "Address respectfully", trait: "ethics", weight: 4 },
    { text: "Discuss with leadership", trait: "leadership", weight: 3 },
    { text: "Ignore", trait: "stress", weight: 1 },
    { text: "Document contribution", trait: "logic", weight: 2 },
  ],
},

];


/* ---------------- HELPERS ---------------- */

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* ---------------- COMPONENT ---------------- */

export default function PersonalityTestPage() {
  const router = useRouter();

   /* ---- CONFIG ---- */
  const TIME_PER_QUESTION = 15;
  const PASS_SCORE = 120;
  const MIN_AVG_TIME = 5;
  const MAX_SAME_OPTION = 10;
  const MAX_TAB_VIOLATIONS = 2;
  const MAX_REFRESH_ALLOWED = 1;

  const [questions, setQuestions] = useState<Question[]>(QUESTIONS);
  const [isReady, setIsReady] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [traitScores, setTraitScores] = useState<Record<Trait, number>>({
    logic: 0,
    leadership: 0,
    stress: 0,
    ethics: 0,
  });

  const [responseTimes, setResponseTimes] = useState<number[]>([]);
  const [optionHistory, setOptionHistory] = useState<string[]>([]);

  const questionStartRef = useRef<number>(Date.now());
   const tabViolationCount = useRef(0);
  const warnedTab = useRef(false);


  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  /* ---------------- CLIENT-SIDE SHUFFLE ---------------- */
 useEffect(() => {
    setQuestions(shuffle(QUESTIONS));
    setIsReady(true);
  }, []);
  /* ---------------- TIMER ---------------- */
 
  useEffect(() => {
    if (!isReady) return;
    setTimeLeft(TIME_PER_QUESTION);
    setSelectedOption(null);
    questionStartRef.current = Date.now();

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          forceNext();
          return TIME_PER_QUESTION;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex , isReady]);

   /* ---------------- TAB / WINDOW BLUR DETECTION ---------------- */

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        tabViolationCount.current += 1;

        if (!warnedTab.current) {
          alert("Warning: Tab switching is not allowed during the test.");
          warnedTab.current = true;
          return;
        }

        if (tabViolationCount.current >= MAX_TAB_VIOLATIONS) {
          finishTest();
        }
      }
    };

     const handleBlur = () => {
      tabViolationCount.current += 1;
      if (tabViolationCount.current >= MAX_TAB_VIOLATIONS) {
        finishTest();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  /* ---------------- REFRESH + BACK BUTTON ---------------- */

  useEffect(() => {
    const reloadCount = Number(
      sessionStorage.getItem("reloadCount") || "0"
    );
    sessionStorage.setItem("reloadCount", String(reloadCount + 1));

    if (reloadCount >= MAX_REFRESH_ALLOWED) {
      finishTest();
    }

    const preventNav = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

     history.pushState(null, "", location.href);
    window.addEventListener("beforeunload", preventNav);

    return () => window.removeEventListener("beforeunload", preventNav);
  }, []);

  /* ---------------- ANSWERS ---------------- */

  const selectOption = (opt: Option) => setSelectedOption(opt);

  const recordAnswer = () => {
    if (!selectedOption) return;

    const timeTaken = Math.floor(
      (Date.now() - questionStartRef.current) / 1000
    );

    setResponseTimes((p) => [...p, timeTaken]);
    setOptionHistory((p) => [...p, selectedOption.text]);

    setTraitScores((p) => ({
      ...p,
      [selectedOption.trait]: p[selectedOption.trait] + selectedOption.weight,
    }));

    nextQuestion();
  };

  const forceNext = () => {
    setResponseTimes((p) => [...p, TIME_PER_QUESTION]);
    nextQuestion();
  };

  const nextQuestion = () => {
    if (isLast) finishTest();
    else setCurrentIndex((i) => i + 1);
  };

  /* ---------------- SUSPICIOUS CHECK ---------------- */

  const isSuspicious = () => {
    if (responseTimes.length === 0) return true;

    const avgTime =
      responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;

    const counts = optionHistory.reduce<Record<string, number>>((a, o) => {
      a[o] = (a[o] || 0) + 1;
      return a;
    }, {});

    const mostRepeated = Math.max(...Object.values(counts));

    return avgTime < MIN_AVG_TIME || mostRepeated >= MAX_SAME_OPTION;
  };

  /* ---------------- FINISH ---------------- */

  const finishTest = () => {
    const totalScore = Object.values(traitScores).reduce((a, b) => a + b, 0);

    const avgResponseTime =
      responseTimes.length > 0
        ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
        : 0;

    const payload = {
      traitScores,
      totalScore,
      avgResponseTime,
      suspicious: isSuspicious(),
    };

    localStorage.setItem("personalityResult", JSON.stringify(payload));

    if (payload.suspicious || totalScore < PASS_SCORE) {
      router.push("/test/personality-failed");
      return;
    }

    const division = localStorage.getItem("division");

    switch (division) {
      case "Software Development":
        router.push("/test/coding");
        break;
      case "AI / ML":
        router.push("/test/ai-ml");
        break;
      case "Data Analytics":
        router.push("/test/data-analytics");
        break;
      case "Automation":
        router.push("/test/automation");
        break;
      default:
        router.push("/test/selection-error");
    }
  };

  /* ---------------- UI ---------------- */

  const progress =
    questions.length > 0
      ? ((currentIndex + 1) / questions.length) * 100
      : 0;

  if (!isReady) {
    return <p className="text-center mt-20">Loading assessment…</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold mb-4">Personality Assessment</h1>

        <div className="h-2 bg-gray-200 rounded mb-4">
          <div className="h-2 bg-blue-600 rounded" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex justify-between text-sm mb-6">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span className="text-red-600">Time left. {timeLeft}s</span>
        </div>

        <p className="text-lg font-medium mb-6">{currentQuestion.scenario}</p>

        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => selectOption(opt)}
              className={`w-full text-left p-4 border rounded-lg ${
                selectedOption === opt
                  ? "border-blue-600 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            >
              {opt.text}
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <button onClick={finishTest} className="text-sm text-gray-500 hover:underline">
            Submit Test
          </button>
          <button
            onClick={recordAnswer}
            disabled={!selectedOption}
            className={`px-6 py-2 rounded-lg text-white ${
              selectedOption ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            {isLast ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}