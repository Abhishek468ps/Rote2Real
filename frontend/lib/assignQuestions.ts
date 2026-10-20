// lib/assignQuestions.ts

import { CODING_POOL } from "./codingQuestionPool";

export function assignQuestions(userId: string, attemptId: string) {
  const seed =
    Array.from(userId + attemptId).reduce((a, c) => a + c.charCodeAt(0), 0);

  const q1 = CODING_POOL[seed % CODING_POOL.length];
  const q2 =
    CODING_POOL[(seed + 3) % CODING_POOL.length];

  return [q1, q2];
}
