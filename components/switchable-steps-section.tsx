"use client";

import { Check, ClipboardPenLine, FilePenLine, UserCheck } from "lucide-react";
import { useState } from "react";

type StepState = "complete" | "active" | "upcoming";

const buyerSteps = [
  {
    number: "01",
    title: "매물 상담 신청",
    body: "원하시는 지역과 예산을 남겨주세요",
    icon: ClipboardPenLine,
    state: "complete" as StepState,
  },
  {
    number: "02",
    title: "전담 매니저 배정",
    body: "홈쇼퍼 전담 매니저가\n맞춤 매물을 선별합니다",
    icon: UserCheck,
    state: "active" as StepState,
  },
  {
    number: "03",
    title: "전속 중개 매칭 및 계약",
    body: "제휴 중개사와 함께 안전하게\n계약을 진행합니다",
    icon: FilePenLine,
    state: "upcoming" as StepState,
  },
];

const sellerSteps = [
  {
    number: "01",
    title: "매물 등록 신청",
    body: "임대하실 매물 정보와 희망 조건을 남겨주세요",
    icon: ClipboardPenLine,
    state: "complete" as StepState,
  },
  {
    number: "02",
    title: "전담 매니저 배정",
    body: "홈쇼퍼 전담 매니저가\n검증된 청년 임차인을 매칭합니다",
    icon: UserCheck,
    state: "active" as StepState,
  },
  {
    number: "03",
    title: "전속 중개 매칭 및 계약",
    body: "제휴 중개사와 함께 안전하게\n계약을 완료합니다",
    icon: FilePenLine,
    state: "upcoming" as StepState,
  },
];

export function SwitchableStepsSection() {
  const [tab, setTab] = useState<"buyer" | "seller">("buyer");

  const isBuyer = tab === "buyer";
  const steps = isBuyer ? buyerSteps : sellerSteps;
  const subtitle = isBuyer
    ? "상담 신청부터 계약까지, 홈쇼퍼가 모든 과정을 함께합니다"
    : "매물 등록부터 계약까지, 홈쇼퍼가 모든 과정을 함께합니다";

  const activeGrad = isBuyer
    ? "bg-[linear-gradient(135deg,#315DFF_0%,#6757FF_100%)] shadow-[0_18px_36px_rgba(49,93,255,0.28)]"
    : "bg-[linear-gradient(135deg,#4C2CE2_0%,#7B3CF7_100%)] shadow-[0_18px_36px_rgba(76,44,226,0.28)]";
  const connectorGrad = isBuyer
    ? "bg-[linear-gradient(90deg,#315DFF_0%,#6D5BFF_100%)]"
    : "bg-[linear-gradient(90deg,#4C2CE2_0%,#7B3CF7_100%)]";

  return (
    <section
      id="three-steps"
      aria-labelledby="three-steps-heading"
      className="px-6 py-36 sm:px-10 sm:py-48"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          {/* Segmented control */}
          <div
            className="mb-8 flex justify-center"
            role="tablist"
            aria-label="관점 선택"
          >
            <div className="inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-gray-200">
              <button
                role="tab"
                type="button"
                aria-selected={isBuyer}
                onClick={() => setTab("buyer")}
                className={[
                  "rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200",
                  isBuyer
                    ? "bg-gradient-to-r from-[#0083FF] to-[#4C2CE2] text-white"
                    : "bg-transparent text-gray-500",
                ].join(" ")}
              >
                매수자 기준
              </button>
              <button
                role="tab"
                type="button"
                aria-selected={!isBuyer}
                onClick={() => setTab("seller")}
                className={[
                  "rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200",
                  !isBuyer
                    ? "bg-gradient-to-r from-[#0083FF] to-[#4C2CE2] text-white"
                    : "bg-transparent text-gray-500",
                ].join(" ")}
              >
                매도자 기준
              </button>
            </div>
          </div>

          <h2
            id="three-steps-heading"
            className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight text-[var(--color-primary)] sm:text-5xl lg:text-6xl"
          >
            간단한 3단계로 완성
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-light leading-8 text-[var(--color-text-muted)] sm:text-xl">
            {subtitle}
          </p>
        </div>

        <div
          className="relative mx-auto mt-16 grid max-w-5xl gap-10 md:grid-cols-3 md:gap-4 lg:mt-20"
          aria-label="홈쇼퍼 진행 단계"
        >
          <div className="absolute left-[16.666%] right-[16.666%] top-10 hidden h-1 rounded-full bg-[#CCD9FF] md:block" />
          <div
            className={`absolute left-[16.666%] right-1/2 top-10 hidden h-1 rounded-full transition-all duration-300 md:block ${connectorGrad}`}
          />

          {steps.map((step) => {
            const StepIcon = step.icon;
            const isComplete = step.state === "complete";
            const isActive = step.state === "active";

            return (
              <div
                key={step.number}
                className="relative z-10 flex flex-col items-center px-4 text-center"
              >
                <div className="relative z-10 flex h-20 w-20 items-center justify-center">
                  <div
                    className={[
                      "flex items-center justify-center rounded-full font-number text-sm font-bold",
                      isActive
                        ? `h-20 w-20 text-white ${activeGrad}`
                        : "h-12 w-12 bg-white text-[var(--color-accent)] shadow-[0_10px_24px_rgba(49,93,255,0.12)]",
                      !isComplete && !isActive
                        ? "text-[var(--color-text-muted)]"
                        : "",
                    ].join(" ")}
                  >
                    {isComplete ? (
                      <Check className="h-6 w-6" strokeWidth={3} />
                    ) : (
                      <StepIcon
                        className={isActive ? "h-9 w-9" : "h-6 w-6"}
                        strokeWidth={2.3}
                      />
                    )}
                  </div>
                </div>

                <p
                  className={[
                    "mt-5 font-number text-sm font-bold",
                    isActive
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-muted)]",
                  ].join(" ")}
                >
                  {step.number}
                </p>
                <h3
                  className={[
                    "mt-2 font-[family-name:var(--font-heading)] text-xl font-bold leading-tight sm:text-2xl",
                    isActive
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text)]",
                  ].join(" ")}
                >
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[250px] whitespace-pre-line text-lg font-normal leading-7 text-[var(--color-text-muted)]">
                  {step.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
