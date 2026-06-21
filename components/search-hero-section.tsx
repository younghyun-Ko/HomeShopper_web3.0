"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUp,
  Building2,
  ChevronDown,
  Loader2,
  MapPin,
  Phone,
  TriangleAlert,
  Wallet,
  X,
} from "lucide-react";
import { parsePropertyUrl, type ParsedProperty } from "@/lib/property-parser";

type Step = "idle" | "loading" | "error" | "confirm";

export function SearchHeroSection() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [step, setStep] = useState<Step>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [property, setProperty] = useState<ParsedProperty | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;

    setStep("loading");
    setErrorMsg("");

    const result = await parsePropertyUrl(trimmed);

    if (!result.success) {
      setStep("error");
      setErrorMsg(result.error);
      return;
    }

    setProperty(result.property);
    setStep("confirm");
  };

  const handleConfirm = () => {
    if (!property) return;
    const params = new URLSearchParams({
      address: property.address,
      agentName: property.agentName,
      agentPhone: property.agentPhone,
      dealType: property.dealType,
      price: property.price,
      region: property.region,
      sourceName: property.sourceName,
      sourceUrl: property.sourceUrl,
    });
    router.push(`/consultation?${params.toString()}`);
  };

  const handleReject = () => {
    setStep("idle");
    setUrl("");
    setProperty(null);
  };

  return (
    <section
      id="search-hero"
      aria-label="매물 링크 검색"
      className="relative isolate overflow-hidden"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-6 py-14 sm:py-20">
        <h1
          className="font-[family-name:var(--font-emphasis)] text-5xl tracking-[-0.03em] sm:text-6xl lg:text-7xl"
          style={{
            background: "linear-gradient(135deg, #0083FF, #4C2CE2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Home Shopper
        </h1>

        <p className="mt-5 text-center text-xl font-semibold text-[var(--color-primary)] sm:text-2xl">
          수수료와 거래 위험을 대폭 낮췄습니다.
        </p>

        <div className="mt-12 w-full sm:mt-14">
          <p className="mb-4 text-center text-lg font-normal text-[var(--color-text-muted)] sm:text-xl">
            거래하고 싶은 매물 링크를 입력해주세요
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3.5 shadow-[0_2px_24px_rgba(0,0,0,0.07)]">
              <input
                type="url"
                placeholder="직방/다방/네이버 부동산 링크 입력하기"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (step === "error") setStep("idle");
                }}
                disabled={step === "loading"}
                className="flex-1 bg-transparent text-base text-[var(--color-primary)] outline-none placeholder:text-slate-400 disabled:opacity-60 sm:text-lg"
              />
              <button
                type="submit"
                aria-label="매물 분석하기"
                disabled={step === "loading" || !url.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:opacity-90 active:scale-95 disabled:opacity-50 sm:h-11 sm:w-11"
                style={{ background: "linear-gradient(135deg, #0083FF, #4C2CE2)" }}
              >
                {step === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white sm:h-5 sm:w-5" />
                ) : (
                  <ArrowUp className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                )}
              </button>
            </div>
          </form>

          {step === "loading" && (
            <p className="mt-3 text-center text-sm font-medium text-[var(--color-text-muted)]">
              매물 정보를 불러오는 중입니다…
            </p>
          )}

          {step === "error" && (
            <div className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-red-500">
              <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
              {errorMsg}
            </div>
          )}
        </div>

        <div className="mt-14 flex flex-col items-center gap-2">
          <span className="text-xs font-medium text-[var(--color-text-muted)]/50">
            더 알아보기
          </span>
          <a
            href="#hero"
            aria-label="아래 콘텐츠 보기"
            className="animate-bounce text-[var(--color-accent)]/40 transition-opacity hover:text-[var(--color-accent)]/70"
          >
            <ChevronDown className="h-7 w-7" strokeWidth={1.5} />
          </a>
        </div>
      </div>

      {/* Property confirmation modal */}
      {step === "confirm" && property && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="property-confirm-title"
        >
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="border-b border-slate-100 px-6 py-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">
                {property.sourceName}에서 확인된 매물
              </p>
              <h2
                id="property-confirm-title"
                className="mt-2 font-[family-name:var(--font-heading)] text-xl font-bold text-slate-950"
              >
                이 매물이 맞나요?
              </h2>
              <button
                type="button"
                onClick={handleReject}
                aria-label="닫기"
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-4 px-6 py-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-slate-400">매물 주소</p>
                  <p className="mt-0.5 font-medium text-slate-950">{property.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-slate-400">
                    가격 ({property.dealType})
                  </p>
                  <p className="mt-0.5 font-medium text-slate-950">{property.price}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-slate-400">담당 중개사</p>
                  <p className="mt-0.5 font-medium text-slate-950">{property.agentName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-slate-400">중개사 연락처</p>
                  <p className="mt-0.5 font-medium text-slate-950">{property.agentPhone}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 px-6 pb-6">
              <button
                type="button"
                onClick={handleReject}
                className="rounded-2xl border border-slate-200 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                아니에요, 다시 입력할게요
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-2xl py-3 text-sm font-bold text-white transition hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #0083FF, #4C2CE2)" }}
              >
                맞아요, 상담 신청하기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
