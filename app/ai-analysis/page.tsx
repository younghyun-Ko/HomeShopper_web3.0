import type { Metadata } from "next";
import { Sparkles } from "lucide-react";

import { InteractiveAnalysis } from "@/components/ai-analysis/interactive-analysis";
import { aiAnalysisSampleProperties } from "@/lib/ai-analysis-data";

export const metadata: Metadata = {
  title: "AI 분석 | HomeShopper",
  description:
    "샘플 매물을 선택하고 권리관계, 호가 적정성, 계약 주의 포인트를 AI 분석 UI로 확인하세요.",
};

const heroStats = [
  {
    label: "Demo Output",
    value: "3개 샘플 리포트",
  },
  {
    label: "Review Coverage",
    value: "권리 + 시세 + 조건",
  },
  {
    label: "Route Goal",
    value: "계약 전 사전 판단",
  },
];

const heroStatCardStyle = {
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.42) 0%, rgba(49, 93, 255, 0.13) 100%)",
};

export default function AiAnalysisPage() {
  return (
    <main className="overflow-x-hidden bg-[var(--gradient-background)] pb-16 pt-10 text-[var(--color-text)] sm:pb-20 sm:pt-14">
      <section className="px-6 sm:px-10">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.88)_0%,rgba(248,251,255,0.74)_100%)] px-8 py-10 shadow-[0_30px_90px_rgba(49,93,255,0.12)] backdrop-blur-xl sm:px-10 sm:py-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(49,93,255,0.1)] px-3 py-1.5 text-sm font-bold text-[var(--color-accent)]">
            <Sparkles className="h-4 w-4" strokeWidth={2.3} />
            AI 기술 미리보기
          </div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl font-[family-name:var(--font-heading)] text-5xl leading-[1.18] font-semibold tracking-normal text-[var(--color-primary)] sm:text-5xl">
                권리관계·계약 포인트, 한 화면에서 먼저 확인하세요.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] sm:text-lg">
                HomeShopper의 AI 분석 경험을 데모로 보여줍니다.
                샘플 매물을 선택하면 안심 점수, 서류 기반 위험 신호, 호가
                판단 포인트까지 바로 확인할 수 있습니다.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="consultation-glass-card rounded-[24px] p-5 backdrop-blur-xs"
                  style={heroStatCardStyle}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-sm font-bold text-[var(--color-text-muted)] sm:text-lg">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-8 sm:px-10 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <InteractiveAnalysis properties={aiAnalysisSampleProperties} />
        </div>
      </section>
    </main>
  );
}
