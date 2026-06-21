"use client";

import { useEffect, useState } from "react";

type Props = {
  buyerContent: React.ReactNode;
  sellerContent: React.ReactNode;
};

export function LandingContentSwitch({ buyerContent, sellerContent }: Props) {
  const [tab, setTab] = useState<"buyer" | "seller">("buyer");

  useEffect(() => {
    const switchIfLandlordHash = () => {
      if (window.location.hash === "#for-landlords") {
        setTab("seller");
      }
    };

    switchIfLandlordHash();
    window.addEventListener("hashchange", switchIfLandlordHash);
    return () => window.removeEventListener("hashchange", switchIfLandlordHash);
  }, []);

  return (
    <div id="for-landlords">
      {/* iOS-style segmented control */}
      <div className="flex justify-center px-6 py-10 sm:py-12">
        <div
          className="inline-flex rounded-full p-1"
          style={{ background: "rgba(120,120,128,0.16)" }}
          role="group"
          aria-label="사용자 유형 선택"
        >
          <button
            type="button"
            onClick={() => setTab("buyer")}
            aria-pressed={tab === "buyer"}
            className={[
              "rounded-full px-8 py-2.5 text-sm font-semibold transition-all duration-200",
              tab === "buyer"
                ? "bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)]"
                : "text-gray-500 hover:text-gray-700",
            ].join(" ")}
          >
            매수자
          </button>
          <button
            type="button"
            onClick={() => setTab("seller")}
            aria-pressed={tab === "seller"}
            className={[
              "rounded-full px-8 py-2.5 text-sm font-semibold transition-all duration-200",
              tab === "seller"
                ? "bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)]"
                : "text-gray-500 hover:text-gray-700",
            ].join(" ")}
          >
            매도자
          </button>
        </div>
      </div>

      {tab === "buyer" ? buyerContent : sellerContent}
    </div>
  );
}
