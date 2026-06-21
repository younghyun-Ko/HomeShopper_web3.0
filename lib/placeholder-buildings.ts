import type { BuildingType, DealType, MoveInTimeline } from "@/lib/offer-types";

export type ListingStatus = "상담가능" | "매칭중";

export type PlaceholderThumbnailVariant = "map" | "building";

export interface PlaceholderBuilding {
  id: string;
  image: string;
  title: string;
  location: string;
  region: string;
  specialty: string;
  status: ListingStatus;
  dealType: DealType;
  buildingType: BuildingType;
  moveInTimeline: MoveInTimeline;
  elevatorRequired: boolean;
  thumbnailVariant: PlaceholderThumbnailVariant;
  currentPrice: number;
  officialPrice: number;
  marketPrice: number;
  areaPyeong: number;
  depositAmount: number;
  monthlyRentAmount: number;
  areaLabel: string;
  depositLabel: string;
  rentLabel: string;
  detail: string;
  features: string[];
  verified?: boolean;
}

export interface HomePageBuildingPreview {
  id: string;
  location: string;
  title: string;
  recommend: string;
  area: string;
  deposit: string;
  rent: string;
  status: ListingStatus;
  detail: string;
  thumbnailUrl: string;
  thumbnailVariant: PlaceholderThumbnailVariant;
  region: string;
  currentPrice: number;
  officialPrice: number;
  marketPrice: number;
  areaPyeong: number;
  depositAmount: number;
  features: string[];
  moveInLabel: string;
}

export const MOVE_IN_TIMELINE_LABELS: Record<MoveInTimeline, string> = {
  immediate: "즉시 입주",
  within_1_month: "1개월 이내",
  within_3_months: "3개월 이내",
  within_6_months: "6개월 이내",
  flexible: "시기 협의 가능",
};

export function getMoveInTimelineLabel(value: MoveInTimeline) {
  return MOVE_IN_TIMELINE_LABELS[value];
}

export const PLACEHOLDER_BUILDINGS: PlaceholderBuilding[] = [
  {
    id: "hs-101",
    image: "/room_pictures/KakaoTalk_Photo_2026-05-27-22-36-31 001.png",
    title: "서울대입구역 인근 소형 아파트",
    location: "서울시 관악구 봉천동",
    region: "서울시 관악구",
    specialty: "대학생 / 사회초년생 추천",
    status: "상담가능",
    dealType: "월세",
    buildingType: "medical_building",
    moveInTimeline: "within_3_months",
    elevatorRequired: true,
    thumbnailVariant: "building",
    currentPrice: 0.2,
    officialPrice: 0.16,
    marketPrice: 0.19,
    areaPyeong: 12,
    depositAmount: 0.2,
    monthlyRentAmount: 90,
    areaLabel: "전용 12평",
    depositLabel: "보증금 2,000만",
    rentLabel: "월 90만",
    detail:
      "서울대입구역 도보 5분 거리에 위치한 살기 좋은 소형 아파트입니다. 방 2개와 거실 구조로 공간이 넉넉하며, 24시간 보안 시스템과 경비실이 있어 매우 안전합니다. 대학생 룸메이트와 함께 거주하거나 짐이 많은 사회초년생분들께 강력 추천합니다.",
    features: ["역세권", "보안 CCTV", "경비실 상주", "방 2개 구조"],
    verified: true,
  },
  {
    id: "hs-102",
    image: "/room_pictures/KakaoTalk_Photo_2026-05-27-22-36-32 002.png",
    title: "신촌 연세대 인근 리모델링 첫 입주 원룸",
    location: "서울시 서대문구 창천동",
    region: "서울시 서대문구",
    specialty: "대학생 추천",
    status: "상담가능",
    dealType: "월세",
    buildingType: "new_building",
    moveInTimeline: "immediate",
    elevatorRequired: true,
    thumbnailVariant: "building",
    currentPrice: 0.1,
    officialPrice: 0.08,
    marketPrice: 0.095,
    areaPyeong: 6,
    depositAmount: 0.1,
    monthlyRentAmount: 65,
    areaLabel: "전용 6평",
    depositLabel: "보증금 1,000만",
    rentLabel: "월 65만",
    detail:
      "연세대학교 정문 도보 5분 거리에 위치한 풀옵션 원룸입니다. 최근 리모델링을 마쳐 첫 입주하는 깨끗한 상태이며, 인터넷과 수도요금이 관리비에 포함되어 실속 있습니다. 에어컨, 냉장고, 세탁기 등 생활 가전이 완비되어 있습니다.",
    features: ["신축급", "대학가 인접", "풀옵션", "즉시입주 가능"],
    verified: true,
  },
  {
    id: "hs-103",
    image: "/room_pictures/KakaoTalk_Photo_2026-05-27-22-36-32 003.png",
    title: "혜화역 대학로 인근 채광 좋은 투룸 빌라",
    location: "서울시 종로구 명륜3가",
    region: "서울시 종로구",
    specialty: "대학생 / 사회초년생 추천",
    status: "상담가능",
    dealType: "월세",
    buildingType: "commercial",
    moveInTimeline: "within_1_month",
    elevatorRequired: false,
    thumbnailVariant: "map",
    currentPrice: 0.15,
    officialPrice: 0.12,
    marketPrice: 0.14,
    areaPyeong: 10,
    depositAmount: 0.15,
    monthlyRentAmount: 85,
    areaLabel: "전용 10평",
    depositLabel: "보증금 1,500만",
    rentLabel: "월 85만",
    detail:
      "성균관대학교 및 혜화역 인근에 위치한 넓고 환한 투룸입니다. 남향으로 채광이 매우 좋으며 방 2개 구조로 독립된 생활 공간을 보장합니다. 대학로의 문화 편의시설을 도보로 즐길 수 있으며 매우 조용한 주택가에 있습니다.",
    features: ["남향 채광", "대학로 인프라", "조용한 주택가", "공간 넉넉"],
  },
  {
    id: "hs-104",
    image: "/room_pictures/KakaoTalk_Photo_2026-05-27-22-36-32 004.png",
    title: "마포 대흥동 서강대 앞 깔끔한 빌라 원룸",
    location: "서울시 마포구 대흥동",
    region: "서울시 마포구",
    specialty: "대학생 추천",
    status: "매칭중",
    dealType: "월세",
    buildingType: "mixed_use",
    moveInTimeline: "within_1_month",
    elevatorRequired: false,
    thumbnailVariant: "building",
    currentPrice: 0.05,
    officialPrice: 0.04,
    marketPrice: 0.048,
    areaPyeong: 5.5,
    depositAmount: 0.05,
    monthlyRentAmount: 50,
    areaLabel: "전용 5.5평",
    depositLabel: "보증금 500만",
    rentLabel: "월 50만",
    detail:
      "서강대학교 후문 바로 앞에 위치하여 등하교가 매우 편리한 가성비 높은 빌라 원룸입니다. 보증금 500만원에 월세 50만원으로 고정비용을 아낄 수 있어 인기가 많습니다. 가구와 가전이 풀옵션으로 제공됩니다.",
    features: ["대학 정문 앞", "초가성비", "가구 풀옵션", "즉시입주 가능"],
  },
  {
    id: "hs-105",
    image: "/room_pictures/KakaoTalk_Photo_2026-05-27-22-36-32 005.png",
    title: "성북구 안암동 고려대 인근 복층 오피스텔",
    location: "서울시 성북구 안암동5가",
    region: "서울시 성북구",
    specialty: "대학생 / 사회초년생 추천",
    status: "상담가능",
    dealType: "월세",
    buildingType: "office",
    moveInTimeline: "within_6_months",
    elevatorRequired: true,
    thumbnailVariant: "building",
    currentPrice: 0.1,
    officialPrice: 0.08,
    marketPrice: 0.09,
    areaPyeong: 7,
    depositAmount: 0.1,
    monthlyRentAmount: 78,
    areaLabel: "전용 7평",
    depositLabel: "보증금 1,000만",
    rentLabel: "월 78만",
    detail:
      "고려대역 도보 4분 거리에 위치한 신축급 복층 오피스텔입니다. 수납공간이 매우 많으며 복층 구조로 침실과 주거 공간을 완전히 분리할 수 있습니다. 대로변에 위치해 귀가 동선이 안전합니다.",
    features: ["복층 구조", "수납장 넉넉", "대로변 위치", "경비실 운영"],
    verified: true,
  },
  {
    id: "hs-106",
    image: "/room_pictures/KakaoTalk_Photo_2026-05-27-22-36-32 006.png",
    title: "홍대입구역 인근 트렌디한 투룸 오피스텔",
    location: "서울시 마포구 동교동",
    region: "서울시 마포구",
    specialty: "사회초년생 추천",
    status: "상담가능",
    dealType: "월세",
    buildingType: "office",
    moveInTimeline: "within_3_months",
    elevatorRequired: true,
    thumbnailVariant: "building",
    currentPrice: 0.2,
    officialPrice: 0.16,
    marketPrice: 0.185,
    areaPyeong: 8,
    depositAmount: 0.2,
    monthlyRentAmount: 80,
    areaLabel: "전용 8평",
    depositLabel: "보증금 2,000만",
    rentLabel: "월 80만",
    detail:
      "홍대입구역 도보 5분 거리에 위치한 청년 오피스텔입니다. 세련된 화이트톤 인테리어와 넓은 내부 구조로 공간 활용도가 높습니다. 보안 경비 시스템이 철저하며 지하철 2호선, 공항철도, 경의중앙선 멀티 역세권으로 출퇴근이 매우 용이합니다.",
    features: ["멀티 역세권", "화이트톤 인테리어", "경비원 상주", "넓은 공간"],
    verified: true,
  },
  {
    id: "hs-107",
    image: "/room_pictures/KakaoTalk_Photo_2026-05-27-22-36-32 007.png",
    title: "동대문구 회기동 경희대 인근 신축 투룸 빌라",
    location: "서울시 동대문구 회기동",
    region: "서울시 동대문구",
    specialty: "대학생 추천",
    status: "상담가능",
    dealType: "월세",
    buildingType: "commercial",
    moveInTimeline: "flexible",
    elevatorRequired: false,
    thumbnailVariant: "map",
    currentPrice: 0.1,
    officialPrice: 0.08,
    marketPrice: 0.095,
    areaPyeong: 9,
    depositAmount: 0.1,
    monthlyRentAmount: 70,
    areaLabel: "전용 9평",
    depositLabel: "보증금 1,000만",
    rentLabel: "월 70만",
    detail:
      "회기역 도보 거리에 위치한 신축 빌라 투룸입니다. 남향 배치로 채광과 환기가 우수하며 주방공간과 방이 잘 분리되어 생활하기 매우 좋습니다. 건물 입구 번호키와 CCTV 등 방범이 잘 되어 있습니다.",
    features: ["남향 채광", "신축급 깔끔함", "조용한 주택가", "CCTV 완비"],
  },
  {
    id: "hs-108",
    image: "/room_pictures/KakaoTalk_Photo_2026-05-27-22-36-32 008.png",
    title: "건대입구역 인근 가성비 좋은 원룸",
    location: "서울시 광진구 화양동",
    region: "서울시 광진구",
    specialty: "대학생 / 사회초년생 추천",
    status: "상담가능",
    dealType: "월세",
    buildingType: "new_building",
    moveInTimeline: "within_6_months",
    elevatorRequired: false,
    thumbnailVariant: "building",
    currentPrice: 0.1,
    officialPrice: 0.075,
    marketPrice: 0.09,
    areaPyeong: 6,
    depositAmount: 0.1,
    monthlyRentAmount: 60,
    areaLabel: "전용 6평",
    depositLabel: "보증금 1,000만",
    rentLabel: "월 60만",
    detail:
      "건국대학교 정문 도보 7분 거리의 원룸입니다. 보증금 1000만 / 월세 60만 선으로 학생들에게 딱 알맞은 가격대입니다. 침대, 책상, 세탁기 등 옵션이 완비되어 가구 구매 비용이 들지 않습니다.",
    features: ["대학가 인근", "수납공간 넉넉", "생활 편의시설 인접", "풀옵션"],
  },
];

export const PLACEHOLDER_BUILDING_REGIONS = Array.from(
  new Set(PLACEHOLDER_BUILDINGS.map((building) => building.region)),
);

export const HOME_PAGE_PLACEHOLDER_BUILDING_IDS = ["hs-102", "hs-103", "hs-104"] as const;

export const HOME_PAGE_BUILDING_PREVIEWS: HomePageBuildingPreview[] = HOME_PAGE_PLACEHOLDER_BUILDING_IDS
  .map((id) => PLACEHOLDER_BUILDINGS.find((building) => building.id === id))
  .filter((building): building is PlaceholderBuilding => Boolean(building))
  .map((building) => ({
    id: building.id,
    location: building.region,
    title: building.title,
    recommend: building.specialty,
    area: building.areaLabel,
    deposit: building.depositLabel,
    rent: building.rentLabel,
    status: building.status,
    detail: building.detail,
    thumbnailUrl: building.image,
    thumbnailVariant: building.thumbnailVariant,
    region: building.region,
    currentPrice: building.currentPrice,
    officialPrice: building.officialPrice,
    marketPrice: building.marketPrice,
    areaPyeong: building.areaPyeong,
    depositAmount: building.depositAmount,
    features: building.features,
    moveInLabel: getMoveInTimelineLabel(building.moveInTimeline),
  }));
