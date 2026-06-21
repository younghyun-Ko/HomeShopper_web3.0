import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  Check,
  CalendarDays,
  ChevronDown,
  CreditCard,
  FileSearch,
  FileText,
  Heart,
  House,
  Info,
  Landmark,
  Layers3,
  MapPin,
  Maximize2,
  MessageCircle,
  Receipt,
  RotateCcw,
  Ruler,
  SlidersHorizontal,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import Link from "next/link";

import {
  getMoveInTimelineLabel,
  PLACEHOLDER_BUILDING_REGIONS,
  PLACEHOLDER_BUILDINGS,
  type PlaceholderBuilding,
} from "@/lib/placeholder-buildings";
import type { BuildingType, DealType, MoveInTimeline } from "@/lib/offer-types";
import { ResponsiveDetails } from "@/components/responsive-details";


export const metadata: Metadata = {
  title: "매물 보기 | HomeShopper",
  description:
    "HomeShopper의 임시 매물 데이터를 활용한 대학생 및 사회초년생 맞춤 주거용 부동산 리스트입니다.",
};

const buildingTypeLabels: Record<BuildingType, string> = {
  medical_building: "아파트",
  commercial: "투룸",
  mixed_use: "빌라",
  office: "오피스텔",
  new_building: "원룸",
};

const dealTypeOptions: DealType[] = ["매매", "전세", "월세"];
const buildingTypeOptions = Object.entries(buildingTypeLabels) as [
  BuildingType,
  string,
][];
const moveInTimelineOptions: MoveInTimeline[] = [
  "immediate",
  "within_1_month",
  "within_3_months",
  "within_6_months",
  "flexible",
];

type ListingFilterValues = {
  buildingType: string;
  dealType: string;
  elevator: string;
  maxArea: string;
  maxPrice: string;
  minArea: string;
  minPrice: string;
  moveInTimeline: string;
  region: string;
};

type ListingsSearchParams = Promise<
  Record<string, string | string[] | undefined> | undefined
>;

const dealTypeTone: Record<
  DealType,
  {
    badgeClass: string;
    dotClass: string;
  }
> = {
  매매: {
    badgeClass: "bg-blue-50 text-blue-700 ring-blue-100",
    dotClass: "bg-blue-500",
  },
  전세: {
    badgeClass: "bg-orange-50 text-orange-700 ring-orange-100",
    dotClass: "bg-orange-500",
  },
  월세: {
    badgeClass: "bg-violet-50 text-violet-700 ring-violet-100",
    dotClass: "bg-violet-500",
  },
};

const statusBadgeClass: Record<string, string> = {
  상담가능: "bg-emerald-600 text-white",
  매칭중: "bg-slate-700 text-white",
};

function formatKoreanMoney(amountInEok: number) {
  const totalMan = Math.round(amountInEok * 10000);
  const eok = Math.floor(totalMan / 10000);
  const man = totalMan % 10000;
  const parts = [];

  if (eok > 0) {
    parts.push(`${eok.toLocaleString("ko-KR")}억`);
  }

  if (man > 0) {
    parts.push(`${man.toLocaleString("ko-KR")}만`);
  }

  return parts.join(" ") || "0";
}

function getPrimaryPrice(building: PlaceholderBuilding) {
  if (building.dealType === "월세") {
    return `${building.depositLabel} / ${building.rentLabel}`;
  }

  return `${building.dealType} ${formatKoreanMoney(building.currentPrice)}`;
}

function getCoveragePercent(reference: number, current: number) {
  return Math.min(100, Math.max(6, Math.round((reference / current) * 100)));
}


function getSearchParamValue(
  params: Record<string, string | string[] | undefined> | undefined,
  key: keyof ListingFilterValues,
) {
  const value = params?.[key];

  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function buildFilterValues(
  params: Record<string, string | string[] | undefined> | undefined,
): ListingFilterValues {
  return {
    buildingType: getSearchParamValue(params, "buildingType"),
    dealType: getSearchParamValue(params, "dealType"),
    elevator: getSearchParamValue(params, "elevator"),
    maxArea: getSearchParamValue(params, "maxArea"),
    maxPrice: getSearchParamValue(params, "maxPrice"),
    minArea: getSearchParamValue(params, "minArea"),
    minPrice: getSearchParamValue(params, "minPrice"),
    moveInTimeline: getSearchParamValue(params, "moveInTimeline"),
    region: getSearchParamValue(params, "region"),
  };
}

function filterBuildings(filters: ListingFilterValues) {
  const minArea = Number(filters.minArea);
  const maxArea = Number(filters.maxArea);
  const minPrice = Number(filters.minPrice);
  const maxPrice = Number(filters.maxPrice);

  return PLACEHOLDER_BUILDINGS.filter((building) => {
    if (filters.dealType && building.dealType !== filters.dealType) {
      return false;
    }

    if (filters.region && building.region !== filters.region) {
      return false;
    }

    if (filters.buildingType && building.buildingType !== filters.buildingType) {
      return false;
    }

    if (
      filters.moveInTimeline &&
      building.moveInTimeline !== filters.moveInTimeline
    ) {
      return false;
    }

    if (filters.elevator === "true" && !building.elevatorRequired) {
      return false;
    }

    if (!Number.isNaN(minArea) && filters.minArea && building.areaPyeong < minArea) {
      return false;
    }

    if (!Number.isNaN(maxArea) && filters.maxArea && building.areaPyeong > maxArea) {
      return false;
    }

    if (!Number.isNaN(minPrice) && filters.minPrice && building.currentPrice < minPrice) {
      return false;
    }

    if (!Number.isNaN(maxPrice) && filters.maxPrice && building.currentPrice > maxPrice) {
      return false;
    }

    return true;
  });
}

function PrepProgressHeader() {
  return (
    <section className="border-b border-slate-200/80 bg-white/95 px-4 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1560px] py-5">
        <div className="min-w-0">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-4xl">
            매물 보기
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            임시 저장된 매물 데이터를 한눈에 비교하고 관심 매물을 추려보세요.
          </p>
        </div>
      </div>
    </section>
  );
}

function FilterSidebar({ filters }: { filters: ListingFilterValues }) {
  return (
    <aside className="self-start rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.07)] lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
      <ResponsiveDetails className="listing-filter-details group/filter-details">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 lg:hidden [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-lg font-extrabold text-slate-950">
            <SlidersHorizontal className="h-5 w-5 text-blue-600" aria-hidden="true" />
            매물 필터
          </span>
          <ChevronDown
            className="h-4 w-4 text-slate-400 transition group-open/filter-details:rotate-180"
            aria-hidden="true"
          />
        </summary>

      <form action="/listings" className="filter-form space-y-4 p-4 pt-0 lg:pt-4">
        <div className="hidden items-center justify-between gap-3 lg:flex">
          <h2 className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-xl font-extrabold text-slate-950">
            <SlidersHorizontal className="h-5 w-5 text-blue-600" aria-hidden="true" />
            매물 필터
          </h2>
          <Link
            href="/listings"
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-slate-700"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            초기화
          </Link>
        </div>

        <fieldset>
          <legend className="text-sm font-extrabold text-slate-950">
            희망 거래 종류 *
          </legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {dealTypeOptions.map((dealType) => {
              const DealIcon =
                dealType === "매매"
                  ? Building2
                  : dealType === "전세"
                    ? House
                    : WalletCards;
              const dealId =
                dealType === "매매"
                  ? "deal-type-sale"
                  : dealType === "전세"
                    ? "deal-type-jeonse"
                    : "deal-type-monthly";

              return (
                <label
                  key={dealType}
                  className="flex h-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white text-xs font-extrabold text-slate-600 transition hover:border-blue-200 hover:bg-slate-50 has-[input:checked]:border-blue-500 has-[input:checked]:bg-blue-50 has-[input:checked]:text-blue-700 has-[input:checked]:shadow-sm"
                >
                  <input
                    id={dealId}
                    type="radio"
                    name="dealType"
                    value={dealType}
                    defaultChecked={filters.dealType === dealType}
                    className="sr-only"
                  />
                  <DealIcon className="h-5 w-5" aria-hidden="true" />
                  {dealType}
                </label>
              );
            })}
          </div>
          <p className="deal-type-helper mt-3 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium leading-5 text-slate-400">
            거래 종류를 선택하면 해당 매물만 표시됩니다.
          </p>
        </fieldset>

        <div className="deal-budget-range">
          <h3 className="text-sm font-extrabold text-slate-950">
            <span className="deal-budget-title-sale">매매</span>
            <span className="deal-budget-title-jeonse">전세</span>
            <span className="deal-budget-title-monthly">월세</span>
            {" "}희망 금액 (억원)
          </h3>
          <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <input
              name="minPrice"
              defaultValue={filters.minPrice}
              inputMode="decimal"
              placeholder="최소 금액"
              className="h-10 min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
            <span className="font-bold text-slate-400">~</span>
            <input
              name="maxPrice"
              defaultValue={filters.maxPrice}
              inputMode="decimal"
              placeholder="최대 금액"
              className="h-10 min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        <label className="block">
          <span className="text-sm font-extrabold text-slate-950">
            희망 지역 *
          </span>
          <span className="relative mt-2 block">
            <select
              name="region"
              defaultValue={filters.region}
              className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-xs font-bold text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">지역 선택</option>
              {PLACEHOLDER_BUILDING_REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
          </span>
        </label>

        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-sm font-extrabold text-slate-950">
              <Ruler className="h-4 w-4 text-slate-500" aria-hidden="true" />
              희망 전용면적 *
            </span>
            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-extrabold text-blue-600">
              평
            </span>
          </div>
          <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <input
              name="minArea"
              defaultValue={filters.minArea}
              inputMode="numeric"
              placeholder="최소 면적"
              className="h-10 min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
            <span className="font-bold text-slate-400">~</span>
            <input
              name="maxArea"
              defaultValue={filters.maxArea}
              inputMode="numeric"
              placeholder="최대 면적"
              className="h-10 min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        <label className="block">
          <span className="text-sm font-extrabold text-slate-950">
            건물 유형 *
          </span>
          <span className="relative mt-2 block">
            <select
              name="buildingType"
              defaultValue={filters.buildingType}
              className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-xs font-bold text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">유형 선택</option>
              {buildingTypeOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
          </span>
        </label>

        <label className="block">
          <span className="flex items-center gap-1.5 text-sm font-extrabold text-slate-950">
            <CalendarDays className="h-4 w-4 text-slate-500" aria-hidden="true" />
            입주 희망 시기 *
          </span>
          <span className="relative mt-2 block">
            <select
              name="moveInTimeline"
              defaultValue={filters.moveInTimeline}
              className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-xs font-bold text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">시기 선택</option>
              {moveInTimelineOptions.map((value) => (
                <option key={value} value={value}>
                  {getMoveInTimelineLabel(value)}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
          </span>
        </label>

        <label className="flex items-center justify-between gap-4 text-sm font-extrabold text-slate-950">
          엘리베이터 유무
          <input
            type="checkbox"
            name="elevator"
            value="true"
            defaultChecked={filters.elevator === "true"}
            className="h-4 w-4 rounded border-slate-300 accent-blue-600"
          />
        </label>

        <button
          type="submit"
          className="h-10 w-full rounded-lg text-sm font-extrabold text-white transition hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #0083FF, #4C2CE2)" }}
        >
          필터 적용
        </button>
      </form>
      </ResponsiveDetails>
    </aside>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-md bg-slate-50 px-3 py-2.5 ring-1 ring-slate-100">
      <p className="text-[11px] font-semibold text-slate-500">{label}</p>
      <p className="mt-1 break-keep text-xs font-semibold leading-5 text-slate-950 sm:text-sm">
        {value}
      </p>
    </div>
  );
}

function ProgressMetric({
  label,
  percent,
  value,
}: {
  label: string;
  percent: number;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
        <span className="truncate font-medium text-slate-500">{label}</span>
        <span className="shrink-0 font-bold text-slate-950">{value}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-[var(--color-accent)]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function ListingStat({
  label,
  value,
  icon: Icon,
  isLast = false,
}: {
  icon: typeof Building2;
  isLast?: boolean;
  label: string;
  value: string;
}) {
  return (
    <div
      className={[
        "min-w-0 py-3 sm:px-5 2xl:py-0",
        isLast ? "" : "border-b border-slate-200 sm:border-b-0 sm:border-r",
      ].join(" ")}
    >
      <div className="flex items-center gap-1.5 text-sm font-bold leading-tight text-slate-950 sm:text-base">
        <Icon className="h-3.5 w-3.5 shrink-0 text-slate-500" aria-hidden="true" />
        <span className="min-w-0 break-keep">{value}</span>
        <Info className="h-3 w-3 shrink-0 text-slate-400" aria-hidden="true" />
      </div>
      <p className="mt-1 break-keep text-xs font-medium leading-4 text-slate-500">
        {label}
      </p>
    </div>
  );
}

function ListingCard({
  building,
}: {
  building: PlaceholderBuilding;
}) {
  const marketCoverage = getCoveragePercent(
    building.marketPrice,
    building.currentPrice,
  );
  const officialCoverage = getCoveragePercent(
    building.officialPrice,
    building.currentPrice,
  );
  const dealTone = dealTypeTone[building.dealType];
  const moveInLabel = getMoveInTimelineLabel(building.moveInTimeline);
  const stats = [
    {
      icon: Building2,
      label: "거래 유형",
      value: building.dealType,
    },
    {
      icon: Layers3,
      label: "전용 면적",
      value: building.areaLabel.replace("전용 ", ""),
    },
    {
      icon: Layers3,
      label: "엘리베이터",
      value: building.elevatorRequired ? "필수 충족" : "확인 필요",
    },
  ];
  const modalControlId = `listing-detail-${building.id}`;
  const favoriteControlId = `favorite-${building.id}`;

  return (
    <div>
      <input
        id={modalControlId}
        type="checkbox"
        className="peer sr-only"
        aria-hidden="true"
      />
      <article className="relative overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.055)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_56px_rgba(15,23,42,0.09)]">
        <label
          htmlFor={modalControlId}
          aria-label={`${building.title} 상세 보기`}
          className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-accent)]/45"
        />
        <div className="grid lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="relative h-[210px] overflow-hidden bg-slate-100 sm:h-[250px] lg:h-full lg:min-h-[270px]">
          <Image
            src={building.image}
            alt={`${building.title} 이미지`}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 320px, (min-width: 1024px) 280px, 100vw"
          />
          <input
            id={favoriteControlId}
            type="checkbox"
            className="favorite-toggle sr-only"
            aria-label={`${building.title} 관심 매물 저장`}
          />
          <label
            htmlFor={favoriteControlId}
            title="관심 매물 저장"
            aria-label={`${building.title} 관심 매물 저장`}
            className="favorite-label absolute right-3 top-3 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-950/40 text-white shadow-lg ring-1 ring-white/60 backdrop-blur-sm transition hover:bg-slate-950/55"
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
          </label>
        </div>

        <div className="min-w-0 p-4 sm:p-5 lg:p-5">
          <div className="flex min-w-0 flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="break-keep font-[family-name:var(--font-heading)] text-xl font-bold tracking-[-0.025em] text-slate-950 sm:text-2xl">
                  {building.title}
                </h2>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-bold ring-1 ${dealTone.badgeClass}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${dealTone.dotClass}`} />
                  {building.dealType}
                </span>
                <span
                  className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-bold ${
                    statusBadgeClass[building.status] ?? "bg-slate-700 text-white"
                  }`}
                >
                  {building.status}
                </span>
                {building.verified && (
                  <span
                    className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold text-white"
                    style={{
                      background: "linear-gradient(135deg, #0083FF, #4C2CE2)",
                    }}
                    aria-label="서류 인증 완료 매물"
                  >
                    <Check className="h-3 w-3" aria-hidden="true" />
                    서류 인증 완료
                  </span>
                )}
              </div>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-500 sm:text-base">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="min-w-0 break-keep">{building.location}</span>
              </p>
            </div>

            {building.dealType !== "월세" ? (
              <p className="max-w-full break-keep text-xl font-extrabold tracking-[-0.025em] text-slate-950 sm:text-2xl xl:text-right">
                {getPrimaryPrice(building)}
              </p>
            ) : null}
          </div>

          <p
            className="mt-4 text-xl tracking-[-0.02em] sm:text-2xl"
            style={{
              fontFamily: "AppleSDGothicNeoB00, sans-serif",
              background: "linear-gradient(135deg, #0083FF, #4C2CE2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {building.depositLabel} / {building.rentLabel}
          </p>

          <dl className="mt-5 grid gap-0 border-t border-slate-200 pt-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
            {stats.map((stat, index) => (
              <ListingStat
                key={stat.label}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                isLast={index === stats.length - 1}
              />
            ))}
          </dl>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {building.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
        </div>
      </article>
      <ListingDetailModal building={building} controlId={modalControlId} />
    </div>
  );
}


function ListingDetailModal({
  building,
  controlId,
}: {
  building: PlaceholderBuilding;
  controlId: string;
}) {
  const titleId = `${controlId}-title`;

  return (
    <div
      className="fixed inset-0 z-[80] hidden items-center justify-center bg-slate-950/55 px-3 py-6 backdrop-blur-sm peer-checked:flex sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <label
        htmlFor={controlId}
        className="absolute inset-0 cursor-pointer"
        aria-label="상세 팝업 닫기"
      />
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-[18px] bg-white shadow-[0_30px_100px_rgba(15,23,42,0.35)]">
        <label
          htmlFor={controlId}
          aria-label="상세 팝업 닫기"
          role="button"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/92 text-slate-700 shadow-lg ring-1 ring-slate-200 transition hover:bg-white hover:text-slate-950"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </label>

        <div className="max-h-[90vh] overflow-y-auto">
          <div className="relative h-44 overflow-hidden bg-slate-900 sm:h-56">
            <Image
              src={building.image}
              alt={`${building.title} 상세 이미지`}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-16 text-white sm:left-6">
              <p className="text-xs font-bold text-white/80">
                {building.dealType} · {building.status}
              </p>
              <h2
                id={titleId}
                className="mt-1.5 break-keep font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl"
              >
                {building.title}
              </h2>
            </div>
          </div>

          <div className="space-y-7 px-4 py-5 sm:px-6 sm:py-7">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 sm:text-sm">
                <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                {building.areaLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 sm:text-sm">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {building.region}
              </span>
            </div>

            <section className="rounded-2xl border border-blue-100 bg-slate-50/60 p-4 sm:p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-400">보증금</p>
                  <p
                    className="mt-1 text-xl tracking-tight sm:text-2xl"
                    style={{
                      fontFamily: "AppleSDGothicNeoR00, sans-serif",
                      background: "linear-gradient(135deg, #0083FF, #4C2CE2)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {building.depositLabel}
                  </p>
                </div>
                <div className="h-px w-full bg-slate-200 sm:h-10 sm:w-px" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-400">월세</p>
                  <p
                    className="mt-1 text-xl tracking-tight sm:text-2xl"
                    style={{
                      fontFamily: "AppleSDGothicNeoR00, sans-serif",
                      background: "linear-gradient(135deg, #0083FF, #4C2CE2)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {building.rentLabel}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-extrabold text-slate-950 sm:text-2xl">
                매물 상세
              </h3>
              <p className="mt-3 break-keep text-sm font-normal leading-6 text-slate-500 sm:text-base sm:leading-7">
                {building.detail}
              </p>
            </section>

            <section>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-extrabold text-slate-950 sm:text-2xl">
                주요 특징
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {building.features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 sm:text-sm"
                  >
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    {feature}
                  </span>
                ))}
              </div>
            </section>

            {building.verified && (
              <section
                className="rounded-2xl p-4 sm:p-5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,131,255,0.05), rgba(76,44,226,0.05))",
                }}
              >
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-extrabold text-slate-950 sm:text-2xl">
                  서류 인증
                </h3>
                <p className="mt-1.5 text-sm font-medium text-slate-400">
                  아래 서류가 모두 홈쇼퍼를 통해 검증되었습니다
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      { name: "등기부등본", icon: FileSearch },
                      { name: "건축물대장", icon: Building2 },
                      { name: "국세 납부 증명서", icon: Landmark },
                      { name: "지방세 납부 증명서", icon: Receipt },
                      { name: "전입세대 확인서", icon: Users },
                      { name: "신분증 인증", icon: CreditCard },
                    ] as const
                  ).map(({ name, icon: DocIcon }) => (
                    <div
                      key={name}
                      className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3"
                      style={{
                        background: "rgba(255,255,255,0.65)",
                        backdropFilter: "blur(16px) saturate(1.8)",
                        WebkitBackdropFilter: "blur(16px) saturate(1.8)",
                        border: "1px solid rgba(255,255,255,0.75)",
                        boxShadow:
                          "0 2px 12px rgba(0,131,255,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
                      }}
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <DocIcon
                          className="h-4 w-4 shrink-0 text-slate-500"
                          aria-hidden="true"
                        />
                        <span
                          className="truncate text-sm font-medium text-slate-700"
                          style={{ fontFamily: "AppleSDGothicNeoR00, sans-serif" }}
                        >
                          {name}
                        </span>
                      </div>
                      <div
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                        style={{
                          background: "linear-gradient(135deg, #0083FF, #4C2CE2)",
                        }}
                        aria-label="인증 완료"
                      >
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-2xl bg-slate-50 p-4 sm:p-5">
              <h3 className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-xl font-extrabold text-slate-950">
                <MessageCircle className="h-5 w-5 text-slate-500" aria-hidden="true" />
                {building.dealType === "매매"
                  ? "매수 희망 가격 입력"
                  : "거래 희망 조건 입력"}
              </h3>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-400 sm:text-base">
                해당 매물을 어느 정도 가격 범위에서 거래하고 싶으신가요?
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-bold text-slate-600 sm:text-sm">
                    최소 금액 (억원)
                  </span>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="예: 30"
                    className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-bold text-slate-600 sm:text-sm">
                    최대 금액 (억원)
                  </span>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder={`예: ${building.currentPrice}`}
                    className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              </div>

              <button
                type="button"
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg px-5 text-base font-extrabold text-white transition hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #0083FF, #4C2CE2)" }}
              >
                해당 조건으로 제안하기
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ListingsPage({
  searchParams,
}: {
  searchParams?: ListingsSearchParams;
}) {
  const filters = buildFilterValues(await searchParams);
  const filteredBuildings = filterBuildings(filters);

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-14 text-slate-950">
      <PrepProgressHeader />

      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1560px] gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
          <FilterSidebar filters={filters} />

          <div className="min-w-0 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-bold text-slate-500">
                총{" "}
                <span className="text-blue-600">
                  {filteredBuildings.length}
                </span>
                개 매물
              </p>
              {filteredBuildings.length !== PLACEHOLDER_BUILDINGS.length ? (
                <Link
                  href="/listings"
                  className="text-sm font-bold text-slate-400 transition hover:text-slate-700"
                >
                  전체 보기
                </Link>
              ) : null}
            </div>

            {filteredBuildings.length > 0 ? (
              <div className="space-y-7">
                {filteredBuildings.map((building) => (
                  <ListingCard key={building.id} building={building} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
                <p className="font-[family-name:var(--font-heading)] text-2xl font-extrabold text-slate-950">
                  조건에 맞는 매물이 없습니다.
                </p>
                <p className="mt-3 text-sm font-medium text-slate-500">
                  필터를 초기화하거나 조건을 넓혀 다시 확인해 주세요.
                </p>
                <Link
                  href="/listings"
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-extrabold text-white transition hover:bg-blue-700"
                >
                  필터 초기화
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
