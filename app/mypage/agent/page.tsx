"use client";

import {
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Check,
  Clock3,
  Inbox,
  MessageSquare,
  RefreshCcw,
  TrendingDown,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  AGENT_MY_PAGE_PATH,
  AUTH_CHANGE_EVENT,
  buildLoginPath,
  getAuthSession,
  getMyPagePathByRole,
} from "@/lib/auth";
import {
  GENERAL_MY_PAGE_PROPOSALS,
  PROPOSAL_STATUS_LABELS,
  type ProposalStatus,
  type ProposalWithProduct,
} from "@/lib/proposal-database";

type FilterKey = "all" | ProposalStatus;
type AuthAccessState = "agent" | "general" | "guest";

const statusOrder: ProposalStatus[] = [
  "pending",
  "accepted",
  "rejected",
  "countered",
];

const filterLabels: Record<FilterKey, string> = {
  accepted: PROPOSAL_STATUS_LABELS.accepted,
  all: "전체",
  countered: PROPOSAL_STATUS_LABELS.countered,
  pending: PROPOSAL_STATUS_LABELS.pending,
  rejected: PROPOSAL_STATUS_LABELS.rejected,
};

const statusTone: Record<
  ProposalStatus,
  {
    badge: string;
    icon: typeof Clock3;
  }
> = {
  accepted: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    icon: CheckCircle2,
  },
  countered: {
    badge: "bg-blue-50 text-blue-700 ring-blue-200",
    icon: TrendingDown,
  },
  pending: {
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
    icon: Clock3,
  },
  rejected: {
    badge: "bg-red-50 text-red-600 ring-red-200",
    icon: XCircle,
  },
};

function subscribeToAuthChanges(onStoreChange: () => void) {
  window.addEventListener(AUTH_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getAuthAccessState(): AuthAccessState {
  const authSession = getAuthSession();

  if (!authSession) {
    return "guest";
  }

  return authSession.user.userRole === "AGENT" ? "agent" : "general";
}

function getServerAuthAccessState(): AuthAccessState {
  return "guest";
}

function formatManPrice(value: number) {
  return `${value.toLocaleString("ko-KR")}만`;
}

function getMarketPriceMan(proposal: ProposalWithProduct) {
  const adjustment = proposal.priceAdjustmentPercent;

  if (adjustment === null || adjustment === -100) {
    return proposal.proposedPriceMan;
  }

  return Math.round(proposal.proposedPriceMan / (1 + adjustment / 100));
}

function getMoveInDate(proposedAt: string) {
  const date = new Date(`${proposedAt}T00:00:00`);
  date.setMonth(date.getMonth() + 2);
  date.setDate(1);

  return date.toISOString().slice(0, 10);
}

function getProposalCounts(proposals: ProposalWithProduct[]) {
  return proposals.reduce(
    (counts, proposal) => {
      counts[proposal.status] += 1;
      counts.all += 1;
      return counts;
    },
    {
      accepted: 0,
      all: 0,
      countered: 0,
      pending: 0,
      rejected: 0,
    } satisfies Record<FilterKey, number>,
  );
}

function getAverageAdjustment(proposals: ProposalWithProduct[]) {
  if (proposals.length === 0) {
    return 0;
  }

  const total = proposals.reduce(
    (sum, proposal) => sum + (proposal.priceAdjustmentPercent ?? 0),
    0,
  );

  return total / proposals.length;
}

function StatCard({
  icon: Icon,
  label,
  toneClass,
  value,
}: {
  icon: typeof Inbox;
  label: string;
  toneClass: string;
  value: string;
}) {
  return (
    <article className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
        <Icon className={`h-4 w-4 ${toneClass}`} aria-hidden="true" />
        <span>{label}</span>
      </div>
      <p className={`mt-3 text-2xl font-extrabold tracking-normal ${toneClass}`}>
        {value}
      </p>
    </article>
  );
}

function StatusBadge({ status }: { status: ProposalStatus }) {
  const tone = statusTone[status];
  const StatusIcon = tone.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-extrabold ring-1 ${tone.badge}`}
    >
      <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
      {PROPOSAL_STATUS_LABELS[status]}
    </span>
  );
}

function ProposalRow({
  onOpen,
  proposal,
}: {
  onOpen: (proposal: ProposalWithProduct) => void;
  proposal: ProposalWithProduct;
}) {
  const adjustment = proposal.priceAdjustmentPercent;

  return (
    <button
      type="button"
      onClick={() => onOpen(proposal)}
      className="group flex w-full items-center gap-3 rounded-[14px] border border-slate-100 bg-white px-4 py-3 text-left transition hover:border-blue-200 hover:shadow-[0_12px_28px_rgba(37,99,235,0.08)] sm:px-5"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-slate-100 text-slate-500">
        <Building2 className="h-6 w-6" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <h2 className="truncate font-[family-name:var(--font-heading)] text-xs font-semibold text-slate-950 sm:text-sm">
            {proposal.product.title}
          </h2>
          <StatusBadge status={proposal.status} />
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-slate-400 sm:text-sm">
          <span>
            제안가{" "}
            <strong className="font-semibold text-slate-950">
              {formatManPrice(proposal.proposedPriceMan)}
            </strong>
          </span>
          {adjustment !== null ? (
            <span
              className={
                adjustment < 0
                  ? "text-red-500"
                  : adjustment > 0
                    ? "text-emerald-600"
                    : "text-slate-500"
              }
            >
              {adjustment > 0 ? "+" : ""}
              {adjustment.toFixed(1)}%
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            {proposal.proposedAt}
          </span>
        </div>
      </div>

      <ChevronRight
        className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500"
        aria-hidden="true"
      />
    </button>
  );
}

function ProposalDetailModal({
  onClose,
  proposal,
}: {
  onClose: () => void;
  proposal: ProposalWithProduct;
}) {
  const adjustment = proposal.priceAdjustmentPercent;
  const marketPriceMan = getMarketPriceMan(proposal);
  const moveInDate = getMoveInDate(proposal.proposedAt);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="agent-proposal-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={onClose}
    >
      <div
        className="relative w-full overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-w-md sm:rounded-3xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="border-b border-slate-100 px-5 py-4">
          <p className="text-xs font-semibold text-slate-400">
            {proposal.id.toUpperCase().replace("PROPOSAL", "OFR")}
          </p>
          <h2
            id="agent-proposal-title"
            className="mt-1 pr-10 font-[family-name:var(--font-heading)] text-lg font-semibold tracking-normal text-slate-950"
          >
            {proposal.product.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="px-5 py-4">
          <StatusBadge status={proposal.status} />

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 px-4 py-4 text-center">
              <p className="text-xs font-medium text-slate-400">매물 가격</p>
              <p className="mt-1.5 text-xl font-semibold text-slate-950">
                {formatManPrice(marketPriceMan)}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-4 text-center">
              <p className="text-xs font-medium text-slate-400">제안 가격</p>
              <p className="mt-1.5 text-xl font-semibold text-slate-950">
                {formatManPrice(proposal.proposedPriceMan)}
              </p>
              {adjustment !== null ? (
                <p
                  className={`mt-1 text-sm font-semibold ${
                    adjustment < 0 ? "text-red-500" : "text-emerald-600"
                  }`}
                >
                  {adjustment > 0 ? "+" : ""}
                  {adjustment.toFixed(1)}%
                </p>
              ) : null}
            </div>
          </div>

          <dl className="mt-4 space-y-2 text-sm font-medium">
            <div className="flex items-center justify-between gap-4">
              <dt className="inline-flex items-center gap-2 text-slate-400">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                희망 입주일
              </dt>
              <dd className="text-slate-950">{moveInDate}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="inline-flex items-center gap-2 text-slate-400">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                접수일
              </dt>
              <dd className="text-slate-950">{proposal.proposedAt}</dd>
            </div>
          </dl>

          <div className="mt-4 rounded-2xl bg-blue-50 p-4">
            <p className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600">
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              매수자 메시지
            </p>
            <p className="mt-2 text-sm font-medium text-slate-950">
              도배 장판 새로 해주시면 바로 계약하겠습니다.
            </p>
          </div>
        </div>

        <footer className="grid gap-2.5 border-t border-slate-100 p-4 sm:grid-cols-3">
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-emerald-500 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            <Check className="h-4 w-4" aria-hidden="true" />
            수락
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-red-200 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <XCircle className="h-4 w-4" aria-hidden="true" />
            거절
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-blue-200 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            <RefreshCcw className="h-4 w-4" aria-hidden="true" />
            역제안
          </button>
        </footer>
      </div>
    </div>
  );
}

export default function AgentMyPage() {
  const router = useRouter();
  const authAccessState = useSyncExternalStore(
    subscribeToAuthChanges,
    getAuthAccessState,
    getServerAuthAccessState,
  );
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [selectedProposal, setSelectedProposal] =
    useState<ProposalWithProduct | null>(null);

  useEffect(() => {
    if (authAccessState === "guest") {
      router.replace(buildLoginPath(AGENT_MY_PAGE_PATH));
      return;
    }

    if (authAccessState === "general") {
      router.replace(getMyPagePathByRole("GENERAL"));
    }
  }, [authAccessState, router]);

  const counts = useMemo(
    () => getProposalCounts(GENERAL_MY_PAGE_PROPOSALS),
    [],
  );

  const filteredProposals = useMemo(() => {
    if (activeFilter === "all") {
      return GENERAL_MY_PAGE_PROPOSALS;
    }

    return GENERAL_MY_PAGE_PROPOSALS.filter(
      (proposal) => proposal.status === activeFilter,
    );
  }, [activeFilter]);

  const acceptanceRate =
    counts.all === 0 ? 0 : (counts.accepted / counts.all) * 100;
  const averageAdjustment = getAverageAdjustment(GENERAL_MY_PAGE_PROPOSALS);

  if (authAccessState === "general") {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-12 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <section className="mb-7">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <div className="button-gradation flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] shadow-md shadow-blue-500/15">
                <BarChart3 className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <h1 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-normal text-slate-950 sm:text-2xl">
                제안 관리 대시보드
              </h1>
            </div>
            <p className="pl-12 text-sm font-semibold text-slate-400 sm:text-base">
              들어온 매물 제안을 확인하고 수락·거절·역제안을 관리하세요
            </p>
          </div>
        </section>

        <section
          aria-label="제안 통계"
          className="mb-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          <StatCard
            icon={Inbox}
            label="총 제안"
            toneClass="text-slate-950"
            value={`${counts.all}건`}
          />
          <StatCard
            icon={CheckCircle2}
            label="수락률"
            toneClass="text-emerald-600"
            value={`${acceptanceRate.toFixed(1)}%`}
          />
          <StatCard
            icon={TrendingDown}
            label="평균 조정률"
            toneClass="text-blue-600"
            value={`${averageAdjustment.toFixed(1)}%`}
          />
          <StatCard
            icon={Clock3}
            label="대기중"
            toneClass="text-orange-600"
            value={`${counts.pending}건`}
          />
        </section>

        <section className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.07)]">
          <div className="border-b border-slate-100 px-4 sm:px-5">
            <div className="flex gap-2 overflow-x-auto">
              {(["all", ...statusOrder] as FilterKey[]).map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveFilter(filter)}
                    className={`relative shrink-0 px-3 py-4 text-sm font-black transition ${
                      isActive
                        ? "text-slate-950"
                        : "text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    {filterLabels[filter]}{" "}
                    <span
                      className={
                        isActive ? "text-blue-600" : "text-slate-300"
                      }
                    >
                      {counts[filter]}
                    </span>
                    {isActive ? (
                      <span className="button-gradation absolute inset-x-2 bottom-0 h-0.5 rounded-full" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 p-4 sm:p-5">
            {filteredProposals.length > 0 ? (
              filteredProposals.map((proposal) => (
                <ProposalRow
                  key={proposal.id}
                  proposal={proposal}
                  onOpen={setSelectedProposal}
                />
              ))
            ) : (
              <div className="flex min-h-64 flex-col items-center justify-center rounded-[8px] border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
                <Inbox className="h-10 w-10 text-slate-300" aria-hidden="true" />
                <p className="mt-3 font-[family-name:var(--font-heading)] text-lg font-black text-slate-950">
                  {filterLabels[activeFilter]} 제안이 없습니다
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {selectedProposal ? (
        <ProposalDetailModal
          proposal={selectedProposal}
          onClose={() => setSelectedProposal(null)}
        />
      ) : null}
    </main>
  );
}
