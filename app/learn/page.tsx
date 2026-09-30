import { AcademyExperience } from "@/components/learning-world";
import { createClient } from "@/lib/supabase/server";
export const metadata = {
  title: "Learn APIs from zero | QuestAPIs",
  description:
    "Explore the QuestAPIs learning world and try a free introductory API lesson. No coding experience required.",
};
export default async function LearnPage() {
  const supabase = await createClient();
  const { data: { user } } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  return (
    <main id="main-content" tabIndex={-1} className="shell learn-page">
      <section className="learn-intro">
        <span className="status">All eight courses open</span>
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
          Explore twenty-four interactive quests or jump straight into your first one.
          <br />
          Signed-in adventurers can save each completion and earn one-time rewards.
        </p>
        <a href="#active-quest" className="button">
          Start your first quest →
        </a>
      </section>
      <AcademyExperience authenticated={Boolean(user)} />
    </main>
  );
}
