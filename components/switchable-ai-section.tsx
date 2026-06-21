"use client";

import Image from "next/image";
import {
  Check,
  FileSearch,
  Landmark,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const buyerChecklist = [
  {
    title: "권리관계 확인",
    body: "근저당권, 가압류, 임차인 승계 여부",
    icon: ShieldCheck,
  },
  {
    title: "서류 리스크 검토",
    body: "등기부등본과 건축물대장 대조",
    icon: FileSearch,
  },
  {
    title: "시세 적정성 비교",
    body: "주변 실거래가와 현재 호가 비교",
    icon: Landmark,
  },
  {
    title: "계약 조건 판단",
    body: "안심 점수와 계약 권장 여부 정리",
    icon: Scale,
  },
];

const sellerChecklist = [
  {
    title: "권리관계 확인",
    body: "근저당권·가압류 등 내 매물 권리관계 사전 점검",
    icon: ShieldCheck,
  },
  {
    title: "서류 자동 정리",
    body: "등기부등본과 건축물대장 자동 대조·검증",
    icon: FileSearch,
  },
  {
    title: "적정 임대료 비교",
    body: "주변 실거래가 기반 적정 호가 산정 지원",
    icon: Landmark,
  },
  {
    title: "신뢰 매물 인증",
    body: "검증 완료 매물에 신뢰 인증 뱃지 부여",
    icon: Scale,
  },
];

export function SwitchableAiSection() {
  const [tab, setTab] = useState<"buyer" | "seller">("buyer");

  const isBuyer = tab === "buyer";
  const accentColor = isBuyer ? "#0083FF" : "#4C2CE2";
  const checklist = isBuyer ? buyerChecklist : sellerChecklist;

  return (
    <section
      id="ai"
      aria-labelledby="ai-heading"
      className="px-6 py-36 sm:px-10 sm:py-48"
    >
      <div className="mx-auto max-w-6xl">
        <div className="space-y-0 sm:space-y-2">
          <div className="py-4 lg:py-6">
            {/* Segmented control */}
            <div
              className="mb-6 flex justify-start"
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

            <p
              className="text-xl font-bold sm:text-2xl"
              style={{ color: accentColor }}
            >
              AI 분석
            </p>
            <h2
              id="ai-heading"
              className="mt-4 max-w-3xl font-[family-name:var(--font-emphasis)] text-3xl font-semibold leading-[1.1] text-[var(--color-primary)] sm:text-4xl lg:text-[3.75rem]"
            >
              {isBuyer ? (
                <>
                  복잡하고 어려운 작업은
                  <br />
                  이제 AI가 대신 해드립니다
                </>
              ) : (
                <>
                  복잡하고 어려운 서류 작업은
                  <br />
                  이제 AI가 대신 해드립니다
                </>
              )}
            </h2>
            <a
              href="/ai-analysis"
              className="button-gradation mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold !text-white shadow-[0_14px_30px_rgba(49,93,255,0.14)] transition-transform duration-200 hover:-translate-y-0.5 sm:text-base"
            >
              AI 분석 보러가기
            </a>
          </div>

          <div className="mt-8 space-y-0 sm:space-y-2">
            <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
              <div className="py-6 lg:py-12">
                <div
                  className="inline-flex items-center gap-2 text-base font-bold sm:text-lg"
                  style={{ color: accentColor }}
                >
                  <Sparkles className="h-4 w-4" strokeWidth={2.2} />
                  AI 기술 미리보기
                </div>
                <h3 className="mt-5 max-w-xl font-[family-name:var(--font-heading)] text-3xl font-semibold leading-tight text-[var(--color-primary)] sm:text-4xl lg:text-5xl">
                  {isBuyer ? (
                    <>
                      AI가 먼저 보는
                      <br />
                      계약 전 핵심 항목
                    </>
                  ) : (
                    <>
                      AI가 먼저 검증하는
                      <br />
                      안전한 매물 등록
                    </>
                  )}
                </h3>
                <p className="mt-8 max-w-2xl text-base font-light leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
                  {isBuyer ? (
                    <>
                      권리관계, 서류 흐름, 주변 호가를 함께 읽어 계약 전에
                      <br />
                      다시 확인해야 할 위험 신호와 판단 포인트를 정리해드려요.
                    </>
                  ) : (
                    <>
                      권리관계와 서류를 AI가 미리 점검해, 임대인도 깨끗한
                      권리관계를
                      <br />
                      증빙하고 신뢰도 높은 매물로 등록할 수 있어요.
                    </>
                  )}
                </p>
              </div>

              <div className="px-2 py-6 lg:py-12 lg:pt-14 lg:pl-8">
                <div className="mx-auto max-w-[500px] space-y-5 lg:mx-0">
                  {checklist.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="grid grid-cols-[1fr_46px] items-center gap-5 rounded-[24px] bg-white px-5 py-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)]"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <ItemIcon
                              className="h-6 w-6 shrink-0"
                              style={{ color: accentColor }}
                              strokeWidth={2.2}
                              aria-hidden="true"
                            />
                            <p
                              className="font-[family-name:var(--font-heading)] text-base font-bold"
                              style={{ color: accentColor }}
                            >
                              {item.title}
                            </p>
                          </div>
                          <p className="mt-1 text-sm font-medium leading-6 text-[var(--color-text-muted)]">
                            {item.body}
                          </p>
                        </div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-full border-3 border-[#15C47E] bg-[#E4FFF2] text-[#15C47E] shadow-[0_10px_24px_rgba(21,196,126,0.24)]">
                          <Check className="h-6 w-6" strokeWidth={3} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="-mt-10 grid gap-8 lg:-mt-32 lg:grid-cols-[0.98fr_1.02fr] lg:items-center lg:gap-12">
              <div className="flex items-end justify-center overflow-hidden px-4 pt-4 lg:-ml-8">
                <Image
                  src="/ai-robot-wave.png"
                  alt="손을 흔드는 HomeShopper AI 로봇"
                  width={896}
                  height={1200}
                  className="h-auto w-full max-w-[340px] -scale-x-100 object-contain drop-shadow-[0_24px_36px_rgba(49,93,255,0.16)] sm:max-w-[420px] lg:max-w-[500px]"
                  sizes="(max-width: 1024px) 80vw, 42vw"
                />
              </div>

              <div className="py-6 lg:py-12">
                <div
                  className="inline-flex items-center gap-2 text-lg font-bold sm:text-xl"
                  style={{ color: accentColor }}
                >
                  <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
                  Workflow
                </div>
                <h3 className="mt-5 max-w-xl font-[family-name:var(--font-heading)] text-3xl font-semibold leading-tight text-[var(--color-primary)] sm:text-4xl lg:text-5xl">
                  {isBuyer ? (
                    <>
                      분석 흐름에 맞춰
                      <br />
                      결론까지 한 번에 확인
                    </>
                  ) : (
                    <>
                      등록부터 매칭까지
                      <br />
                      한 번에 관리
                    </>
                  )}
                </h3>
                <p className="mt-8 max-w-2xl text-base font-light leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
                  {isBuyer ? (
                    <>
                      매물을 선택하면 리스크 스캔부터 안심 점수,
                      <br />
                      계약 권장 여부, 실무적으로 다시 볼 항목까지
                      <br />
                      순서대로 확인할 수 있어요.
                    </>
                  ) : (
                    <>
                      매물을 등록하면 권리 검증부터 신뢰 인증,
                      <br />
                      임차인 매칭, 계약 진행 상황까지
                      <br />
                      순서대로 확인할 수 있어요.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
