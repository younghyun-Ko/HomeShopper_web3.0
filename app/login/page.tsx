"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  KeyRound,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import {
  loginUser,
  registerUser,
  resolvePostLoginPath,
  type UserRole,
} from "@/lib/auth";

type LoginFormState = {
  email: string;
  password: string;
  remember: boolean;
  loginRole: UserRole;
};

type RegisterFormState = {
  confirmPassword: string;
  email: string;
  name: string;
  password: string;
  remember: boolean;
  userRole: UserRole;
};

const initialLoginForm: LoginFormState = {
  email: "",
  loginRole: "GENERAL",
  password: "",
  remember: true,
};

const initialRegisterForm: RegisterFormState = {
  confirmPassword: "",
  email: "",
  name: "",
  password: "",
  remember: true,
  userRole: "GENERAL",
};

const userRoleLabels: Record<UserRole, string> = {
  AGENT: "중개사",
  GENERAL: "일반 회원",
  ADMIN: "관리자",
};

function LoginSplitSection() {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();
  const accountTypeLabel = userRoleLabels[registerForm.userRole];

  const finishAuth = (userRole: UserRole) => {
    const redirectPath = new URLSearchParams(window.location.search).get("redirect");
    router.push(resolvePostLoginPath(redirectPath, userRole));
  };

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const result = loginUser(loginForm);

    if (!result.success) {
      setFormError(result.error);
      return;
    }

    const actualRole = result.session.user.userRole;

    if (actualRole === "ADMIN") {
      finishAuth("ADMIN");
      return;
    }

    if (actualRole !== loginForm.loginRole) {
      const actual = actualRole === "GENERAL" ? "일반 회원" : "중개사";
      setFormError(
        `이 계정은 ${actual} 계정입니다. ${actual} 로그인을 선택해주세요.`,
      );
      return;
    }

    finishAuth(actualRole);
  };

  const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (registerForm.password !== registerForm.confirmPassword) {
      setFormError("비밀번호가 일치하지 않습니다.");
      return;
    }

    const result = registerUser({
      email: registerForm.email,
      name: registerForm.name,
      password: registerForm.password,
      remember: registerForm.remember,
      userRole: registerForm.userRole,
    });

    if (!result.success) {
      setFormError(result.error);
      return;
    }

    finishAuth(result.session.user.userRole);
  };

  return (
    <section
      id="login-access"
      aria-labelledby="login-heading"
      className="min-h-screen"
    >
      <div className="min-h-screen bg-[var(--gradient-background)] lg:grid lg:grid-cols-[1.45fr_1fr]">
        <div className="relative hidden overflow-hidden lg:block lg:min-h-screen">
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, #0083FF 0%, #4C2CE2 100%)" }}
          />
          {/* blur overlay for depth */}
          <div className="absolute inset-0" style={{ backdropFilter: "blur(40px)", background: "rgba(255,255,255,0.06)" }} />

          <div className="relative z-20 flex min-h-screen items-center px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div className="max-w-2xl text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/12 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-white/92 backdrop-blur-md">
                <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                HomeShopper
              </div>
              <h1
                id="login-heading"
                className="mt-6 max-w-3xl text-4xl leading-[1.1] tracking-[-0.04em] sm:text-5xl lg:text-7xl"
                style={{ fontFamily: "AppleSDGothicNeoSB00, sans-serif" }}
              >
                리스크는 AI가 지우고,
                <br/>
                수수료는 홈쇼퍼가 낮춰드립니다.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/86 sm:text-lg">
                AI 권리분석과 합리적인 중개 시스템으로 계약 전 리스크를 먼저 확인하고,
                <br />
                더 낮은 비용으로 매물을 비교하세요.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/90">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3.5 py-1.5 backdrop-blur-md">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  검증된 매물
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3.5 py-1.5 backdrop-blur-md">
                  <KeyRound className="h-4 w-4" aria-hidden="true" />
                  맞춤 상담
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f4f8ff_0%,#eaf1ff_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(37,99,255,0.1)_0%,rgba(37,99,255,0)_24%),radial-gradient(circle_at_82%_18%,rgba(102,87,255,0.08)_0%,rgba(102,87,255,0)_20%)]" />

          <div className="relative z-10 w-full max-w-md">
            <Link
              href="/"
              className="mb-6 flex w-full items-center justify-center gap-3 text-[var(--color-primary)] transition-opacity hover:opacity-75"
            >
              <Image
                src="/logo.png"
                alt="HomeShopper 로고"
                width={36}
                height={36}
                className="h-9 w-9 rounded-xl object-cover"
                priority
              />
              <span className="font-[family-name:var(--font-sans)] text-lg font-extrabold tracking-tight text-[var(--color-accent)]">
                HomeShopper
              </span>
            </Link>

            <div
              className="border border-white/30 p-5 sm:p-8"
              style={{
                background: "rgba(255, 255, 255, 0.18)",
                borderRadius: "16px",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(11.8px)",
                WebkitBackdropFilter: "blur(11.8px)",
              }}
            >
              <p className="text-center text-2xl font-semibold uppercase tracking-tight text-[var(--color-accent)] sm:text-3xl">
                {isCreateAccount ? "회원가입" : "로그인"}
              </p>

              {formError ? (
                <p className="mt-4 rounded-2xl border border-red-200/70 bg-red-50/80 px-4 py-3 text-sm text-red-700">
                  {formError}
                </p>
              ) : null}

              <form
                className="mt-6 space-y-3 sm:mt-8 sm:space-y-4"
                onSubmit={isCreateAccount ? handleRegisterSubmit : handleLoginSubmit}
              >
                <div className="rounded-full border border-white/35 bg-white/18 p-1 backdrop-blur-md">
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setFormError(null);
                        if (isCreateAccount) {
                          setRegisterForm((current) => ({ ...current, userRole: "GENERAL" }));
                        } else {
                          setLoginForm((current) => ({ ...current, loginRole: "GENERAL" }));
                        }
                      }}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                        (isCreateAccount ? registerForm.userRole : loginForm.loginRole) === "GENERAL"
                          ? "button-gradation text-white shadow-[0_10px_22px_rgba(49,93,255,0.16)]"
                          : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                      }`}
                    >
                      일반 회원
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormError(null);
                        if (isCreateAccount) {
                          setRegisterForm((current) => ({ ...current, userRole: "AGENT" }));
                        } else {
                          setLoginForm((current) => ({ ...current, loginRole: "AGENT" }));
                        }
                      }}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                        (isCreateAccount ? registerForm.userRole : loginForm.loginRole) === "AGENT"
                          ? "button-gradation text-white shadow-[0_10px_22px_rgba(49,93,255,0.16)]"
                          : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                      }`}
                    >
                      중개사
                    </button>
                  </div>
                </div>

                {isCreateAccount ? (
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-[var(--color-primary)] sm:mb-2">
                      이름
                    </span>
                    <div className="flex items-center gap-3 rounded-full border border-white/60 bg-white/38 px-4 py-3 shadow-sm shadow-[rgba(49,93,255,0.08)] backdrop-blur-md">
                      <UserRound className="h-4 w-4 text-[var(--color-accent)]" />
                      <input
                        type="text"
                        placeholder="이름을 입력하세요"
                        value={registerForm.name}
                        onChange={(event) =>
                          setRegisterForm((current) => ({
                            ...current,
                            name: event.target.value,
                          }))
                        }
                        className="w-full bg-transparent text-sm text-[var(--color-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
                      />
                    </div>
                  </label>
                ) : null}

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-[var(--color-primary)] sm:mb-2">
                    이메일
                  </span>
                  <div className="flex items-center gap-3 rounded-full border border-white/60 bg-white/38 px-4 py-3 shadow-sm shadow-[rgba(49,93,255,0.08)] backdrop-blur-md">
                    <Mail className="h-4 w-4 text-[var(--color-accent)]" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={isCreateAccount ? registerForm.email : loginForm.email}
                      onChange={(event) => {
                        const nextEmail = event.target.value;

                        if (isCreateAccount) {
                          setRegisterForm((current) => ({
                            ...current,
                            email: nextEmail,
                          }));
                          return;
                        }

                        setLoginForm((current) => ({
                          ...current,
                          email: nextEmail,
                        }));
                      }}
                      className="w-full bg-transparent text-sm text-[var(--color-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-[var(--color-primary)] sm:mb-2">
                    {isCreateAccount ? "비밀번호" : "비밀번호"}
                  </span>
                  <div className="flex items-center gap-3 rounded-full border border-white/60 bg-white/38 px-4 py-3 shadow-sm shadow-[rgba(49,93,255,0.08)] backdrop-blur-md">
                    <KeyRound className="h-4 w-4 text-[var(--color-accent)]" />
                    <input
                      type="password"
                      placeholder="비밀번호를 입력해주세요"
                      value={isCreateAccount ? registerForm.password : loginForm.password}
                      onChange={(event) => {
                        const nextPassword = event.target.value;

                        if (isCreateAccount) {
                          setRegisterForm((current) => ({
                            ...current,
                            password: nextPassword,
                          }));
                          return;
                        }

                        setLoginForm((current) => ({
                          ...current,
                          password: nextPassword,
                        }));
                      }}
                      className="w-full bg-transparent text-sm text-[var(--color-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
                    />
                  </div>
                </label>

                {isCreateAccount ? (
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-[var(--color-primary)] sm:mb-2">
                      비밀번호 확인
                    </span>
                    <div className="flex items-center gap-3 rounded-full border border-white/60 bg-white/38 px-4 py-3 shadow-sm shadow-[rgba(49,93,255,0.08)] backdrop-blur-md">
                      <KeyRound className="h-4 w-4 text-[var(--color-accent)]" />
                      <input
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요"
                        value={registerForm.confirmPassword}
                        onChange={(event) =>
                          setRegisterForm((current) => ({
                            ...current,
                            confirmPassword: event.target.value,
                          }))
                        }
                        className="w-full bg-transparent text-sm text-[var(--color-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
                      />
                    </div>
                  </label>
                ) : (
                  <div className="flex flex-col gap-3 text-sm text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={loginForm.remember}
                        onChange={(event) =>
                          setLoginForm((current) => ({
                            ...current,
                            remember: event.target.checked,
                          }))
                        }
                        className="h-4 w-4 rounded border-white/70 text-[var(--color-accent)] accent-[var(--color-accent)]"
                      />
                      로그인 상태 유지
                    </label>

                    <Link
                      href="#"
                      className="font-medium text-[var(--color-text-muted)] transition-opacity hover:opacity-75"
                    >
                      비밀번호를 잊으셨나요?
                    </Link>
                  </div>
                )}

                {isCreateAccount ? (
                  <label className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                    <input
                      type="checkbox"
                      checked={registerForm.remember}
                      onChange={(event) =>
                        setRegisterForm((current) => ({
                          ...current,
                          remember: event.target.checked,
                        }))
                      }
                      className="h-4 w-4 rounded border-white/70 text-[var(--color-accent)] accent-[var(--color-accent)]"
                    />
                    로그인 상태 유지
                  </label>
                ) : null}

                <button
                  type="submit"
                  className="button-gradation mt-2 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(49,93,255,0.18)] transition-transform duration-200 hover:-translate-y-0.5 sm:py-3.5"
                >
                  {isCreateAccount
                    ? `${accountTypeLabel} 계정 만들기`
                    : "로그인"}
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-[var(--color-text-muted)] sm:mt-6">
                {isCreateAccount ? "이미 계정이 있으신가요? " : "처음이신가요? "}
                <button
                  type="button"
                  onClick={() => {
                    setFormError(null);
                    setIsCreateAccount((current) => !current);
                  }}
                  className="font-semibold text-[var(--color-accent)] transition-opacity hover:opacity-80"
                >
                  {isCreateAccount ? "로그인으로 돌아가기" : "계정 만들기"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <main className="bg-[var(--gradient-background)] text-[var(--color-text)]">
      <LoginSplitSection />
    </main>
  );
}
