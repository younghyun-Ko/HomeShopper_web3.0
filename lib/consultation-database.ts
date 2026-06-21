export type ParsedPropertyInfo = {
  address: string;
  agentName: string;
  agentPhone: string;
  dealType: string;
  price: string;
  region: string;
  sourceName: string;
  sourceUrl: string;
};

export type ConsultationStatus = "pending" | "in_progress" | "completed";

export type ConsultationRequest = {
  createdAt: string;
  email: string;
  id: string;
  message: string;
  name: string;
  phone: string;
  property: ParsedPropertyInfo | null;
  status: ConsultationStatus;
};

const STORAGE_KEY = "homeshopper:consultations";

function readJson<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function getConsultations(): ConsultationRequest[] {
  if (typeof window === "undefined") return [];
  return readJson<ConsultationRequest[]>(localStorage.getItem(STORAGE_KEY), []);
}

export function saveConsultation(
  data: Omit<ConsultationRequest, "id" | "createdAt" | "status">,
): ConsultationRequest {
  const all = getConsultations();
  const record: ConsultationRequest = {
    ...data,
    createdAt: new Date().toISOString(),
    id: `consult-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    status: "pending",
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...all]));
  return record;
}

export const CONSULTATION_STATUS_LABELS: Record<ConsultationStatus, string> = {
  completed: "상담 완료",
  in_progress: "진행중",
  pending: "대기중",
};
