import { API_ENDPOINTS } from "@/lib/api";

export const ROTE2REAL_SESSION_KEY = "rote2real_session";

export type Rote2RealSession = {
  studentId: number;
  name: string;
  email: string;
  paymentStatus: string;
  enrolled: boolean;
};

export type Rote2RealExercise = {
  id: number;
  dayNumber: number;
  title: string;
  description: string;
  category: string;
  requiresEvidence: boolean;
  evidenceType: string;
  orderIndex: number;
  isActive: boolean;
  submissionStatus?: string | null;
  evidenceText?: string | null;
  evidenceUrl?: string | null;
  evidenceFilePath?: string | null;
  qualityScore?: number | null;
};

export type Rote2RealSubmission = {
  id: number;
  studentId: number;
  exerciseId: number;
  dayNumber: number;
  exerciseTitle: string;
  category: string;
  status: string;
  evidenceText?: string | null;
  evidenceUrl?: string | null;
  evidenceFilePath?: string | null;
  qualityScore?: number | null;
  submittedAt?: string | null;
};

export type Rote2RealRegistration = {
  studentId: number;
  name: string;
  email: string;
  phone?: string | null;
  country: string;
  universityName?: string | null;
  courseDegree?: string | null;
  yearOfStudy?: string | null;
  track?: string | null;
  isInternational: boolean;
  paymentAmountMinor: number;
  paymentCurrency: string;
  razorpayOrderId?: string | null;
  razorpayKeyId?: string | null;
  paymentStatus: string;
  registeredAt?: string | null;
  message?: string | null;
};

export type Rote2RealPaymentVerification = {
  studentId: number;
  email: string;
  paymentStatus: string;
  razorpayPaymentId?: string | null;
  enrolled: boolean;
  message?: string | null;
};

export type Rote2RealProgress = {
  studentId: number;
  studentName: string;
  studentEmail: string;
  totalExercises: number;
  completedExercises: number;
  pendingExercises: number;
  completionPercentage: number;
  categoryProgress?: Record<string, number>;
  categoryTotals?: Record<string, number>;
  recentSubmissions?: Rote2RealSubmission[];
};

export type SkillAreaBreakdown = {
  category: string;
  total: number;
  completed: number;
  completionRate: number;
  averageScore: number;
};

export type Rote2RealReport = {
  studentId: number;
  studentName: string;
  studentEmail: string;
  country: string;
  isInternational: boolean;
  totalExercises: number;
  completedExercises: number;
  completionPercentage: number;
  evidenceScore: number;
  consistencyPercentage: number;
  finalScore: number;
  achievementLevel: string;
  evaluatedAt?: string | null;
  skillAreas?: Record<string, SkillAreaBreakdown>;
  exerciseResults?: Rote2RealSubmission[];
};

export const ROTE2REAL_COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Singapore",
  "United Arab Emirates",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Other",
] as const;

export function getRote2RealSession(): Rote2RealSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ROTE2REAL_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Rote2RealSession;
    if (!parsed?.studentId) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveRote2RealSession(session: Rote2RealSession) {
  localStorage.setItem(ROTE2REAL_SESSION_KEY, JSON.stringify(session));
}

export function clearRote2RealSession() {
  localStorage.removeItem(ROTE2REAL_SESSION_KEY);
}

export function formatMinorAmount(amountMinor: number, currency: string) {
  const code = (currency || "INR").toUpperCase();
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: code,
      minimumFractionDigits: 2,
    }).format(amountMinor / 100);
  } catch {
    return `${code} ${(amountMinor / 100).toFixed(2)}`;
  }
}

export function formatCategory(category?: string | null) {
  if (!category) return "General";
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function readError(response: Response): Promise<string> {
  const text = await response.text();
  if (!text) return `Request failed (${response.status})`;
  try {
    const json = JSON.parse(text) as { message?: string; error?: string };
    return json.message || json.error || text;
  } catch {
    return text;
  }
}

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(await readError(response));
  }
  return (await response.json()) as T;
}

export const rote2realApi = {
  async register(payload: {
    name: string;
    email: string;
    phone: string;
    country: string;
    universityName: string;
    courseDegree: string;
    yearOfStudy: string;
    track: string;
  }): Promise<Rote2RealRegistration> {
    const response = await fetch(API_ENDPOINTS.ROTE2REAL_REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return parseJson<Rote2RealRegistration>(response);
  },

  async verifyPayment(payload: {
    studentId: number;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }): Promise<Rote2RealPaymentVerification> {
    const response = await fetch(API_ENDPOINTS.ROTE2REAL_VERIFY_PAYMENT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return parseJson<Rote2RealPaymentVerification>(response);
  },

  async getExercises(studentId?: number): Promise<Rote2RealExercise[]> {
    const url = studentId
      ? `${API_ENDPOINTS.ROTE2REAL_EXERCISES}?studentId=${studentId}`
      : API_ENDPOINTS.ROTE2REAL_EXERCISES;
    const response = await fetch(url);
    return parseJson<Rote2RealExercise[]>(response);
  },

  async getExerciseByDay(
    day: number,
    studentId?: number
  ): Promise<Rote2RealExercise> {
    const response = await fetch(
      API_ENDPOINTS.ROTE2REAL_EXERCISE_BY_DAY(day, studentId)
    );
    return parseJson<Rote2RealExercise>(response);
  },

  async getSubmissions(studentId: number): Promise<Rote2RealSubmission[]> {
    const response = await fetch(API_ENDPOINTS.ROTE2REAL_SUBMISSIONS(studentId));
    return parseJson<Rote2RealSubmission[]>(response);
  },

  async submitEvidence(
    studentId: number,
    payload: {
      exerciseId: number;
      evidenceText?: string;
      evidenceUrl?: string;
      evidenceFilePath?: string;
    }
  ): Promise<Rote2RealSubmission> {
    const response = await fetch(API_ENDPOINTS.ROTE2REAL_SUBMISSIONS(studentId), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return parseJson<Rote2RealSubmission>(response);
  },

  async uploadEvidence(
    studentId: number,
    exerciseId: number,
    file: File
  ): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(
      API_ENDPOINTS.ROTE2REAL_UPLOAD_EVIDENCE(studentId, exerciseId),
      { method: "POST", body: formData }
    );
    const data = await parseJson<{ filePath: string }>(response);
    return data.filePath;
  },

  async getProgress(studentId: number): Promise<Rote2RealProgress> {
    const response = await fetch(API_ENDPOINTS.ROTE2REAL_PROGRESS(studentId));
    return parseJson<Rote2RealProgress>(response);
  },

  async getReport(studentId: number): Promise<Rote2RealReport> {
    const response = await fetch(API_ENDPOINTS.ROTE2REAL_REPORT(studentId));
    return parseJson<Rote2RealReport>(response);
  },
};
