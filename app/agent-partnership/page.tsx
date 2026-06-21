"use client";

import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Clock3,
  FileCheck2,
  LineChart,
  MapPin,
  Phone,
  ShieldCheck,
  TrendingDown,
  Users,
  UserRound,
  Zap,
  BarChart3,
  BadgeCheck,
} from "lucide-react";

type PartnershipFieldProps = {
  children: ReactNode;
  icon: ReactNode;
  label: string;
  required?: boolean;
};

type BenefitItem = {
  body: string;
  icon: typeof Clock3;
  title: string;
  tone: string;
};

const benefits: BenefitItem[] = [
  {
    title: "업무 범위 축소",
    body: "서류 검토, 보증, 최종 납입 등 핵심 법적 절차만 중개 업무가 한정됩니다. 나머지는 홈쇼퍼가 처리합니다.",
    icon: Clock3,
    tone: "from-[#315dff] to-[#6757ff] shadow-[0_18px_36px_rgba(49,93,255,0.22)]",
  },
  {
    title: "영업 리소스 절감",
    body: "플랫폼이 매도자 및 매수자를 직접 연결하여 고객 유치 부담을 해소합니다. 별도 영업 활동 불필요.",
    icon: Users,
    tone: "from-[#456eff] to-[#3296d8] shadow-[0_18px_36px_rgba(50,150,216,0.2)]",
  },
  {
    title: "부가 수익 창출",
    body: "전담 투입 시간은 줄고, 플랫폼 매칭으로 거래 빈도는 늘어나 총수익이 증가합니다.",
    icon: LineChart,
    tone: "from-[#24b8c9] to-[#315dff] shadow-[0_18px_36px_rgba(36,184,201,0.18)]",
  },
  {
    title: "AI 서류 분석 지원",
    body: "등기부등본·건축물대장 AI 자동 분석으로 권리관계 검토 시간을 90% 이상 절감합니다.",
    icon: ShieldCheck,
    tone: "from-[#1fd18c] to-[#10a86d] shadow-[0_18px_36px_rgba(16,168,109,0.18)]",
  },
];

const detailedStats = [
  {
    value: "90%+",
    label: "서류 검토 시간 절감",
    desc: "AI가 등기부·건축물대장을 즉시 분석",
    icon: Zap,
  },
  {
    value: "2~3배",
    label: "거래 처리 효율 향상",
    desc: "플랫폼 자동화로 동시 거래 수 증가",
    icon: BarChart3,
  },
  {
    value: "50%↓",
    label: "평균 수수료 절감 효과",
    desc: "고객 유치 비용 및 영업 비용 감소",
    icon: TrendingDown,
  },
  {
    value: "즉시",
    label: "검증된 고객 매칭 시작",
    desc: "회원 가입 즉시 플랫폼 매칭 노출",
    icon: BadgeCheck,
  },
];

const additionalBenefits = [
  {
    title: "플랫폼 기반 마케팅 제공",
    body: "홈쇼퍼가 SNS·검색 광고를 대신합니다. 중개사님은 영업 없이 플랫폼이 연결한 검증된 고객만 만나면 됩니다.",
  },
  {
    title: "예측 가능한 수익 파이프라인",
    body: "불규칙한 영업 수익 대신, 플랫폼 매칭 거래가 꾸준히 유입되어 월별 수익 예측이 가능해집니다.",
  },
  {
    title: "법적 분쟁 예방 시스템",
    body: "AI 분석 리포트와 표준화된 계약 절차로 계약 이후 발생할 수 있는 분쟁 리스크를 사전에 차단합니다.",
  },
];

const propertyTypes = [
  "원룸",
  "투룸",
  "빌라",
  "오피스텔",
  "아파트",
  "기타",
];

const inputClassName =
  "w-full rounded-[18px] border border-white/70 bg-white/82 px-4 py-3.5 text-sm font-medium text-[var(--color-primary)] shadow-[0_14px_30px_rgba(49,93,255,0.08)] outline-none transition placeholder:text-[#90a0bf] focus:border-[#9eb5ff] focus:bg-white sm:text-base";

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

function PartnershipField({
  children,
  icon,
  label,
  required = false,
}: PartnershipFieldProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] sm:text-base">
        <span className="text-[#8293bb]" aria-hidden="true">
          {icon}
        </span>
        <span>
          {label}
          {required ? <span className="text-[#ff4f6d]"> *</span> : null}
        </span>
      </label>
      {children}
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="partnership-hero"
      aria-labelledby="partnership-hero-heading"
      className="relative isolate flex min-h-[560px] items-center justify-center overflow-hidden px-6 pb-36 pt-[72px] sm:px-10 lg:min-h-[620px] lg:pb-44"
    >
      <div className="mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#cbd8ff] bg-white/72 px-4 py-2 text-xs font-bold text-[var(--color-primary)] shadow-[0_12px_32px_rgba(49,93,255,0.1)] backdrop-blur sm:text-sm">
          <ShieldCheck className="h-4 w-4 text-[var(--color-accent)]" aria-hidden="true" />
          파트너 중개사 모집 중
        </div>

        <h1
          id="partnership-hero-heading"
          className="mx-auto mt-8 max-w-[980px] font-[family-name:var(--font-heading)] text-4xl font-black leading-[1.18] tracking-[-0.04em] text-[var(--color-primary)] sm:text-5xl lg:text-[3.65rem]"
        >
          제휴 중개사가 되어,
          <br />
          <span className="text-[var(--color-accent)]">새로운 수익 파이프라인</span>을 만드세요
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base font-normal leading-8 text-[var(--color-text-muted)] sm:text-xl sm:leading-9">
          홈쇼퍼가 고객 유치부터 서류 분석까지 처리합니다.
          <br className="hidden sm:block" />
          중개사님은 핵심 업무에만 집중하세요.
        </p>

        <a
          href="#partnership-form"
          className="button-gradation mt-12 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-black !text-white shadow-[0_18px_36px_rgba(49,93,255,0.24)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/30 sm:text-base"
        >
          제휴 신청하기
          <ArrowRight className="h-4 w-4 text-white" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section
      id="partnership-benefits"
      aria-labelledby="partnership-benefits-heading"
      className="relative overflow-hidden px-6 py-40 sm:px-10 lg:py-52"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2
            id="partnership-benefits-heading"
            className="font-[family-name:var(--font-heading)] text-3xl font-black leading-tight tracking-[-0.04em] sm:text-5xl"
            style={{
              background: "linear-gradient(135deg, #0083FF, #4C2CE2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            왜 홈쇼퍼와 함께해야 할까요?
          </h2>
          <p className="mt-4 text-base font-normal text-[#8ca0c5] sm:text-lg">
            제휴 중개사에게 제공되는 네 가지 핵심 혜택
          </p>
        </div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <div className="relative mx-auto min-h-[430px] w-full max-w-[620px] sm:min-h-[520px]">
            <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/62 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_28px_80px_rgba(49,93,255,0.08)] sm:left-[58%] sm:h-[440px] sm:w-[440px]" />
            <div className="button-gradation absolute left-1/2 top-1/2 flex h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full px-8 text-center text-white shadow-[0_24px_60px_rgba(49,93,255,0.24)] sm:left-[-28px] sm:h-[220px] sm:w-[220px] sm:translate-x-0">
              <span className="text-2xl font-black leading-tight tracking-normal sm:text-3xl">
                홈쇼퍼와
              </span>
              <span className="mt-1 text-2xl font-black leading-tight tracking-normal sm:text-3xl">
                함께할 이유
              </span>
            </div>

            <div className="absolute left-[39%] top-1/2 hidden max-w-[315px] -translate-y-1/2 text-[var(--color-primary)] sm:block">
              <p className="text-xl font-extrabold leading-8 tracking-[-0.03em] sm:text-[1.35rem] sm:leading-9">
                반복 업무는 줄이고,
                <br />
                검증된 거래 기회는 늘립니다.
              </p>
              <p className="mt-5 text-base font-medium leading-8 text-[var(--color-text-muted)]">
                홈쇼퍼는 플랫폼 매칭과 AI 서류
                <br />
                분석을 통해 제휴 중개사의 실무 시간을
                <br />
                더 가치 있게 바꿉니다.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {benefits.map((benefit) => {
              const BenefitIcon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="grid gap-5 sm:grid-cols-[96px_1fr] sm:items-start"
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white ${benefit.tone} sm:h-18 sm:w-18`}
                    >
                      <BenefitIcon className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
                    </div>
                    <div className="hidden h-px flex-1 bg-[#bac8e7] sm:block" />
                  </div>
                  <div className="pt-1 sm:pt-0">
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl font-black tracking-[-0.03em] text-[var(--color-primary)]">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-lg font-normal leading-8 text-[var(--color-text-muted)]">
                      {benefit.body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailedBenefitsSection() {
  return (
    <section
      id="partnership-detailed"
      aria-labelledby="partnership-detailed-heading"
      className="px-6 py-24 sm:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        {/* Stats row */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {detailedStats.map((stat) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-[24px] bg-white/70 p-7 shadow-[0_14px_34px_rgba(49,93,255,0.08)] backdrop-blur-sm"
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl text-white"
                  style={{ background: "linear-gradient(135deg, #0083FF, #4C2CE2)" }}
                >
                  <StatIcon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                </div>
                <p
                  className="mt-5 font-[family-name:var(--font-heading)] text-4xl font-black tracking-[-0.04em]"
                  style={{
                    background: "linear-gradient(135deg, #0083FF, #4C2CE2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </p>
                <p className="mt-2 font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-primary)]">
                  {stat.label}
                </p>
                <p className="mt-2 text-base font-normal leading-6 text-[var(--color-text-muted)]">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional benefits */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {additionalBenefits.map((item) => (
            <div
              key={item.title}
              className="rounded-[24px] border border-white/60 bg-white/50 p-7 backdrop-blur-sm"
            >
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-black text-[var(--color-primary)]">
                {item.title}
              </h3>
              <p className="mt-3 text-base font-normal leading-7 text-[var(--color-text-muted)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnershipFormSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [officeName, setOfficeName] = useState("");
  const [representative, setRepresentative] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhoneNumber(event.target.value));
    setIsSubmitted(false);
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type],
    );
    setIsSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleSubmitClick = () => {
    const form = formRef.current;

    if (!form?.reportValidity()) {
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <section
      id="partnership-form"
      aria-labelledby="partnership-form-heading"
      className="px-6 py-40 sm:px-10 lg:py-52"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2
            id="partnership-form-heading"
            className="font-[family-name:var(--font-heading)] text-3xl font-black tracking-[-0.04em] text-[var(--color-primary)] sm:text-5xl"
          >
            제휴 신청하기
          </h2>
          <p className="mt-5 text-base font-normal leading-7 text-[#8ca0c5] sm:text-lg">
            아래 정보를 입력해 주시면 빠르게 검토해 드리겠습니다
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="consultation-glass-card mx-auto mt-14 w-full max-w-[740px] rounded-[30px] p-5 backdrop-blur-md sm:p-9 lg:p-11"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(235, 243, 255, 0.74) 100%)",
          }}
        >
          <div className="space-y-7">
            <PartnershipField
              label="중개사무소명"
              required
              icon={<Building2 className="h-4 w-4" />}
            >
              <input
                id="partnership-office"
                name="office"
                type="text"
                required
                value={officeName}
                onChange={(event) => {
                  setOfficeName(event.target.value);
                  setIsSubmitted(false);
                }}
                placeholder="홈쇼퍼공인중개사사무소"
                autoComplete="organization"
                className={inputClassName}
              />
            </PartnershipField>

            <PartnershipField
              label="대표자명"
              required
              icon={<UserRound className="h-4 w-4" />}
            >
              <input
                id="partnership-representative"
                name="representative"
                type="text"
                required
                value={representative}
                onChange={(event) => {
                  setRepresentative(event.target.value);
                  setIsSubmitted(false);
                }}
                placeholder="홍길동"
                autoComplete="name"
                className={inputClassName}
              />
            </PartnershipField>

            <PartnershipField
              label="연락처"
              required
              icon={<Phone className="h-4 w-4" />}
            >
              <input
                id="partnership-phone"
                name="phone"
                type="tel"
                required
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="010-0000-0000"
                inputMode="numeric"
                autoComplete="tel"
                pattern="\d{3}-?\d{3,4}-?\d{4}"
                title="010-0000-0000 형식으로 입력해 주세요."
                className={inputClassName}
              />
            </PartnershipField>

            <PartnershipField
              label="소재지"
              required
              icon={<MapPin className="h-4 w-4" />}
            >
              <input
                id="partnership-location"
                name="location"
                type="text"
                required
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                  setIsSubmitted(false);
                }}
                placeholder="전주시 덕진구 에코시티로 00"
                autoComplete="street-address"
                className={inputClassName}
              />
            </PartnershipField>
          </div>

          <fieldset className="mt-8">
            <legend className="text-sm font-bold text-[var(--color-primary)] sm:text-base">
              주요 취급 매물 유형{" "}
              <span className="font-semibold text-[#8293bb]">(복수 선택 가능)</span>
            </legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {propertyTypes.map((type) => {
                const isSelected = selectedTypes.includes(type);

                return (
                  <label key={type} className="block">
                    <input
                      type="checkbox"
                      name="propertyTypes"
                      value={type}
                      checked={isSelected}
                      onChange={() => handleTypeChange(type)}
                      className="peer sr-only"
                    />
                    <span className="flex min-h-12 items-center justify-center rounded-[14px] border border-white/72 bg-white/82 px-3 text-center text-sm font-bold text-[#8293bb] shadow-[0_10px_24px_rgba(49,93,255,0.06)] transition peer-checked:border-[#8eabff] peer-checked:bg-[#eef4ff] peer-checked:text-[var(--color-accent)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-accent)]/30">
                      {type}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={handleSubmitClick}
            className="button-gradation mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-black !text-white shadow-[0_18px_36px_rgba(49,93,255,0.24)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/30 sm:text-base"
          >
            <FileCheck2 className="h-5 w-5 text-white" aria-hidden="true" />
            제휴 신청 제출하기
          </button>

          {isSubmitted ? (
            <div className="mt-5 flex items-center justify-center gap-2 rounded-[14px] bg-[#ecfff5] px-4 py-3 text-sm font-bold text-[#128953]">
              <Check className="h-4 w-4" aria-hidden="true" />
              제휴 신청이 접수되었습니다. 담당자가 빠르게 검토해 드리겠습니다.
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function SectionDivider() {
  return (
    <div className="flex justify-center">
      <hr className="w-1/3 border-t border-gray-200" />
    </div>
  );
}

export default function AgentPartnershipPage() {
  return (
    <main className="overflow-x-hidden text-[var(--color-text)]">
      <HeroSection />
      <SectionDivider />
      <WhySection />
      <SectionDivider />
      <DetailedBenefitsSection />
      <SectionDivider />
      <PartnershipFormSection />
    </main>
  );
}
