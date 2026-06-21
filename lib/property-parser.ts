export type ParsedProperty = {
  address: string;
  agentName: string;
  agentPhone: string;
  dealType: "매매" | "전세" | "월세";
  price: string;
  region: string;
  sourceName: string;
  sourceUrl: string;
};

export type PropertyParseResult =
  | { property: ParsedProperty; success: true }
  | { error: string; success: false };

const SOURCES: Record<string, string> = {
  "dabang.com": "다방",
  "land.naver.com": "네이버 부동산",
  "naver.com": "네이버 부동산",
  "zigbang.com": "직방",
};

function detectSource(url: string): string | null {
  for (const [domain, name] of Object.entries(SOURCES)) {
    if (url.includes(domain)) return name;
  }
  return null;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const ADDRESSES = [
  { address: "서울시 관악구 봉천동 123-45 2층", region: "서울 관악구" },
  { address: "서울시 마포구 합정동 456-78 301호", region: "서울 마포구" },
  { address: "서울시 성북구 길음동 789-12 1층", region: "서울 성북구" },
  { address: "경기도 수원시 영통구 광교중앙로 88, 403호", region: "경기 수원시" },
  { address: "서울시 동작구 사당동 567-89 B01호", region: "서울 동작구" },
  { address: "서울시 은평구 불광동 234-56 4층", region: "서울 은평구" },
  { address: "부산시 해운대구 우동 1234-5 101호", region: "부산 해운대구" },
];

const AGENTS = [
  { agentName: "행복공인중개사사무소", agentPhone: "02-1234-5678" },
  { agentName: "명품부동산중개", agentPhone: "02-9876-5432" },
  { agentName: "믿음공인중개사사무소", agentPhone: "031-234-5678" },
  { agentName: "청솔부동산", agentPhone: "02-3456-7890" },
  { agentName: "한강공인중개사사무소", agentPhone: "02-5678-9012" },
];

const DEALS: { dealType: "매매" | "전세" | "월세"; price: string }[] = [
  { dealType: "월세", price: "보증금 1,000만원 / 월 55만원" },
  { dealType: "전세", price: "2억 5,000만원" },
  { dealType: "월세", price: "보증금 3,000만원 / 월 70만원" },
  { dealType: "매매", price: "3억 2,000만원" },
  { dealType: "월세", price: "보증금 500만원 / 월 45만원" },
  { dealType: "전세", price: "1억 8,000만원" },
];

export async function parsePropertyUrl(url: string): Promise<PropertyParseResult> {
  try {
    new URL(url);
  } catch {
    return { error: "유효한 URL 형식이 아닙니다.", success: false };
  }

  const sourceName = detectSource(url);
  if (!sourceName) {
    return {
      error: "직방, 다방, 네이버 부동산 링크만 지원합니다.",
      success: false,
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 1400));

  const hash = hashCode(url);
  const loc = ADDRESSES[hash % ADDRESSES.length];
  const agent = AGENTS[(hash >> 3) % AGENTS.length];
  const deal = DEALS[(hash >> 5) % DEALS.length];

  return {
    property: {
      ...loc,
      ...agent,
      ...deal,
      sourceName,
      sourceUrl: url,
    },
    success: true,
  };
}
