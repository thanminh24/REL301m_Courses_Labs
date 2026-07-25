"use client";

export default function RouteError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="page">
      <section className="empty-state">
        <h1>This study view needs another try</h1>
        <p>
          Your canonical questions and locally saved progress were not deleted.
        </p>
        <button className="button primary" onClick={reset}>
          Retry this view
        </button>
      </section>
    </div>
  );
}

