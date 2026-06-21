"use client";

import type { ChangeEvent, ReactNode } from "react";
import { Send, Upload, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { saveConsultation } from "@/lib/consultation-database";

type ConsultationRowProps = {
  children: ReactNode;
  label: string;
  optional?: boolean;
  required?: boolean;
};

function ConsultationRow({
  children,
  label,
  optional = false,
  required = false,
}: ConsultationRowProps) {
  return (
    <div className="space-y-1.5">
      <div>
        <p className="text-sm font-medium text-[var(--color-primary)] sm:text-base">
          {label}
          {required ? <span className="text-[#ff4f6d]"> *</span> : null}
          {optional ? <span className="text-[var(--color-text-muted)]"> (선택)</span> : null}
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
}

const fieldClassName =
  "w-full rounded-[14px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/10 sm:text-base";

function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function BuyerForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const prefillAddress = searchParams.get("address") ?? "";
  const prefillPrice = searchParams.get("price") ?? "";
  const prefillRegion = searchParams.get("region") ?? "";
  const prefillAgentName = searchParams.get("agentName") ?? "";
  const prefillAgentPhone = searchParams.get("agentPhone") ?? "";
  const prefillDealType = searchParams.get("dealType") ?? "";
  const prefillSourceUrl = searchParams.get("sourceUrl") ?? "";
  const prefillSourceName = searchParams.get("sourceName") ?? "";

  const hasProperty = Boolean(prefillAddress);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState(prefillAddress);
  const [price, setPrice] = useState(prefillPrice);
  const [region, setRegion] = useState(prefillRegion);
  const [agentName, setAgentName] = useState(prefillAgentName);
  const [agentPhone, setAgentPhone] = useState(prefillAgentPhone);
  const [hasConsent, setHasConsent] = useState(false);

  const isSubmitEnabled = name.trim().length > 0 && phoneNumber.length === 13 && hasConsent;

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    if (!isSubmitEnabled) {
      return;
    }

    saveConsultation({
      email,
      message,
      name: name.trim(),
      phone: phoneNumber,
      property: hasProperty
        ? {
            address,
            agentName,
            agentPhone,
            dealType: prefillDealType,
            price,
            region,
            sourceName: prefillSourceName,
            sourceUrl: prefillSourceUrl,
          }
        : null,
    });

    router.push("/consultation/submitted");
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhoneNumber(event.target.value));
  };

  return (
    <div className="rounded-[24px] border border-white/60 bg-white/80 p-5 shadow-[0_20px_60px_rgba(49,93,255,0.08)] backdrop-blur-sm sm:p-8">
      <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
        {hasProperty && (
          <div className="rounded-[14px] border border-blue-100 bg-blue-50/60 px-4 py-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">
              {prefillSourceName} 매물 정보 (자동 입력됨)
            </p>
            <div className="space-y-3">
              <ConsultationRow label="관심 매물 주소">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={fieldClassName}
                />
              </ConsultationRow>
              <ConsultationRow label="가격 정보">
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={fieldClassName}
                />
              </ConsultationRow>
              <ConsultationRow label="관심 지역">
                <input
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className={fieldClassName}
                />
              </ConsultationRow>
              <ConsultationRow label="담당 중개사">
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className={fieldClassName}
                />
              </ConsultationRow>
              <ConsultationRow label="중개사 연락처">
                <input
                  type="text"
                  value={agentPhone}
                  onChange={(e) => setAgentPhone(e.target.value)}
                  className={fieldClassName}
                />
              </ConsultationRow>
            </div>
          </div>
        )}

        <ConsultationRow label="이름" required>
          <input
            id="consultation-name"
            name="name"
            type="text"
            required
            placeholder="홍길동"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            className={fieldClassName}
          />
        </ConsultationRow>

        <ConsultationRow label="연락처" required>
          <input
            id="consultation-phone"
            name="phone"
            type="tel"
            required
            placeholder="010-0000-0000"
            value={phoneNumber}
            onChange={handlePhoneChange}
            inputMode="numeric"
            autoComplete="tel"
            className={fieldClassName}
          />
        </ConsultationRow>

        <ConsultationRow label="이메일" optional>
          <input
            id="consultation-email"
            name="email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClassName}
          />
        </ConsultationRow>

        <ConsultationRow label="상담 내용" optional>
          <textarea
            id="consultation-message"
            name="message"
            placeholder="찾고 계신 지역, 예산, 상담받고 싶은 내용을 자유롭게 적어주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${fieldClassName} min-h-[80px] resize-none`}
          />
        </ConsultationRow>

        <ConsultationRow label="개인정보 동의" required>
          <label className="flex items-start gap-3 px-1 text-[11px] leading-5 text-[var(--color-text-muted)] sm:text-xs sm:leading-5">
            <input
              id="consultation-consent"
              name="consent"
              type="checkbox"
              required
              checked={hasConsent}
              onChange={(event) => setHasConsent(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 accent-[var(--color-accent)]"
            />
            <span>
              <strong className="font-semibold text-[var(--color-primary)]">[필수]</strong>{" "}
              개인정보 수집 및 이용에 동의합니다. 수집 항목: 이름, 연락처, 이메일 | 이용 목적: 매물 상담 및 안내 | 보유 기간: 상담 완료 후 1년
            </span>
          </label>
        </ConsultationRow>

        <div className="pt-1">
          <button
            type="submit"
            disabled={!isSubmitEnabled}
            className={`inline-flex w-full items-center justify-center gap-2.5 rounded-[14px] px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/30 sm:text-base ${
              isSubmitEnabled
                ? "shadow-[0_18px_36px_rgba(49,93,255,0.24)] hover:-translate-y-0.5"
                : "cursor-not-allowed opacity-40"
            }`}
            style={
              isSubmitEnabled
                ? { background: "linear-gradient(135deg, #0083FF, #4C2CE2)" }
                : { background: "#94a3b8" }
            }
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            매물 상담 신청하기
          </button>
          <p className="mt-3 text-center text-[11px] text-[var(--color-text-muted)] sm:text-xs">
            전담 매니저가 24시간 내 연락드리겠습니다.
          </p>
        </div>
      </form>
    </div>
  );
}

type DealType = "매매" | "전세" | "월세";
const DEAL_TYPES: DealType[] = ["매매", "전세", "월세"];

const CERT_DOCUMENTS = [
  { key: "등기부등본", label: "등기부등본" },
  { key: "건축물대장", label: "건축물 대장" },
  { key: "국세납부증명서", label: "국세 납부 증명서" },
  { key: "지방세납부증명서", label: "지방세 납부 증명서" },
  { key: "전입세대확인서", label: "전입세대 확인서" },
  { key: "신분증", label: "신분증" },
] as const;

function RangeInput({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  minPlaceholder,
  maxPlaceholder,
}: {
  minValue: string;
  maxValue: string;
  onMinChange: (v: string) => void;
  onMaxChange: (v: string) => void;
  minPlaceholder: string;
  maxPlaceholder: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder={minPlaceholder}
        value={minValue}
        onChange={(e) => onMinChange(e.target.value)}
        className={fieldClassName}
      />
      <span className="flex-shrink-0 text-sm text-slate-400">~</span>
      <input
        type="text"
        placeholder={maxPlaceholder}
        value={maxValue}
        onChange={(e) => onMaxChange(e.target.value)}
        className={fieldClassName}
      />
    </div>
  );
}

function SellerForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDealTypes, setSelectedDealTypes] = useState<DealType[]>([]);
  const [propertyAddress, setPropertyAddress] = useState("");

  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [depositMin, setDepositMin] = useState("");
  const [depositMax, setDepositMax] = useState("");
  const [monthlyMin, setMonthlyMin] = useState("");
  const [monthlyMax, setMonthlyMax] = useState("");

  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>(
    Object.fromEntries(CERT_DOCUMENTS.map(({ key }) => [key, null]))
  );

  const [hasConsent, setHasConsent] = useState(false);

  const hasMonthlyRent = selectedDealTypes.includes("월세");
  const hasOtherDealType = selectedDealTypes.some((t) => t !== "월세");

  const isSubmitEnabled =
    name.trim().length > 0 &&
    phoneNumber.length === 13 &&
    selectedDealTypes.length > 0 &&
    propertyAddress.trim().length > 0 &&
    hasConsent;

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhoneNumber(event.target.value));
  };

  const toggleDealType = (type: DealType) => {
    setSelectedDealTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleFileChange =
    (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null;
      setUploadedFiles((prev) => ({ ...prev, [key]: file }));
    };

  const removeFile = (key: string) => {
    setUploadedFiles((prev) => ({ ...prev, [key]: null }));
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (!isSubmitEnabled) return;
    router.push("/consultation/submitted");
  };

  return (
    <div className="rounded-[24px] border border-white/60 bg-white/80 p-5 shadow-[0_20px_60px_rgba(49,93,255,0.08)] backdrop-blur-sm sm:p-8">
      <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
        <ConsultationRow label="이름" required>
          <input
            type="text"
            required
            placeholder="홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className={fieldClassName}
          />
        </ConsultationRow>

        <ConsultationRow label="연락처" required>
          <input
            type="tel"
            required
            placeholder="010-0000-0000"
            value={phoneNumber}
            onChange={handlePhoneChange}
            inputMode="numeric"
            autoComplete="tel"
            className={fieldClassName}
          />
        </ConsultationRow>

        <ConsultationRow label="이메일" optional>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClassName}
          />
        </ConsultationRow>

        <ConsultationRow label="희망 거래 유형" required>
          <div className="flex flex-wrap gap-2">
            {DEAL_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => toggleDealType(type)}
                className={`rounded-[10px] border px-5 py-2.5 text-sm font-semibold transition-all duration-150 ${
                  selectedDealTypes.includes(type)
                    ? "border-transparent text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
                }`}
                style={
                  selectedDealTypes.includes(type)
                    ? { background: "linear-gradient(135deg, #0083FF, #4C2CE2)" }
                    : undefined
                }
              >
                {type}
              </button>
            ))}
          </div>
        </ConsultationRow>

        <ConsultationRow label="매물 주소" required>
          <input
            type="text"
            required
            placeholder="예: 서울시 강남구 역삼동 123-45"
            value={propertyAddress}
            onChange={(e) => setPropertyAddress(e.target.value)}
            className={fieldClassName}
          />
        </ConsultationRow>

        {hasOtherDealType && (
          <ConsultationRow label="희망 거래가" required>
            <RangeInput
              minValue={priceMin}
              maxValue={priceMax}
              onMinChange={setPriceMin}
              onMaxChange={setPriceMax}
              minPlaceholder="최소 (예: 3억)"
              maxPlaceholder="최대 (예: 5억)"
            />
          </ConsultationRow>
        )}

        {hasMonthlyRent && (
          <>
            <ConsultationRow label="희망 보증금" required>
              <RangeInput
                minValue={depositMin}
                maxValue={depositMax}
                onMinChange={setDepositMin}
                onMaxChange={setDepositMax}
                minPlaceholder="최소 (예: 1,000만)"
                maxPlaceholder="최대 (예: 3,000만)"
              />
            </ConsultationRow>
            <ConsultationRow label="희망 월세" required>
              <RangeInput
                minValue={monthlyMin}
                maxValue={monthlyMax}
                onMinChange={setMonthlyMin}
                onMaxChange={setMonthlyMax}
                minPlaceholder="최소 (예: 50만)"
                maxPlaceholder="최대 (예: 100만)"
              />
            </ConsultationRow>
          </>
        )}

        <ConsultationRow label="인증 배지 발급" optional>
          <div className="space-y-2.5">
            <p className="text-xs text-slate-400">
              서류를 업로드하시면 매물에 인증 배지가 발급됩니다.
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {CERT_DOCUMENTS.map(({ key, label }) => {
                const file = uploadedFiles[key];
                return (
                  <div key={key}>
                    {file ? (
                      <div className="flex items-center gap-2.5 rounded-[12px] border border-blue-200 bg-blue-50/60 px-3.5 py-2.5">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-[var(--color-accent)]">
                            {label}
                          </p>
                          <p className="truncate text-[11px] text-slate-500">{file.name}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(key)}
                          className="flex-shrink-0 rounded-full p-0.5 text-slate-400 transition hover:text-red-400"
                          aria-label={`${label} 파일 삭제`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex cursor-pointer items-center gap-2.5 rounded-[12px] border border-dashed border-slate-200 bg-white px-3.5 py-2.5 transition hover:border-[var(--color-accent)]/40 hover:bg-blue-50/30">
                        <Upload className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
                        <span className="text-xs text-slate-500">{label}</span>
                        <input
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange(key)}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </ConsultationRow>

        <ConsultationRow label="개인정보 동의" required>
          <label className="flex items-start gap-3 px-1 text-[11px] leading-5 text-[var(--color-text-muted)] sm:text-xs sm:leading-5">
            <input
              type="checkbox"
              required
              checked={hasConsent}
              onChange={(event) => setHasConsent(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 accent-[var(--color-accent)]"
            />
            <span>
              <strong className="font-semibold text-[var(--color-primary)]">[필수]</strong>{" "}
              개인정보 수집 및 이용에 동의합니다. 수집 항목: 이름, 연락처, 이메일, 매물 주소 | 이용 목적: 매물 등록 신청 및 안내 | 보유 기간: 신청 완료 후 1년
            </span>
          </label>
        </ConsultationRow>

        <div className="pt-1">
          <button
            type="submit"
            disabled={!isSubmitEnabled}
            className={`inline-flex w-full items-center justify-center gap-2.5 rounded-[14px] px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/30 sm:text-base ${
              isSubmitEnabled
                ? "shadow-[0_18px_36px_rgba(49,93,255,0.24)] hover:-translate-y-0.5"
                : "cursor-not-allowed opacity-40"
            }`}
            style={
              isSubmitEnabled
                ? { background: "linear-gradient(135deg, #0083FF, #4C2CE2)" }
                : { background: "#94a3b8" }
            }
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            매물 등록 신청하기
          </button>
          <p className="mt-3 text-center text-[11px] text-[var(--color-text-muted)] sm:text-xs">
            전담 매니저가 24시간 내 연락드리겠습니다.
          </p>
        </div>
      </form>
    </div>
  );
}

function ConsultationPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"buyer" | "seller">(
    searchParams.get("tab") === "seller" ? "seller" : "buyer"
  );

  return (
    <main
      className="min-h-[calc(100vh-56px)]"
      style={{ background: "var(--gradient-background)" }}
    >
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mb-8 sm:mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
            HomeShopper
          </p>

          <div className="mt-4 inline-flex rounded-[12px] border border-slate-200 bg-slate-100/70 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("buyer")}
              className={`rounded-[9px] px-6 py-2 text-sm font-semibold transition-all duration-200 ${
                activeTab === "buyer"
                  ? "text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
              style={
                activeTab === "buyer"
                  ? { background: "linear-gradient(135deg, #0083FF, #4C2CE2)" }
                  : undefined
              }
            >
              매수자
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("seller")}
              className={`rounded-[9px] px-6 py-2 text-sm font-semibold transition-all duration-200 ${
                activeTab === "seller"
                  ? "text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
              style={
                activeTab === "seller"
                  ? { background: "linear-gradient(135deg, #0083FF, #4C2CE2)" }
                  : undefined
              }
            >
              매도자
            </button>
          </div>

          <h1
            className="mt-4 font-[family-name:var(--font-heading)] text-3xl leading-tight tracking-[-0.03em] text-[var(--color-primary)] sm:text-4xl"
            style={{ fontFamily: "AppleSDGothicNeoSB00, var(--font-apple-sd)" }}
          >
            {activeTab === "buyer" ? "상담 신청" : "매물 등록 신청"}
          </h1>
          <p className="mt-4 text-sm leading-6 text-[var(--color-text-muted)] sm:text-base sm:leading-7">
            {activeTab === "buyer"
              ? "조건을 남겨주시면 전담 매니저가 매물 방향을 정리해 드리고, 24시간 이내에 연락드리겠습니다."
              : "매물 정보를 알려주시면 전담 매니저가 서류 검토 후, 24시간 이내에 연락드리겠습니다."}
          </p>
        </div>

        <Suspense fallback={<div className="h-96 animate-pulse rounded-[24px] bg-white/60" />}>
          {activeTab === "buyer" ? <BuyerForm /> : <SellerForm />}
        </Suspense>
      </div>
    </main>
  );
}

export default function ConsultationPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-[calc(100vh-56px)]"
          style={{ background: "var(--gradient-background)" }}
        />
      }
    >
      <ConsultationPageContent />
    </Suspense>
  );
}
