import { LearningWorld, FirstQuest } from "@/components/learning-world";
export const metadata = {
  title: "Learn APIs from zero | QuestAPIs",
  description:
    "Explore the QuestAPIs learning world and try a free introductory API lesson. No coding experience required.",
};
export default function LearnPage() {
  return (
    <main id="main-content" tabIndex={-1} className="shell learn-page">
      <section className="learn-intro">
        <span className="status">Academy preview</span>
        <p className="eyebrow">Welcome, explorer</p>
        <h1>
          Your first step into
          <br />
          <em>a connected world.</em>
        </h1>
        <p className="hero-promise">
          Learn APIs from zero. No coding experience required.
        </p>
        <p className="muted">
          Discover the path ahead or jump straight into your first quest.
          <br />
          The full academy and saved progression are still in development.
        </p>
        <a href="#first-quest" className="button">
          Start your first quest →
        </a>
      </section>
      <LearningWorld />
      <FirstQuest />
    </main>
  );
}
