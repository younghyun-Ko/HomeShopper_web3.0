import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  FileText,
  Gavel,
  Home,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

const GRAD_TEXT_STYLE = {
  background: "linear-gradient(135deg, #0083FF, #4C2CE2)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};
const GRAD_HEADING_CLASS =
  "font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl";

const BLACK_SUB_HEADING_STYLE = {
  fontFamily: "AppleSDGothicNeoB00, sans-serif",
};
const BLACK_SUB_HEADING_CLASS =
  "text-center text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl";

const sellerBenefitCards = [
  {
    title: "광고비 없이 매물 등록",
    body: (
      <>
        직방·다방식 매물 광고비가 0원입니다.
        <br />
        광고비 대신 거래 성사 시에만 비용이 발생하는 구조라, 빈 방을 부담 없이
        등록하고 노출할 수 있습니다.
      </>
    ),
    icon: Building2,
  },
  {
    title: "간편한 온라인 가격 협상",
    body: (
      <>
        매수자와 직접 만나지 않아도 비대면으로 간편하게 가격을 협상할 수
        있습니다.
        <br />
        여러 매수자가 경쟁 입찰하는 방식으로, 다수의 매수자와 한 번에 협상할
        수 있습니다.
      </>
    ),
    icon: TrendingUp,
  },
  {
    title: "전속 중개로 빠른 거래",
    body: (
      <>
        하나의 매물을 한 명의 전담 제휴 중개사가 책임지는 전속 중개 구조로,
        여러 부동산에 매물을 뿌리지 않아도 됩니다.
        <br />
        평균 공실 기간 단축을 목표로 합니다.
      </>
    ),
    icon: Zap,
  },
];

/** 각 항목별 accent 색상 — icon 색 + 제목 키워드 색 공유 */
const landlordSteps = [
  {
    number: "01",
    title: "공실 기간 단축",
    titleJsx: (
      <>
        공실 기간{" "}
        <span style={{ color: "#33AAFF" }}>단축</span>
      </>
    ),
    body: (
      <>
        청년 주거 수요가 집중되는 학기 시즌에 맞춰 검증된 임차인을 자동 매칭.
        매물 노출에서 거래 성사까지 걸리는 기간 단축을 KPI로 관리합니다.
      </>
    ),
    icon: Home,
    color: "#33AAFF",
  },
  {
    number: "02",
    title: "광고비·관리 부담 제로",
    titleJsx: (
      <>
        광고비·관리 부담{" "}
        <span style={{ color: "#0083FF" }}>제로</span>
      </>
    ),
    body: (
      <>
        매물 등록과 신뢰 인증 뱃지(Verified Listing) 발급은 무료. 임대인
        대시보드에서 분쟁 알림·재계약 리마인더를 받아 별도 관리 노력 없이 매물을
        운영할 수 있습니다.
      </>
    ),
    icon: Building2,
    color: "#0083FF",
  },
  {
    number: "03",
    title: "경쟁 입찰 기반 가격 협상",
    titleJsx: (
      <>
        <span style={{ color: "#0EA5E9" }}>경쟁 입찰</span> 기반 가격 협상
      </>
    ),
    body: (
      <>
        다수의 매수자가 경쟁 입찰하는 구조로 가격이 형성됩니다. 비대면으로
        여러 매수자와 동시에 간편하게 협상할 수 있습니다.
      </>
    ),
    icon: Gavel,
    color: "#0EA5E9",
  },
  {
    number: "04",
    title: "AI 서류 자동 검토로 거래 안전",
    titleJsx: (
      <>
        <span style={{ color: "#4C2CE2" }}>AI</span> 서류{" "}
        <span style={{ color: "#4C2CE2" }}>자동 검토</span>로 거래 안전
      </>
    ),
    body: (
      <>
        신규 매물 등록 시 등기부등본·건축물대장을 AI가 자동 검토해 사고
        매물·권리관계 문제를 사전 차단. 임대인도 깨끗한 권리관계를 증빙해 거래
        신뢰도를 높일 수 있습니다.
      </>
    ),
    icon: FileText,
    color: "#4C2CE2",
  },
  {
    number: "05",
    title: "단독 중개 보장",
    titleJsx: (
      <>
        <span style={{ color: "#3214A8" }}>단독</span> 중개 보장
      </>
    ),
    body: (
      <>
        홈쇼퍼에 최초로 등록한 임대인에게 해당 매물의 독점 중개 권한 부여.
        매물이 여러 채널에 중복 노출되어 가치가 떨어지는 일을 방지합니다.
      </>
    ),
    icon: Star,
    color: "#3214A8",
  },
];

const pricingItems = [
  { service: "매물 등록", price: "무료", note: null, optional: false },
  {
    service: "신뢰 인증 뱃지 발급",
    price: "무료",
    note: "추가 인증 서류 제출 필요",
    optional: false,
  },
  {
    service: "임대인 대시보드 Pro (분쟁 알림·재계약 리마인더)",
    price: "매물당 월 N원",
    note: null,
    optional: true,
  },
  {
    service: "상단 노출·하이라이트 카드",
    price: "매물당 월 N원",
    note: null,
    optional: true,
  },
  {
    service: "거래 성사 인센티브",
    price: "거래 성사 시에만 발생",
    note: "성공 보수형",
    optional: false,
  },
];

export function SellerBenefits() {
  return (
    <section
      aria-labelledby="for-landlords-heading"
      className="px-6 py-36 sm:px-10 sm:py-48"
    >
      {/* ── 제목 + 3카드 + 확실한 혜택 소제목: max-w-6xl ── */}
      <div className="mx-auto max-w-6xl">
        {/* 메인 제목 (그라디언트 유지) */}
        <div className="text-center">
          <h2
            id="for-landlords-heading"
            className={`text-center ${GRAD_HEADING_CLASS}`}
            style={GRAD_TEXT_STYLE}
          >
            내 방, 가장 빠르고 안전하게 임대하세요
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-8 text-[var(--color-text-muted)] sm:text-xl">
            광고비 0원, 검증된 청년 임차인과 직접 연결됩니다
          </p>
        </div>

        {/* 홈쇼퍼가 제공하는 혜택 (3카드) */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <h3
            className={BLACK_SUB_HEADING_CLASS}
            style={BLACK_SUB_HEADING_STYLE}
          >
            홈쇼퍼가 제공하는 혜택
          </h3>
          <div
            className="mt-8 grid gap-6 md:grid-cols-3"
            aria-label="임대인을 위한 세 가지 핵심 혜택"
          >
            {sellerBenefitCards.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#0083FF] to-[#4C2CE2]">
                    <ItemIcon
                      className="h-6 w-6 text-white"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </div>
                  <h4 className="mt-5 font-[family-name:var(--font-heading)] text-xl font-bold leading-snug text-gray-900">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 확실한 혜택 소제목 */}
        <div className="mt-20 lg:mt-28">
          <h3
            className={BLACK_SUB_HEADING_CLASS}
            style={BLACK_SUB_HEADING_STYLE}
          >
            확실한 혜택, 한눈에 보여드려요.
          </h3>
        </div>
      </div>

      {/* ── 흰색 박스: 이미지+텍스트 블록 가운데 정렬 ── */}
      <div className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">
        <div className="flex justify-center p-10 lg:p-12">
          {/* 이미지와 텍스트의 합산 너비만큼만 차지하는 그리드 */}
          <div className="grid items-stretch gap-12" style={{ gridTemplateColumns: "520px 340px" }}>

            {/* 이미지: 텍스트 칼럼 높이(= 그리드 행 높이)에 맞춰 stretch */}
            <div className="relative">
              <img
                src="/phone-mockup-dual.png"
                alt="홈쇼퍼 앱 — 안전 거래 대시보드 및 홈 화면"
                className="absolute inset-0 h-full w-full object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>

            {/* 피처 리스트: gap-6 간격, 340px 고정 너비 */}
            <div className="flex flex-col gap-6">
              {landlordSteps.map((step) => {
                const StepIcon = step.icon;
                return (
                  <div key={step.number}>
                    <div className="flex items-center gap-2">
                      <StepIcon
                        className="h-6 w-6 shrink-0"
                        style={{ color: step.color }}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <p
                        className="text-xl font-bold leading-snug text-gray-900"
                        style={{ fontFamily: "AppleSDGothicNeoB00, sans-serif" }}
                      >
                        {step.titleJsx}
                      </p>
                    </div>
                    <p className="mt-1.5 text-base leading-7 text-gray-500">
                      {step.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── 나머지 콘텐츠: max-w-6xl ── */}
      <div className="mx-auto max-w-6xl">
        {/* 계약 전까지 '0원', 압도적 비용 절감 */}
        <div className="mt-20 lg:mt-28">
          <h3
            className={`text-center ${GRAD_HEADING_CLASS}`}
            style={GRAD_TEXT_STYLE}
          >
            계약 전까지 &apos;0원&apos;,
            <br />
            압도적 비용 절감
          </h3>
          <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            {pricingItems.map((item, index) => (
              <div
                key={item.service}
                className={[
                  "flex flex-col gap-1.5 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6",
                  index < pricingItems.length - 1 ? "border-b border-gray-100" : "",
                ].join(" ")}
              >
                <div className="min-w-0">
                  <span className="text-base font-medium text-gray-900">
                    {item.service}
                  </span>
                  {item.optional && (
                    <span className="ml-2 rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                      선택
                    </span>
                  )}
                  {item.note && (
                    <p className="mt-0.5 text-xs text-gray-400">{item.note}</p>
                  )}
                </div>
                <span className="shrink-0 text-base font-semibold text-[#4C2CE2]">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 flex flex-col items-center gap-4 text-center lg:mt-28">
          <Link
            href="/consultation?tab=seller"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#0083FF] to-[#4C2CE2] px-8 py-4 text-base font-bold !text-white transition-opacity duration-200 hover:opacity-90"
            aria-label="매물 무료 등록하기 — 상담 신청 페이지로 이동"
          >
            내 매물 무료로 등록하기
          </Link>
          <p className="text-sm font-normal text-[var(--color-text-muted)] sm:text-base">
            전담 매니저가 24시간 내 연락드려 매물 등록과 검증을 도와드립니다
          </p>
        </div>
      </div>
    </section>
  );
}
