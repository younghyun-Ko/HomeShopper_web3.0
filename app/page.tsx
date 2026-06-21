import { SearchHeroSection } from "@/components/search-hero-section";
import { LandingContentSwitch } from "@/components/landing-content-switch";
import { SellerBenefits } from "@/components/seller-benefits";
import { SwitchableStepsSection } from "@/components/switchable-steps-section";
import { SwitchableAiSection } from "@/components/switchable-ai-section";
import {
  BadgePercent,
  Eye,
  Handshake,
  Percent,
  ShieldCheck,
  Wallet,
} from "lucide-react";

const whyPromises = [
  {
    title: "중개 수수료 대폭 절감",
    body: [
      "매칭부터 서류까지 맡아",
      "중개사 업무 로드를 줄이고",
      "수수료를 낮춥니다",
    ],
    icon: Percent,
    circleClass:
      "bg-[linear-gradient(135deg,rgba(49,93,255,0.92)_0%,rgba(91,93,246,0.86)_100%)]",
    glowClass: "shadow-[0_24px_60px_rgba(49,93,255,0.22)]",
  },
  {
    title: "AI 권리관계 안심 분석",
    body: [
      "등기부등본과 실거래가를",
      "AI가 자동 분석해",
      "거래 리스크를 사전에 차단합니다",
    ],
    icon: ShieldCheck,
    circleClass:
      "bg-[linear-gradient(135deg,rgba(57,154,216,0.9)_0%,rgba(49,119,255,0.84)_100%)]",
    glowClass: "shadow-[0_24px_60px_rgba(57,154,216,0.2)]",
  },
  {
    title: "전속 중개 매칭",
    body: [
      "검증된 제휴 중개사가",
      "전속으로 배정되어",
      "거래 완료까지 책임지고 함께합니다",
    ],
    icon: Handshake,
    circleClass:
      "bg-[linear-gradient(135deg,rgba(103,87,255,0.9)_0%,rgba(126,73,232,0.86)_100%)]",
    glowClass: "shadow-[0_24px_60px_rgba(103,87,255,0.2)]",
  },
];

const whyExtras = [
  {
    icon: BadgePercent,
    title: "업계 최저 수준 중개 수수료",
    body: "법정 최고 수수료의 절반 이하로 설계된 투명 요금제. 플랫폼 자동화로 절감한 비용을 고객에게 직접 돌려드립니다.",
  },
  {
    icon: Wallet,
    title: "수수료 사전 확인, 숨겨진 비용 없음",
    body: "계약 전에 예상 수수료를 앱에서 즉시 확인하세요. 홈쇼퍼는 계약 이후 추가 비용을 청구하지 않습니다.",
  },
  {
    icon: Eye,
    title: "청년 맞춤 특가 서비스",
    body: "대학생·사회초년생을 위한 우대 요금 적용. 첫 독립을 준비하는 분들이 안심하고 계약에 집중할 수 있도록 돕습니다.",
  },
];

const showTemporaryLandingSections = false;

function HeroCtaSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100vh-56px)] flex-col items-start justify-center overflow-hidden px-6 sm:px-10"
    >
      {/* Background: radial gradient base matching image tone + image on top at 82% */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#eff3fb",
          backgroundImage: "url('/hero-bg.png')",
          backgroundSize: "auto 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />
      {/* Bottom fade-out gradient to page background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2/5"
        style={{ background: "linear-gradient(to bottom, transparent 0%, #f8fbff 100%)" }}
        aria-hidden="true"
      />
      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="space-y-12">
          <h2
            id="hero-heading"
            className="max-w-4xl font-[family-name:var(--font-heading)] text-3xl font-bold leading-[1.08] tracking-[-0.05em] text-[var(--color-primary)] sm:text-5xl md:text-7xl"
          >
            <span className="block">우리의 부동산 계약,</span>
            <span className="block">
              <span className="bg-gradient-to-r from-[#0083FF] to-[#4C2CE2] bg-clip-text text-transparent text-[1.2em]">
                홈쇼퍼
              </span>
              로 더 쉽고
            </span>
            <span className="block">더 스마트하게.</span>
          </h2>
          <p className="max-w-2xl text-xl leading-9 text-[var(--color-text-muted)] sm:text-2xl">
            데이터 기반의 권리 분석과 합리적인 중개 시스템으로
            <br />
            당신의 첫 보금자리를 안전하게 시작하세요.
          </p>
        </div>

        <div
          className="mt-10 flex flex-wrap gap-3"
          aria-label="Hero call to action"
        >
          <a
            href="#search-hero"
            className="inline-flex items-center justify-center rounded-full px-7 py-4 text-base font-semibold !text-white transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #0083FF, #4C2CE2)" }}
          >
            링크로 중개 요청하기
          </a>
          <a
            href="/listings"
            className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/70 px-7 py-4 text-base font-semibold text-[var(--color-text)] backdrop-blur transition-transform duration-200 hover:-translate-y-0.5"
          >
            실시간 매물 보기
          </a>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="relative overflow-hidden px-6 py-36 sm:px-10 sm:py-48"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2
            id="why-heading"
            className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
            style={{
              background: "linear-gradient(135deg, #0083FF, #4C2CE2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            왜 홈쇼퍼인가요?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-8 text-[var(--color-text-muted)] sm:text-xl">
            독립을 준비하는 청년(대학생·사회초년생)들을 위한 세 가지 차별화된 약속
          </p>
        </div>

        <div
          className="mt-16 flex flex-col items-center justify-center sm:mt-20 lg:mt-24 lg:flex-row"
          aria-label="홈쇼퍼의 세 가지 차별화 약속"
        >
          {whyPromises.map((item, index) => {
            const ItemIcon = item.icon;

            return (
              <div
                key={item.title}
                className={[
                  "relative flex aspect-square w-[min(78vw,320px)] shrink-0 flex-col items-center justify-center rounded-full px-10 text-center text-white backdrop-blur-sm sm:w-[330px] lg:w-[350px]",
                  item.circleClass,
                  item.glowClass,
                  index > 0 ? "-mt-4 lg:-ml-4 lg:mt-0" : "",
                ].join(" ")}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/14 ring-1 ring-white/30">
                  <ItemIcon className="h-9 w-9" strokeWidth={2.1} />
                </div>
                <h3 className="mt-6 font-[family-name:var(--font-heading)] text-2xl font-bold leading-tight sm:text-[1.65rem]">
                  {item.title}
                </h3>
                <p className="mt-5 text-[0.95rem] font-normal leading-7 text-white/82 sm:text-base">
                  {item.body.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional benefit cards */}
        <div className="mt-20 grid gap-5 sm:grid-cols-3 lg:mt-24">
          {whyExtras.map((item) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[24px] bg-white/70 p-7 shadow-[0_14px_34px_rgba(49,93,255,0.08)] backdrop-blur-sm"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                  style={{ background: "linear-gradient(135deg, #0083FF, #4C2CE2)" }}
                >
                  <ItemIcon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-heading)] text-xl font-bold leading-snug text-[var(--color-primary)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-base font-normal leading-7 text-[var(--color-text-muted)]">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExclusiveAgentSection() {
  return <LandingSection id="exclusive-agent" heading="전속 중개" />;
}

function ListedPropertiesSection() {
  return <LandingSection id="listed-properties" heading="등록 매물" />;
}

function SectionDivider() {
  return (
    <div className="flex justify-center">
      <hr className="w-1/3 border-t border-gray-200" />
    </div>
  );
}

function LandingSection({
  id,
  heading,
}: {
  id: string;
  heading: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="px-6 py-16 sm:px-10 sm:py-20"
    >
      <div className="mx-auto max-w-6xl rounded-[var(--radius-lg)] border border-white/60 bg-[var(--color-surface)] px-6 py-10 backdrop-blur sm:px-8 sm:py-12">
        <h2
          id={`${id}-heading`}
          className="font-[family-name:var(--font-heading)] text-3xl text-[var(--color-text)] sm:text-4xl"
        >
          {heading}
        </h2>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="overflow-x-hidden text-[var(--color-text)]">
      <HeroCtaSection />
      <SectionDivider />
      <SearchHeroSection />
      <SectionDivider />
      <LandingContentSwitch
        buyerContent={<WhySection />}
        sellerContent={<SellerBenefits />}
      />
      <SectionDivider />
      <SwitchableStepsSection />
      <SectionDivider />
      <SwitchableAiSection />
      {showTemporaryLandingSections ? (
        <>
          <ExclusiveAgentSection />
          <ListedPropertiesSection />
        </>
      ) : null}
    </main>
  );
}
