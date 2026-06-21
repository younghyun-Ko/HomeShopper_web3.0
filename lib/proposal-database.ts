import {
  PLACEHOLDER_BUILDINGS,
  type PlaceholderBuilding,
} from "@/lib/placeholder-buildings";

export type ProposalStatus = "pending" | "accepted" | "rejected" | "countered";

export type ProposalRecord = {
  id: string;
  buildingId: string;
  proposedAt: string;
  proposedPriceMan: number;
  priceAdjustmentPercent: number | null;
  status: ProposalStatus;
};

export type ProposalWithProduct = ProposalRecord & {
  product: PlaceholderBuilding;
};

export const PROPOSAL_STATUS_LABELS: Record<ProposalStatus, string> = {
  accepted: "수락됨",
  countered: "역제안",
  pending: "대기중",
  rejected: "거절됨",
};

export const PROPOSAL_DATABASE: ProposalRecord[] = [
  {
    id: "proposal-101",
    buildingId: "hs-102",
    proposedAt: "2026-04-28",
    proposedPriceMan: 900,
    priceAdjustmentPercent: -10,
    status: "pending",
  },
  {
    id: "proposal-102",
    buildingId: "hs-103",
    proposedAt: "2026-04-30",
    proposedPriceMan: 1350,
    priceAdjustmentPercent: -10,
    status: "pending",
  },
  {
    id: "proposal-103",
    buildingId: "hs-104",
    proposedAt: "2026-04-15",
    proposedPriceMan: 466,
    priceAdjustmentPercent: -6.8,
    status: "accepted",
  },
  {
    id: "proposal-104",
    buildingId: "hs-102",
    proposedAt: "2026-04-10",
    proposedPriceMan: 760,
    priceAdjustmentPercent: -24,
    status: "rejected",
  },
  {
    id: "proposal-105",
    buildingId: "hs-107",
    proposedAt: "2026-04-22",
    proposedPriceMan: 933,
    priceAdjustmentPercent: -6.7,
    status: "countered",
  },
  {
    id: "proposal-106",
    buildingId: "hs-103",
    proposedAt: "2026-05-01",
    proposedPriceMan: 1375,
    priceAdjustmentPercent: -8.3,
    status: "pending",
  },
  {
    id: "proposal-107",
    buildingId: "hs-108",
    proposedAt: "2026-04-18",
    proposedPriceMan: 1000,
    priceAdjustmentPercent: null,
    status: "countered",
  },
];

const productById = new Map(
  PLACEHOLDER_BUILDINGS.map((building) => [building.id, building]),
);

export const GENERAL_MY_PAGE_PROPOSALS: ProposalWithProduct[] =
  PROPOSAL_DATABASE.map((proposal) => {
    const product = productById.get(proposal.buildingId);

    if (!product) {
      throw new Error(`Missing proposal product: ${proposal.buildingId}`);
    }

    return {
      ...proposal,
      product,
    };
  });

