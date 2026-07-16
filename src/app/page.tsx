import Link from "next/link";

export default function Home() {
  return (
    <div className="page-shell">
      <section className="hero">
        <p className="hero-jp">夜の冒険記録</p>
        <h1 className="hero-title">City Pop Game Tracker</h1>
        <p className="hero-subtitle">
          Build your backlog scrapbook with a neon-vintage mood, clear goals,
          and visible progress from first play to final credits.
        </p>
        <div className="cta-row">
          <Link href="/games" className="btn btn-primary">
            Enter your collection
          </Link>
          <Link href="/achievements" className="btn btn-secondary">
            See achievements
          </Link>
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat">
          <p className="stat-number">12</p>
          <p className="stat-label">Desktop Grid Columns</p>
        </article>
        <article className="stat">
          <p className="stat-number">2</p>
          <p className="stat-label">Theme Modes</p>
        </article>
        <article className="stat">
          <p className="stat-number">100%</p>
          <p className="stat-label">CRUD Compatible</p>
        </article>
        <article className="stat">
          <p className="stat-number">City Pop</p>
          <p className="stat-label">Visual Signature</p>
        </article>
      </section>

      <p className="page-footer">
        Vintage textures, neon accents, and readable interactions in both light
        and dark themes.
      </p>
    </div>
  );
}
