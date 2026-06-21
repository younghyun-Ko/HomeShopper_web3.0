"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Mail, Phone, Clock, Shield } from "lucide-react";

export function SiteFooter() {
  const pathname = usePathname();

  if (
    pathname === "/login" ||
    pathname === "/consultation" ||
    pathname === "/consultation/submitted"
  ) {
    return null;
  }

  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div>
              <p className="font-[family-name:var(--font-sans)] text-2xl font-black tracking-tight text-[var(--color-accent)]">
                HomeShopper
              </p>
            </div>
            <div className="space-y-1.5 text-[13px] font-medium text-slate-400">
              <p>홈쇼퍼 | 대표: 고영현</p>
              <p>사업자등록번호: 000-00-00000</p>
              <p>전북 전주시 덕진구 에코시티로 00</p>
            </div>
          </div>

          {/* Column 2: Customer Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-700">고객센터</h3>
            <ul className="space-y-2.5 text-[13px] font-medium text-slate-400">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                <a
                  href="mailto:contact@homeshopper.kr"
                  className="hover:text-slate-600 transition-colors"
                >
                  contact@homeshopper.kr
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                <a
                  href="tel:0507-0000-0000"
                  className="hover:text-slate-600 transition-colors"
                >
                  0507-0000-0000
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-slate-400" />
                <span>평일 10:00 - 18:00 (주말·공휴일 휴무)</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Policies */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-700">약관 및 정책</h3>
            <ul className="space-y-2.5 text-[13px] font-medium text-slate-400">
              <li className="flex items-center gap-2.5">
                <Shield className="h-4 w-4 shrink-0 text-slate-400" />
                <Link
                  href="/terms"
                  className="hover:text-slate-600 transition-colors"
                >
                  이용약관
                </Link>
              </li>
              <li className="flex items-center gap-2.5">
                <Shield className="h-4 w-4 shrink-0 text-slate-400" />
                <Link
                  href="/privacy"
                  className="hover:text-slate-600 transition-colors"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li className="flex items-center gap-2.5">
                <Shield className="h-4 w-4 shrink-0 text-slate-400" />
                <Link
                  href="/dispute-resolution"
                  className="hover:text-slate-600 transition-colors"
                >
                  분쟁해결기준
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-slate-100 pt-6 text-center text-xs font-medium text-slate-400">
          <p>
            © {new Date().getFullYear()} HomeShopper. All rights reserved. 홈쇼퍼는 통신판매중개자이며, 통신판매의 당사자가 아닙니다.
          </p>
        </div>
      </div>
    </footer>
  );
}

