import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="signal" /> Developer APIs · A world of learning
          </p>
          <h1>
            Every builder
            <br />
            starts with
            <br />
            <em>a first quest.</em>
          </h1>
          <p className="hero-promise">
            Learn APIs from zero.
            <br />
            <strong>No coding experience required.</strong>
          </p>
          <p className="muted">
            Discover how apps talk to each other, try your first request, and
            begin your journey toward real projects.
          </p>
          <div className="actions">
            <Link className="button" href="/learn#active-quest">
              Start your first quest <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button secondary" href="/apis">
              Explore QuestAPIs
            </Link>
          </div>
          <p className="small muted">
            Twenty-four interactive quests. Start without an account.
          </p>
        </div>
        <div className="hero-world">
          <Image className="academy-world-image" src="/images/academy-world-v2.webp" alt="A cinematic learning world with connected forests, valleys, mountains, and a distant citadel" fill priority sizes="(max-width: 900px) 100vw, 50vw" />
          <div className="world-caption">
            <span className="eyebrow">Your journey begins here</span>
            <h2>Starter Grove</h2>
            <p>A small clearing. A world of possibilities.</p>
          </div>
          <Link href="/learn#active-quest" className="floating-quest">
            <span className="quest-emblem" aria-hidden="true">
              ✦
            </span>
            <span>
              <span className="eyebrow">Your first quest · Course 1 of 8</span>
              <strong>What is an API?</strong>
              <span className="muted small">
                A simple idea that connects our world.
              </span>
            </span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
      <div className="path-strip">
        <div className="shell">
          <span>Learn at your own pace</span>
          <span>Start with the basics</span>
          <span>Build toward something real</span>
        </div>
      </div>
      <section className="shell section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Choose your path</p>
            <h2>Curiosity is all you need.</h2>
          </div>
          <p className="muted">
            A welcoming place to learn.
            <br />A practical platform to build with.
          </p>
        </div>
        <div className="path-grid">
          <article className="quest-card path-card">
            <span className="card-index">01 / THE EXPLORER</span>
            <h3>
              New to APIs?
              <br />
              You belong here.
            </h3>
            <p className="muted">
              Start with everyday examples, not a wall of code. Explore the
              learning world and try a guided introduction.
            </p>
            <Link className="text-link" href="/learn">
              Discover the academy →
            </Link>
          </article>
          <article className="quest-card path-card">
            <span className="card-index">02 / THE BUILDER</span>
            <h3>
              Your next project.
              <br />
              Our API toolkit.
            </h3>
            <p className="muted">
              Explore modular APIs for quests, player profiles, rewards, and
              inventory. Built for apps, games, and digital experiences.
            </p>
            <Link className="text-link" href="/apis">
              Browse the API library →
            </Link>
          </article>
        </div>
      </section>
      <section className="shell section product-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The platform behind the adventure</p>
            <h2>One live sandbox. Room to build.</h2>
          </div>
          <Link className="text-link" href="/docs">
            Read the docs overview →
          </Link>
        </div>
        <div className="product-grid">
          {[
            ["Grove", "A safe, read-only API for your first real request."],
            ["Quest Engine", "Quests, objectives, and completion tracking."],
            ["Player", "Profiles, levels, and player progression."],
            ["Reward", "XP, coins, unlocks, and reward history."],
          ].map(([name, description], i) => (
            <article className="product-card" key={name}>
              <span className="product-symbol" aria-hidden="true">
                {["✦", "⌘", "♧", "◇"][i]}
              </span>
              <span className="status">
                {i === 0 ? "Dev sandbox" : "V2 planned"}
              </span>
              <h3>{name} API</h3>
              <p className="muted">{description}</p>
              <Link href={i === 0 ? "/playground" : "/apis"} aria-label={`Explore ${name} API`}>
                Explore ↗
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="shell closing">
        <p className="eyebrow">One small step. A new world.</p>
        <h2>
          You don’t need to know the way.
          <br />
          Just where to begin.
        </h2>
        <Link href="/learn#active-quest" className="button">
          Enter Starter Grove →
        </Link>
      </section>
    </main>
  );
}
