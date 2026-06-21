"use client";

import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Inbox,
  LogOut,
  MapPin,
  Phone,
  User,
  Mail,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  ADMIN_PAGE_PATH,
  AUTH_CHANGE_EVENT,
  buildLoginPath,
  getAuthSession,
  logoutUser,
} from "@/lib/auth";
import {
  getConsultations,
  CONSULTATION_STATUS_LABELS,
  type ConsultationRequest,
  type ConsultationStatus,
} from "@/lib/consultation-database";

function subscribeToAuthChanges(onStoreChange: () => void) {
  window.addEventListener(AUTH_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getAdminAccessState(): "admin" | "guest" {
  const session = getAuthSession();
  return session?.user.userRole === "ADMIN" ? "admin" : "guest";
}

function getServerState(): "admin" | "guest" {
  return "guest";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const statusTone: Record<ConsultationStatus, string> = {
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  in_progress: "bg-blue-50 text-blue-700 ring-blue-200",
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
};

const statusIcon: Record<ConsultationStatus, typeof Clock3> = {
  completed: CheckCircle2,
  in_progress: CheckCircle2,
  pending: Clock3,
};

function ConsultationCard({ request }: { request: ConsultationRequest }) {
  const StatusIcon = statusIcon[request.status];

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <User className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-[family-name:var(--font-heading)] text-base font-bold text-slate-950">
              {request.name}
            </p>
            <p className="text-xs font-medium text-slate-400">{formatDate(request.createdAt)}</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${statusTone[request.status]}`}
        >
          <StatusIcon className="h-3 w-3" aria-hidden="true" />
          {CONSULTATION_STATUS_LABELS[request.status]}
        </span>
      </div>

      <div className="grid gap-0 sm:grid-cols-2">
        {/* User info */}
        <div className="space-y-3 border-b border-slate-100 px-5 py-4 sm:border-b-0 sm:border-r">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            신청자 정보
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
            {request.phone}
          </div>
          {request.email && (
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
              {request.email}
            </div>
          )}
          {request.message && (
            <div className="flex items-start gap-2 text-sm text-slate-700">
              <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
              <span className="break-keep leading-5">{request.message}</span>
            </div>
          )}
        </div>

        {/* Property info */}
        <div className="px-5 py-4">
          {request.property ? (
            <>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                관심 매물 정보
              </p>
              <div className="mt-3 space-y-3">
                <div className="flex items-start gap-2 text-sm text-slate-700">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                  <div>
                    <p className="font-medium">{request.property.address}</p>
                    <p className="text-xs text-slate-400">{request.property.region}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #0083FF, #4C2CE2)" }}
                  >
                    {request.property.dealType}
                  </span>
                  <span className="font-medium">{request.property.price}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Building2 className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                  <span>{request.property.agentName}</span>
                  <span className="text-slate-400">{request.property.agentPhone}</span>
                </div>
                {request.property.sourceUrl && (
                  <a
                    href={request.property.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-accent)] transition hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    {request.property.sourceName} 원문 링크
                  </a>
                )}
              </div>
            </>
          ) : (
            <div className="flex h-full items-center">
              <p className="text-sm text-slate-400">관심 매물 정보 없음</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const accessState = useSyncExternalStore(
    subscribeToAuthChanges,
    getAdminAccessState,
    getServerState,
  );
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);

  useEffect(() => {
    if (accessState === "guest") {
      router.replace(buildLoginPath(ADMIN_PAGE_PATH));
      return;
    }
    setConsultations(getConsultations());
  }, [accessState, router]);

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  if (accessState === "guest") return null;

  const pendingCount = consultations.filter((c) => c.status === "pending").length;

  return (
    <main className="min-h-screen bg-slate-50 pb-16 pt-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <section className="mb-8 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-white shadow-md"
              style={{ background: "linear-gradient(135deg, #0083FF, #4C2CE2)" }}
            >
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-slate-950">
                관리자 대시보드
              </h1>
              <p className="text-sm text-slate-400">HomeShopper Admin</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            로그아웃
          </button>
        </section>

        {/* Stats */}
        <section
          aria-label="상담 통계"
          className="mb-8 grid gap-4 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Inbox className="h-4 w-4" aria-hidden="true" />
              전체 상담 신청
            </div>
            <p className="mt-3 text-3xl font-extrabold text-slate-950">{consultations.length}건</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Clock3 className="h-4 w-4 text-amber-500" aria-hidden="true" />
              대기중
            </div>
            <p className="mt-3 text-3xl font-extrabold text-amber-500">{pendingCount}건</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <CalendarDays className="h-4 w-4 text-blue-500" aria-hidden="true" />
              오늘 신청
            </div>
            <p className="mt-3 text-3xl font-extrabold text-blue-600">
              {consultations.filter((c) => {
                const today = new Date().toISOString().slice(0, 10);
                return c.createdAt.startsWith(today);
              }).length}
              건
            </p>
          </div>
        </section>

        {/* Consultation list */}
        <section>
          <h2 className="mb-4 font-[family-name:var(--font-heading)] text-xl font-bold text-slate-950">
            상담 신청 목록
          </h2>

          {consultations.length > 0 ? (
            <div className="space-y-4">
              {consultations.map((request) => (
                <ConsultationCard key={request.id} request={request} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 text-center">
              <Inbox className="h-10 w-10 text-slate-300" aria-hidden="true" />
              <p className="mt-3 font-[family-name:var(--font-heading)] text-lg font-black text-slate-950">
                아직 상담 신청이 없습니다
              </p>
              <p className="mt-1 text-sm text-slate-400">
                사용자가 상담을 신청하면 여기에 표시됩니다.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
