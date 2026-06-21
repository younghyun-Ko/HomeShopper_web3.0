"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUp,
  Bell,
  CalendarDays,
  ChevronRight,
  Clock3,
  FileText,
  Inbox,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import {
  AUTH_CHANGE_EVENT,
  buildLoginPath,
  GENERAL_MY_PAGE_PATH,
  getAuthSession,
  getMyPagePathByRole,
} from "@/lib/auth";

type AuthAccessState = "agent" | "general" | "guest";
type ProposalFilter = "all" | "countered" | "pending" | "completed";
type ProposalStatus = Exclude<ProposalFilter, "all">;

type ProposalItem = {
  id: string;
  code: string;
  title: string;
  image: string;
  status: ProposalStatus;
  borderClass: string;
  badgeClass: string;
  myOffer: number;
  counterOffer?: number;
  marketPrice: number;
  highestOffer: number;
  lowestOffer: number;
  deltaFromHighest: number;
  proposedAt: string;
  moveInDate: string;
  message: string;
};

const proposals: ProposalItem[] = [
  {
    badgeClass: "border-amber-300 bg-amber-50 text-orange-600",
    borderClass: "border-amber-300",
    code: "OFR-001",
    deltaFromHighest: 0,
    highestOffer: 1000,
    id: "shinchon-102",
    image: "/room_pictures/KakaoTalk_Photo_2026-05-27-22-36-32 002.png",
    lowestOffer: 900,
    marketPrice: 1000,
    message: "보증금 1,000만원으로 즉시 입주 희망합니다.",
    moveInDate: "2026-07-01",
    myOffer: 1000,
    proposedAt: "2026-04-28",
    status: "pending",
    title: "신촌 연세대 인근 리모델링 첫 입주 원룸",
  },
  {
    badgeClass: "border-blue-300 bg-blue-50 text-blue-600",
    borderClass: "border-blue-300 bg-blue-50/45",
    code: "OFR-002",
    counterOffer: 1400,
    deltaFromHighest: -200,
    highestOffer: 1500,
    id: "hyehwa-103",
    image: "/room_pictures/KakaoTalk_Photo_2026-05-27-22-36-32 007.png",
    lowestOffer: 1200,
    marketPrice: 1500,
    message: "보증금을 조금 조정하여 입주하고 싶습니다.",
    moveInDate: "2026-06-15",
    myOffer: 1300,
    proposedAt: "2026-04-22",
    status: "countered",
    title: "혜화역 대학로 인근 채광 좋은 투룸 빌라",
  },
  {
    badgeClass: "border-amber-300 bg-amber-50 text-orange-600",
    borderClass: "border-amber-300",
    code: "OFR-003",
    deltaFromHighest: -200,
    highestOffer: 1050,
    id: "yongsan-104",
    image: "/room_pictures/KakaoTalk_Photo_2026-05-27-22-36-32 003.png",
    lowestOffer: 800,
    marketPrice: 900,
    message: "풀옵션 매물 선호하며 장기 거주 희망합니다.",
    moveInDate: "2026-08-01",
    myOffer: 850,
    proposedAt: "2026-05-10",
    status: "pending",
    title: "용산구 한남동 채광 우수 오피스텔",
  },
  {
    badgeClass: "border-emerald-300 bg-emerald-50 text-emerald-600",
    borderClass: "border-emerald-300",
    code: "OFR-004",
    deltaFromHighest: -200,
    highestOffer: 1700,
    id: "mapo-105",
    image: "/room_pictures/KakaoTalk_Photo_2026-05-27-22-36-32 005.png",
    lowestOffer: 1400,
    marketPrice: 2000,
    message: "최대한 합리적인 가격으로 거래하고 싶습니다.",
    moveInDate: "2026-07-15",
    myOffer: 1500,
    proposedAt: "2026-05-01",
    status: "completed",
    title: "마포구 상암 DMC 인근 전망 좋은 투룸",
  },
];

const filterLabels: Record<ProposalFilter, string> = {
  all: "전체",
  completed: "완료됨",
  countered: "역제안",
  pending: "검토 대기",
};

const statusLabels: Record<ProposalStatus, string> = {
  completed: "완료됨",
  countered: "역제안 도착!",
  pending: "검토 대기중",
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

function formatMan(value: number) {
  return `${value.toLocaleString("ko-KR")}만`;
}

function getCounts() {
  return proposals.reduce(
    (counts, proposal) => {
      counts.all += 1;
      counts[proposal.status] += 1;
      return counts;
    },
    {
      all: 0,
      completed: 0,
      countered: 0,
      pending: 0,
    } satisfies Record<ProposalFilter, number>,
  );
}

function StatusBadge({
  proposal,
  size = "sm",
}: {
  proposal: ProposalItem;
  size?: "lg" | "sm";
}) {
  const Icon = proposal.status === "pending" ? Clock3 : Bell;
  const sizeClass =
    size === "lg"
      ? "gap-1.5 px-2.5 py-1 text-xs"
      : "gap-1.5 px-3 py-1 text-xs";
  const iconClass = "h-4 w-4";

  return (
    <span
      className={`inline-flex items-center rounded-full border font-bold ${sizeClass} ${proposal.badgeClass}`}
    >
      <Icon className={iconClass} aria-hidden="true" />
      {statusLabels[proposal.status]}
    </span>
  );
}

function StatCard({
  label,
  toneClass,
  value,
}: {
  label: string;
  toneClass: string;
  value: number;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white px-4 py-5 text-center">
      <p className="text-xs font-semibold text-slate-400">{label}</p>
      <p className={`mt-2 text-2xl font-bold tracking-normal ${toneClass}`}>
        {value}
      </p>
    </article>
  );
}

function ProposalCard({
  onOpen,
  proposal,
}: {
  onOpen: (proposal: ProposalItem) => void;
  proposal: ProposalItem;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(proposal)}
      className={`group relative w-full rounded-3xl border-2 bg-white px-4 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(37,99,235,0.12)] sm:px-5 ${proposal.borderClass}`}
    >
      {proposal.status === "countered" ? (
        <span className="absolute -right-1 -top-4 inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-[11px] font-bold text-white shadow-lg shadow-blue-600/25">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          확인 필요
        </span>
      ) : null}

      <div className="flex items-center gap-3 sm:gap-5">
        <div
          className="relative shrink-0 overflow-hidden rounded-2xl bg-slate-100"
          style={{
            height: "72px",
            width: "72px",
          }}
        >
          <Image
            src={proposal.image}
            alt=""
            fill
            sizes="128px"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <h2 className="font-[family-name:var(--font-heading)] text-[15px] font-medium tracking-normal text-slate-950 sm:text-base">
                {proposal.title}
              </h2>
              <p className="mt-1.5 text-xs font-medium text-slate-400 sm:text-sm">
                나의 제안{" "}
                <strong className="text-base font-semibold text-slate-950">
                  {formatMan(proposal.myOffer)}
                </strong>
                {proposal.counterOffer ? (
                  <span className="ml-2 text-base font-semibold text-blue-600">
                    → 역제안 {formatMan(proposal.counterOffer)}
                  </span>
                ) : null}
              </p>
            </div>
            <StatusBadge proposal={proposal} />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-slate-400 sm:text-sm">
            <span className="inline-flex items-center gap-1.5 text-orange-500">
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
              최고가 대비 {formatMan(proposal.deltaFromHighest)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {proposal.proposedAt}
            </span>
          </div>
        </div>

        <ChevronRight
          className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500"
          aria-hidden="true"
        />
      </div>
    </button>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
      <Inbox className="h-12 w-12 text-slate-200" aria-hidden="true" />
      <p className="mt-5 text-base font-semibold text-slate-400">
        해당 상태의 제안이 없습니다
      </p>
    </div>
  );
}

function CompetitionBars({
  proposal,
  onEditOffer,
}: {
  proposal: ProposalItem;
  onEditOffer: () => void;
}) {
  const rows = [
    {
      colorClass: "bg-slate-300",
      label: "매물 호가",
      value: proposal.marketPrice,
    },
    {
      colorClass: "bg-red-400",
      label: "최고 제안가",
      value: proposal.highestOffer,
    },
    {
      colorClass: "bg-blue-500",
      label: "나의 제안",
      marker: true,
      value: proposal.myOffer,
    },
  ];

  const values = rows.map((r) => r.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal;
  const BASE_WIDTH = 55;

  function getBarWidth(value: number) {
    if (range === 0) return 100;
    return BASE_WIDTH + ((value - minVal) / range) * (100 - BASE_WIDTH);
  }

  const diff = proposal.highestOffer - proposal.myOffer;
  const isHighestAboveMarket = proposal.highestOffer > proposal.marketPrice;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3.5">
      <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Users className="h-4 w-4" aria-hidden="true" />
        경쟁 현황
        {isHighestAboveMarket ? (
          <span className="ml-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-500">
            호가 초과 경쟁
          </span>
        ) : null}
      </p>

      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[68px_1fr_48px] items-center gap-2.5 sm:grid-cols-[86px_1fr_56px]"
          >
            <span
              className={`text-right text-xs font-semibold ${
                row.label === "나의 제안" ? "text-blue-600" : "text-slate-400"
              }`}
            >
              {row.label}
            </span>
            <div className="relative h-5 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${row.colorClass}`}
                style={{ width: `${getBarWidth(row.value)}%` }}
              />
            </div>
            <span
              className={`text-right text-sm font-bold ${
                row.label === "나의 제안" ? "text-blue-600" : "text-slate-950"
              }`}
            >
              {row.value.toLocaleString("ko-KR")}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-2xl border border-amber-300 bg-amber-50 p-3.5">
        {diff > 0 ? (
          <>
            <p className="text-xs font-semibold text-orange-600">
              현재 최고 제안가보다{" "}
              <strong className="text-red-600">
                {Math.abs(diff).toLocaleString("ko-KR")}만원
              </strong>{" "}
              낮습니다.
            </p>
            <p className="mt-1 text-xs font-medium text-orange-500">
              {isHighestAboveMarket
                ? "경쟁이 치열합니다! 가격을 올려 계약 확률을 높여보세요."
                : "가격을 올려서 계약 확률을 높여보세요!"}
            </p>
          </>
        ) : (
          <>
            <p className="text-xs font-semibold text-blue-600">
              현재 최고 제안가와 동일하거나 높습니다.
            </p>
            <p className="mt-1 text-xs font-medium text-blue-500">
              유리한 위치에 있습니다. 협상을 이어가세요!
            </p>
          </>
        )}
        <button
          type="button"
          onClick={onEditOffer}
          className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 text-xs font-semibold text-white transition hover:bg-orange-600"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
          금액 올려서 재제안하기
        </button>
      </div>
    </div>
  );
}

function ProposalModal({
  onClose,
  proposal,
}: {
  onClose: () => void;
  proposal: ProposalItem;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editAmount, setEditAmount] = useState(String(proposal.myOffer));
  const [editSubmitted, setEditSubmitted] = useState(false);

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

  const handleEditSubmit = () => {
    setEditSubmitted(true);
    setIsEditing(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="proposal-modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden bg-slate-950/45 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={onClose}
    >
      <div
        className="relative flex max-h-[calc(100vh-24px)] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[calc(100vh-32px)] sm:max-w-md sm:rounded-3xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="shrink-0 border-b border-slate-100 px-4 py-3.5">
          <p className="text-xs font-medium text-slate-400">{proposal.code}</p>
          <h2
            id="proposal-modal-title"
            className="mt-1 pr-10 font-[family-name:var(--font-heading)] text-base font-semibold tracking-normal text-slate-950 sm:text-lg"
          >
            {proposal.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3.5">
          <StatusBadge proposal={proposal} size="lg" />

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-center">
              <p className="text-xs font-medium text-slate-400">매물 호가</p>
              <p className="mt-1 text-lg font-semibold text-slate-950">
                {formatMan(proposal.marketPrice)}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-center">
              <p className="text-xs font-medium text-slate-400">나의 제안</p>
              <p className="mt-1 text-lg font-semibold text-blue-600">
                {editSubmitted ? `${Number(editAmount).toLocaleString("ko-KR")}만` : formatMan(proposal.myOffer)}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <CompetitionBars
              proposal={proposal}
              onEditOffer={() => setIsEditing(true)}
            />
          </div>

          {isEditing ? (
            <div className="mt-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm font-semibold text-blue-700">제안 금액 수정</p>
              <div className="mt-2 flex gap-2">
                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  className="h-10 flex-1 rounded-xl border border-blue-200 bg-white px-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="금액 입력 (만원)"
                />
                <button
                  type="button"
                  onClick={handleEditSubmit}
                  className="h-10 rounded-xl px-4 text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #0083FF, #4C2CE2)" }}
                >
                  수정 완료
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="h-10 rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-400 hover:bg-slate-50"
                >
                  취소
                </button>
              </div>
            </div>
          ) : null}

          {editSubmitted ? (
            <div className="mt-3 flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-700">
              금액이 {Number(editAmount).toLocaleString("ko-KR")}만원으로 수정되었습니다.
            </div>
          ) : null}

          <dl className="mt-3 space-y-2 text-sm font-medium">
            <div className="flex items-center justify-between gap-4">
              <dt className="inline-flex items-center gap-2 text-slate-400">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                희망 입주일
              </dt>
              <dd className="text-slate-950">{proposal.moveInDate}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="inline-flex items-center gap-2 text-slate-400">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                제안 접수일
              </dt>
              <dd className="text-slate-950">{proposal.proposedAt}</dd>
            </div>
          </dl>

          <div className="mt-3 rounded-2xl bg-slate-100 p-3">
            <p className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
              <FileText className="h-4 w-4" aria-hidden="true" />
              내가 남긴 메시지
            </p>
            <p className="mt-2 text-sm font-medium text-slate-950">
              {proposal.message}
            </p>
          </div>
        </div>

        <footer className="grid shrink-0 gap-2.5 border-t border-slate-100 p-3.5 sm:grid-cols-[1fr_104px]">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border-2 border-blue-200 text-sm font-semibold text-blue-600 transition hover:border-blue-400 hover:bg-blue-50"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            금액 수정하기
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 text-sm font-semibold text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
          >
            철회
          </button>
        </footer>
      </div>
    </div>
  );
}

export default function GeneralMyPage() {
  const router = useRouter();
  const authAccessState = useSyncExternalStore(
    subscribeToAuthChanges,
    getAuthAccessState,
    getServerAuthAccessState,
  );
  const [activeFilter, setActiveFilter] = useState<ProposalFilter>("all");
  const [selectedProposal, setSelectedProposal] = useState<ProposalItem | null>(
    null,
  );

  useEffect(() => {
    if (authAccessState === "guest") {
      router.replace(buildLoginPath(GENERAL_MY_PAGE_PATH));
      return;
    }

    if (authAccessState === "agent") {
      router.replace(getMyPagePathByRole("AGENT"));
    }
  }, [authAccessState, router]);

  const counts = useMemo(() => getCounts(), []);
  const filteredProposals = useMemo(() => {
    if (activeFilter === "all") {
      return proposals;
    }

    return proposals.filter((proposal) => proposal.status === activeFilter);
  }, [activeFilter]);

  if (authAccessState === "agent") {
    return null;
  }

  return (
    <main
      className="min-h-screen pb-16 pt-8"
      style={{ background: "var(--gradient-background)" }}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <section className="pb-8">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold leading-tight tracking-normal text-slate-950">
            내 제안 현황
          </h1>
          <p className="mt-2 text-base font-medium text-slate-400">
            보낸 제안의 경쟁 현황을 확인하고 전략적으로 대응하세요
          </p>
        </section>

        <button
          type="button"
          onClick={() => setActiveFilter("countered")}
          className="mb-6 flex w-full items-center gap-4 rounded-3xl border-2 border-blue-200 bg-white px-5 py-5 text-left transition hover:border-blue-300 hover:bg-blue-50/40"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Bell className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-base font-bold text-blue-600">
              역제안이 {counts.countered}건 도착했습니다!
            </span>
            <span className="mt-0.5 block text-sm font-medium text-blue-600">
              지금 확인하고 협상을 이어가세요
            </span>
          </span>
          <ChevronRight className="h-6 w-6 shrink-0 text-blue-500" aria-hidden="true" />
        </button>

        <section
          aria-label="제안 요약"
          className="mb-6 grid gap-3 sm:grid-cols-3"
        >
          <StatCard label="보낸 제안" toneClass="text-slate-950" value={counts.all} />
          <StatCard
            label="역제안"
            toneClass="text-blue-600"
            value={counts.countered}
          />
          <StatCard
            label="타결"
            toneClass="text-emerald-600"
            value={counts.completed}
          />
        </section>

        <div className="mb-6 flex flex-wrap gap-2.5">
          {(["all", "countered", "pending", "completed"] as ProposalFilter[]).map(
            (filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={`h-9 rounded-full border px-3.5 text-xs font-medium shadow-sm transition ${
                    isActive
                      ? "button-gradation border-transparent text-white shadow-lg shadow-blue-500/20"
                      : "border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600"
                  }`}
                >
                  {filterLabels[filter]}{" "}
                  <span className={isActive ? "text-slate-300" : "text-slate-300"}>
                    {counts[filter] || ""}
                  </span>
                </button>
              );
            },
          )}
        </div>

        <section className="space-y-4" aria-label="제안 목록">
          {filteredProposals.length > 0 ? (
            filteredProposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onOpen={setSelectedProposal}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </section>
      </div>

      {selectedProposal ? (
        <ProposalModal
          proposal={selectedProposal}
          onClose={() => setSelectedProposal(null)}
        />
      ) : null}
    </main>
  );
}
