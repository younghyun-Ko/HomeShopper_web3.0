import { Check } from "lucide-react";

export default function ConsultationSubmittedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24 sm:px-10 lg:px-16">
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[#edf8ef] sm:h-40 sm:w-40">
          <div className="flex h-18 w-18 items-center justify-center rounded-full border-4 border-[#10c14d] text-[#10c14d] sm:h-20 sm:w-20">
            <Check className="h-9 w-9 stroke-[3]" aria-hidden="true" />
          </div>
        </div>

        <h1 className="mt-14 font-[family-name:var(--font-heading)] text-5xl font-semibold tracking-[-0.05em] text-[#1f2d59] sm:text-6xl lg:text-7xl">
          신청이 완료되었습니다!
        </h1>

        <p className="mt-8 text-xl text-[#90a0bf] sm:text-2xl">
          전담 매니저가 <strong className="font-semibold text-[#1f2d59]">24시간 내</strong>에 연락드리겠습니다.
        </p>
      </section>
    </main>
  );
}
