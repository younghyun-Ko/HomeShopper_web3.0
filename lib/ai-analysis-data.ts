export type AnalysisStatus = "safe" | "caution" | "danger";

export type AnalysisIconKey =
  | "banknote"
  | "building"
  | "file-signature"
  | "hospital"
  | "landmark"
  | "map-pin"
  | "scale"
  | "shield"
  | "stethoscope";

export interface AnalysisItem {
  label: string;
  value: string;
  status: AnalysisStatus;
  detail: string;
  icon: AnalysisIconKey;
}

export interface AiAnalysisProperty {
  id: string;
  name: string;
  icon: AnalysisIconKey;
  address: string;
  score: number;
  marketFitScore: number;
  legalSafetyScore: number;
  verdict: string;
  verdictStatus: AnalysisStatus;
  summary: string;
  recommendation: string;
  items: AnalysisItem[];
}

export const aiAnalysisSampleProperties: AiAnalysisProperty[] = [
  {
    id: "a",
    name: "A 빌라",
    icon: "building",
    address: "서울시 마포구 대흥동 12-5",
    score: 98,
    marketFitScore: 95,
    legalSafetyScore: 98,
    verdict: "계약 진행 권장",
    verdictStatus: "safe",
    summary: "권리관계와 임대차 리스크가 낮고 보증금/월세 조건도 적정 범위로 확인되었습니다.",
    recommendation: "현재 조건 기준으로 계약 검토를 진행해도 좋은 매물입니다.",
    items: [
      { label: "근저당권", value: "설정 없음", status: "safe", detail: "등기부상 선순위 담보권이 확인되지 않습니다.", icon: "shield" },
      { label: "가압류/가처분", value: "해당 없음", status: "safe", detail: "권리 제한 사항이 없어 소유권 이전 리스크가 낮습니다.", icon: "scale" },
      { label: "위반건축물", value: "해당 없음", status: "safe", detail: "건축물대장 기준 위반 항목이 확인되지 않습니다.", icon: "building" },
      { label: "호가 적정성", value: "적정 범위", status: "safe", detail: "주변 대학가 실거래가와 임대 시세 대비 무리 없는 수준입니다.", icon: "banknote" },
    ],
  },
  {
    id: "b",
    name: "B 투룸",
    icon: "building",
    address: "서울시 서대문구 창천동 104-3",
    score: 82,
    marketFitScore: 88,
    legalSafetyScore: 79,
    verdict: "조건부 진행",
    verdictStatus: "caution",
    summary: "주요 권리 제한은 낮지만 선순위 근저당 말소 조건 확인이 필요합니다.",
    recommendation: "계약 전 근저당 말소 특약과 잔금일 처리 조건을 중개사와 재확인하세요.",
    items: [
      { label: "근저당권", value: "1건 확인", status: "caution", detail: "국민은행 3,000만 원 설정 건이 있어 계약 시 말소 또는 후순위 특약 확인이 필요합니다.", icon: "shield" },
      { label: "가압류/가처분", value: "해당 없음", status: "safe", detail: "권리 제한 사항은 별도로 확인되지 않습니다.", icon: "scale" },
      { label: "기존 임차인", value: "퇴거 예정", status: "caution", detail: "인도 가능 시점과 기존 임대차 계약의 해지 확인이 필요합니다.", icon: "file-signature" },
      { label: "호가 적정성", value: "소폭 상회", status: "caution", detail: "비교 매물 대비 보증금/월세 조건이 약간 높아 협상 여지가 있습니다.", icon: "banknote" },
    ],
  },
  {
    id: "c",
    name: "C 오피스텔",
    icon: "building",
    address: "서울시 관악구 봉천동 1602-5",
    score: 95,
    marketFitScore: 94,
    legalSafetyScore: 96,
    verdict: "입주 적합",
    verdictStatus: "safe",
    summary: "주거 시설 기준과 환기 조건이 양호하며 권리관계도 매우 안정적입니다.",
    recommendation: "원룸의 환기 상태 및 관리비 세부 포함 항목(인터넷, 수도 등)을 계약 시 추가 검토하면 좋습니다.",
    items: [
      { label: "근저당권", value: "설정 없음", status: "safe", detail: "선순위 담보권 없이 안정적인 권리 상태입니다.", icon: "shield" },
      { label: "주거시설 기준", value: "적합", status: "safe", detail: "생활 가전 풀옵션 및 소방 기준을 안전하게 충족합니다.", icon: "building" },
      { label: "환기 및 채광", value: "양호", status: "safe", detail: "남향 배치로 채광과 환기가 적합하게 확보되었습니다.", icon: "map-pin" },
      { label: "호가 적정성", value: "적정 범위", status: "safe", detail: "주변 대학가 오피스텔 평균 임대 시세 대비 합리적입니다.", icon: "banknote" },
    ],
  },
];
