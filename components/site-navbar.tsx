"use client";

import { LogIn, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AnimatedNavigationTabs,
  type NavigationItem,
} from "@/components/ui/animated-navigation-tabs";
import {
  AUTH_CHANGE_EVENT,
  buildLoginPath,
  getAuthSession,
  getMyPagePathByRole,
  logoutUser,
  MY_PAGE_ROOT_PATH,
  type AuthSession,
  USER_ROLE_STATUS_LABELS,
} from "@/lib/auth";

const navigationItems: NavigationItem[] = [
  { id: 1, title: "AI 분석", href: "/ai-analysis" },
  { id: 2, title: "상담 신청", href: "/consultation" },
  { id: 3, title: "매물 보기", href: "/listings" },
  { id: 4, title: "임대인 혜택", href: "/#for-landlords" },
  { id: 5, title: "중개사 제휴", href: "/agent-partnership" },
  { id: 6, title: "마이 페이지", href: MY_PAGE_ROOT_PATH },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const syncAuthSession = () => {
      setAuthSession(getAuthSession());
    };

    syncAuthSession();
    window.addEventListener(AUTH_CHANGE_EVENT, syncAuthSession);
    window.addEventListener("storage", syncAuthSession);

    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, syncAuthSession);
      window.removeEventListener("storage", syncAuthSession);
    };
  }, []);

  if (pathname === "/login") {
    return null;
  }

  const handleNavigationClick = (
    item: NavigationItem,
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    if (item.href !== MY_PAGE_ROOT_PATH) {
      return;
    }

    event.preventDefault();

    if (!authSession) {
      router.push(buildLoginPath(MY_PAGE_ROOT_PATH));
      return;
    }

    router.push(getMyPagePathByRole(authSession.user.userRole));
  };

  const handleAuthButtonClick = () => {
    if (!authSession) {
      router.push("/login");
      return;
    }

    logoutUser();
    setAuthSession(null);
    router.push("/");
    router.refresh();
  };

  const visibleNavigationItems =
    authSession?.user.userRole === "AGENT"
      ? navigationItems.filter((item) => item.href !== "/agent-partnership")
      : navigationItems;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 w-full"
      style={{
        background: "rgba(248, 251, 255, 0.6)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        boxShadow: "0 10px 40px rgba(49, 93, 255, 0.08)",
      }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2.5 sm:px-6 lg:px-8"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="HomeShopper logo"
            width={28}
            height={28}
            className="h-7 w-7 rounded-lg object-cover"
            priority
          />
          <div className="min-w-0">
            <p className="font-[family-name:var(--font-sans)] text-lg font-extrabold tracking-tight text-[var(--color-accent)]">
              HomeShopper
            </p>
          </div>
        </Link>

        <div className="ml-auto flex min-w-0 flex-wrap items-center justify-end gap-3 sm:gap-4 lg:gap-5">
          <AnimatedNavigationTabs
            items={visibleNavigationItems}
            className="hidden justify-end font-[family-name:var(--font-body)] md:flex"
            onItemClick={handleNavigationClick}
          />
          {authSession ? (
            <div
              className="inline-flex shrink-0 items-center justify-center rounded-full px-4 py-2 font-[family-name:var(--font-body)] text-xs font-semibold leading-none text-black backdrop-blur-xl"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(191, 219, 254, 0.96) 0%, rgba(147, 197, 253, 0.97) 52%, rgba(96, 165, 250, 0.98) 100%)",
              }}
            >
              {USER_ROLE_STATUS_LABELS[authSession.user.userRole]}
            </div>
          ) : null}
          <button
            type="button"
            onClick={handleAuthButtonClick}
            className={`button-gradation inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full font-[family-name:var(--font-body)] text-xs font-bold text-white shadow-md shadow-accent/8 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/30 ${
              authSession ? "px-3 py-2" : "px-4 py-2"
            }`}
          >
            {authSession ? (
              <>
                <LogOut className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                <span className="text-xs leading-none text-white">로그아웃</span>
              </>
            ) : (
              <>
                <LogIn className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                <span className="text-xs leading-none text-white">로그인</span>
              </>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
