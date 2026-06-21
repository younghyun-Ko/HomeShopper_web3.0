'use client';

import { useEffect, useRef, useState } from "react";
import {
  Banknote,
  Building2,
  CircleAlert,
  CircleCheckBig,
  FileSignature,
  Hospital,
  Landmark,
  Loader2,
  MapPin,
  Scale,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

import type {
  AiAnalysisProperty,
  AnalysisIconKey,
  AnalysisStatus,
} from "@/lib/ai-analysis-data";

const STATUS_META: Record<
  AnalysisStatus,
  {
    badgeClass: string;
    iconClass: string;
    label: string;
    progressColor: string;
    verdictIcon: LucideIcon;
  }
> = {
  safe: {
    badgeClass: "border-emerald-200 bg-emerald-50 text-emerald-700",
    iconClass: "bg-emerald-50 text-emerald-600",
    label: "안전",
    progressColor: "#16A34A",
    verdictIcon: CircleCheckBig,
  },
  caution: {
    badgeClass: "border-amber-200 bg-amber-50 text-amber-700",
    iconClass: "bg-amber-50 text-amber-600",
    label: "주의",
    progressColor: "#D97706",
    verdictIcon: CircleAlert,
  },
  danger: {
    badgeClass: "border-rose-200 bg-rose-50 text-rose-700",
    iconClass: "bg-rose-50 text-rose-600",
    label: "위험",
    progressColor: "#DC2626",
    verdictIcon: CircleAlert,
  },
};

const ICONS: Record<AnalysisIconKey, LucideIcon> = {
  banknote: Banknote,
  building: Building2,
  "file-signature": FileSignature,
  hospital: Hospital,
  landmark: Landmark,
  "map-pin": MapPin,
  scale: Scale,
  shield: ShieldCheck,
  stethoscope: Stethoscope,
};

function StatusBadge({ status }: { status: AnalysisStatus }) {
  const meta = STATUS_META[status];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-[0.18em] ${meta.badgeClass}`}
    >
      {meta.label}
    </span>
  );
}

function ScoreDial({
  score,
  status,
}: {
  score: number;
  status: AnalysisStatus;
}) {
  const meta = STATUS_META[status];

  return (
    <div
      className="relative flex h-36 w-36 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(${meta.progressColor} ${score * 3.6}deg, rgba(148, 163, 184, 0.18) 0deg)`,
      }}
      aria-label={`안심 점수 ${score}점`}
    >
      <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white shadow-[inset_0_1px_16px_rgba(15,23,42,0.08)]">
        <span className="font-[family-name:var(--font-heading)] text-4xl font-semibold text-[var(--color-primary)]">
          {score}
        </span>
        <span className="mt-1 text-[11px] font-semibold tracking-[0.18em] text-[var(--color-text-muted)]">
          안심 점수
        </span>
      </div>
    </div>
  );
}

function MetricBar({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[var(--color-text-muted)]">{label}</span>
        <span className="font-semibold text-[var(--color-primary)]">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200/60">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: tone }} />
      </div>
    </div>
  );
}

function AnalysisResult({
  property,
}: {
  property: AiAnalysisProperty;
}) {
  const verdictMeta = STATUS_META[property.verdictStatus];
  const VerdictIcon = verdictMeta.verdictIcon;

  return (
    <div className="grid gap-5 rounded-[26px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(248,251,255,0.92)_100%)] p-5 shadow-[0_24px_60px_rgba(49,93,255,0.08)] lg:grid-cols-[240px_1fr] lg:p-7">
      <div className="rounded-[24px] border border-slate-200/70 bg-white/90 p-6">
        <div className="flex justify-center">
          <ScoreDial score={property.score} status={property.verdictStatus} />
        </div>
        <div className="mt-6 space-y-4">
          <MetricBar
            label="시장 적합성"
            value={property.marketFitScore}
            tone="#315DFF"
          />
          <MetricBar
            label="법률 안전성"
            value={property.legalSafetyScore}
            tone={verdictMeta.progressColor}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-[24px] border border-white/70 bg-white/90 p-6">
          <div className="flex flex-wrap items-start gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${verdictMeta.iconClass}`}>
              <VerdictIcon className="h-6 w-6" strokeWidth={2} />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={property.verdictStatus} />
                <p className="font-[family-name:var(--font-heading)] text-2xl text-[var(--color-primary)]">
                  {property.verdict}
                </p>
              </div>
              <p className="text-sm leading-7 text-[var(--color-text-muted)]">
                {property.summary}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {property.items.map((item) => {
            const iconMeta = STATUS_META[item.status];
            const ItemIcon = ICONS[item.icon];

            return (
              <div
                key={item.label}
                className="rounded-[22px] border border-slate-200/70 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl ${iconMeta.iconClass}`}>
                      <ItemIcon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                        {item.label}
                      </p>
                      <p className="mt-1 text-base font-semibold text-[var(--color-primary)]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                <p className="mt-4 text-sm leading-6 text-[var(--color-text-muted)]">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>

        <div className="rounded-[24px] border border-[rgba(49,93,255,0.14)] bg-[linear-gradient(135deg,rgba(49,93,255,0.08)_0%,rgba(91,93,246,0.04)_100%)] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
            Recommendation
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--color-text)]">
            {property.recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}

export function InteractiveAnalysis({
  properties,
}: {
  properties: AiAnalysisProperty[];
}) {
  const [selected, setSelected] = useState(properties[0]?.id ?? "");
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeId = properties.some((property) => property.id === selected)
    ? selected
    : (properties[0]?.id ?? "");
  const current = properties.find((property) => property.id === activeId) ?? properties[0];

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (!current) {
    return null;
  }

  function handleAnalyze() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setPhase("loading");
    timerRef.current = setTimeout(() => {
      setPhase("done");
    }, 900);
  }

  function handleSelect(id: string) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setSelected(id);
    setPhase("idle");
  }

  return (
    <div className="rounded-[32px] border border-white/70 bg-white/70 p-4 shadow-[0_30px_80px_rgba(49,93,255,0.14)] backdrop-blur-xl sm:p-5">
      <div className="grid gap-3 border-b border-slate-200/80 pb-4 md:grid-cols-3">
        {properties.map((property) => {
          const PropertyIcon = ICONS[property.icon];
          const isActive = property.id === activeId;

          return (
            <button
              key={property.id}
              type="button"
              onClick={() => handleSelect(property.id)}
              className={`group rounded-[22px] border px-4 py-4 text-left transition-all duration-200 ${
                isActive
                  ? "border-transparent bg-white shadow-[0_18px_40px_rgba(49,93,255,0.12)]"
                  : "border-transparent bg-[linear-gradient(135deg,rgba(255,255,255,0.82)_0%,rgba(222,232,255,0.7)_100%)] shadow-[0_12px_30px_rgba(49,93,255,0.08)] hover:-translate-y-1 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.96)_0%,rgba(202,218,255,0.9)_100%)] hover:shadow-[0_20px_44px_rgba(49,93,255,0.18)]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors duration-200 ${
                    isActive
                      ? "bg-[rgba(49,93,255,0.12)] text-[var(--color-accent)]"
                      : "bg-[rgba(49,93,255,0.1)] text-[rgba(49,93,255,0.82)] group-hover:bg-[rgba(49,93,255,0.16)] group-hover:text-[var(--color-accent)]"
                  }`}
                >
                  <PropertyIcon className="h-5 w-5" strokeWidth={1.9} />
                </div>
                <div className="min-w-0">
                  <p className="font-[family-name:var(--font-heading)] text-lg text-[var(--color-primary)]">
                    {property.name}
                  </p>
                  <p className="mt-1 line-clamp-1 text-sm text-[var(--color-text-muted)]">
                    {property.address}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 border-b border-slate-200/80 px-1 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-[family-name:var(--font-heading)] text-2xl text-[var(--color-primary)]">
              {current.name}
            </p>
            <StatusBadge status={current.verdictStatus} />
          </div>
          <p className="mt-2 flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
            {current.address}
          </p>
        </div>

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={phase === "loading"}
          className="button-gradation inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/15 transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {phase === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {phase === "loading" ? "분석 중..." : "AI 권리 분석 시작"}
        </button>
      </div>

      <div className="pt-5">
        {phase === "idle" ? (
          <div className="rounded-[28px] border border-dashed border-[rgba(49,93,255,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.75)_0%,rgba(244,248,255,0.9)_100%)] px-6 py-10 text-center sm:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[rgba(49,93,255,0.12)] text-[var(--color-accent)]">
              <ShieldCheck className="h-8 w-8" strokeWidth={1.8} />
            </div>
            <p className="mt-5 font-[family-name:var(--font-heading)] text-2xl text-[var(--color-primary)]">
              샘플 매물 분석을 바로 확인해보세요
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
              등기부등본, 건축물대장, 임대 조건, 주변 시세를 함께 읽어
              위험 신호와 계약 포인트를 한 화면에서 요약해줍니다.
            </p>
          </div>
        ) : null}

        {phase === "loading" ? (
          <div className="rounded-[28px] border border-white/70 bg-white/80 px-6 py-14 text-center shadow-[0_18px_48px_rgba(49,93,255,0.08)]">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-[var(--color-accent)]" />
            <p className="mt-5 font-[family-name:var(--font-heading)] text-2xl text-[var(--color-primary)]">
              권리관계와 임대 조건을 대조하고 있습니다
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">
              잠시 후 신뢰도 리포트가 표시됩니다.
            </p>
          </div>
        ) : null}

        {phase === "done" ? <AnalysisResult property={current} /> : null}
      </div>
    </div>
  );
}
