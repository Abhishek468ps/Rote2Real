// lib/codingQuestionPool.ts

export type CodingQuestion = {
  id: string;
  title: string;
  difficulty: "easy" | "medium";
  description: string;
  input: string;
  output: string;
  constraints: string[];
  examples: { input: string; output: string }[];
};

export const CODING_POOL: CodingQuestion[] = [
  {
    id: "Q1",
    title: "First Non-Repeating Character",
    difficulty: "easy",
    description:
      "Given a string, find the first non-repeating character and return its index. If none exists, return -1.",
    input: "A string s",
    output: "Index of first unique character",
    constraints: ["1 ≤ s.length ≤ 10^5"],
    examples: [
      { input: "leetcode", output: "0" },
      { input: "loveleetcode", output: "2" },
    ],
  },
  {
    id: "Q2",
    title: "Valid Parentheses",
    difficulty: "easy",
    description:
      "Given a string containing brackets (), {}, [], determine if the input string is valid.",
    input: "A string s",
    output: "true or false",
    constraints: ["1 ≤ s.length ≤ 10^4"],
    examples: [
      { input: "()[]{}", output: "true" },
      { input: "(]", output: "false" },
    ],
  },
  {
    id: "Q3",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    description:
      "Find the length of the longest substring without repeating characters.",
    input: "A string s",
    output: "Length of longest substring",
    constraints: ["1 ≤ s.length ≤ 10^5"],
    examples: [
      { input: "abcabcbb", output: "3" },
      { input: "bbbbb", output: "1" },
    ],
  },
  {
    id: "Q4",
    title: "Two Sum Variant",
    difficulty: "medium",
    description:
      "Return indices of the two numbers such that they add up to a specific target.",
    input: "Array of integers nums, integer target",
    output: "Two indices",
    constraints: ["2 ≤ nums.length ≤ 10^5"],
    examples: [{ input: "[2,7,11,15], target=9", output: "[0,1]" }],
  },
];
