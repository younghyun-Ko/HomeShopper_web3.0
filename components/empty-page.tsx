type EmptyPageSection = {
  heading: string;
  id: string;
};

type EmptyPageProps = {
  sections: EmptyPageSection[];
  title: string;
};

function PageIntroSection({ title }: { title: string }) {
  return (
    <section
      aria-labelledby="page-heading"
      className="px-6 pb-8 pt-24 sm:px-10 sm:pb-10 sm:pt-28"
    >
      <div className="mx-auto max-w-6xl rounded-[var(--radius-lg)] border border-white/60 bg-[var(--color-surface)] px-8 py-20 backdrop-blur">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.32em] text-[var(--color-accent)]">
          HomeShopper
        </p>
        <h1
          id="page-heading"
          className="font-[family-name:var(--font-heading)] text-4xl text-[var(--color-text)] sm:text-5xl"
        >
          {title}
        </h1>
      </div>
    </section>
  );
}

function PageContentSection({
  heading,
  id,
}: {
  heading: string;
  id: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="px-6 py-8 sm:px-10 sm:py-10"
    >
      <div className="mx-auto max-w-6xl rounded-[var(--radius-lg)] border border-white/60 bg-[var(--color-surface)] px-8 py-14 backdrop-blur">
        <h2
          id={`${id}-heading`}
          className="font-[family-name:var(--font-heading)] text-3xl text-[var(--color-text)] sm:text-4xl"
        >
          {heading}
        </h2>
      </div>
    </section>
  );
}

export function EmptyPage({ sections, title }: EmptyPageProps) {
  return (
    <main className="min-h-screen pb-12 sm:pb-16">
      <PageIntroSection title={title} />
      {sections.map((section) => (
        <PageContentSection
          key={section.id}
          id={section.id}
          heading={section.heading}
        />
      ))}
    </main>
  );
}
