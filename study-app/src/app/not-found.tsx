import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page">
      <section className="empty-state">
        <h1>That study page was not found</h1>
        <p>The canonical question bank and your saved browser progress are safe.</p>
        <Link className="button primary" href="/">
          Return to Dashboard
        </Link>
      </section>
    </div>
  );
}

