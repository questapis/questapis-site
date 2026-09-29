"use client";

import { useState } from "react";
import { regions, type LearningQuest } from "@/lib/learning-regions";

export function AcademyExperience() {
  const [selected, setSelected] = useState(0);
  const [view, setView] = useState<"map" | "list">("map");
  const quest = regions[selected];

  function chooseQuest(index: number) {
    setSelected(index);
    window.setTimeout(() => document.getElementById("active-quest")?.scrollIntoView({ behavior: "smooth" }), 0);
  }

  return (
    <>
      <section aria-labelledby="world-title" className="section">
        <div className="section-heading">
          <div><p className="eyebrow">The learning atlas</p><h2 id="world-title">Eight regions. Eight playable quests.</h2></div>
          <div className="view-switch" aria-label="World display">
            <button aria-pressed={view === "map"} onClick={() => setView("map")}>Map</button>
            <button aria-pressed={view === "list"} onClick={() => setView("list")}>Quest list</button>
          </div>
        </div>
        <p className="muted world-note">Every region now has a beginner quest. Choose any region to learn, experiment, and save a one-time reward after signing in.</p>
        <div className="world-layout">
          <div className={`world-map ${view === "list" ? "list-view" : ""}`}>
            <svg viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true" className="map-terrain">
              <path d="M0 0H1000V650H0Z" fill="#122d32" />
              <path d="M0 200 210 95 350 220 470 20 610 160 710 45 1000 240V0H0Z" fill="#28434b" />
              <path d="M0 540Q180 360 360 440T1000 370V650H0Z" fill="#193d35" />
              <path d="M610 0C490 190 720 240 500 390S450 570 310 650" fill="none" stroke="#32656a" strokeWidth="40" />
              <path d="M160 494 350 390 170 254 390 143 600 104 790 228 620 371 810 501" fill="none" stroke="#c7b77d" strokeWidth="3" strokeDasharray="7 9" />
            </svg>
            <ol className="region-nodes">
              {regions.map((item, index) => (
                <li key={item.slug} style={{ left: `${item.x}%`, top: `${item.y}%` }}>
                  <button className={`map-node ${selected === index ? "selected" : ""}`} aria-pressed={selected === index} aria-controls="region-detail" onClick={() => setSelected(index)}>
                    <span className="node-marker" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span><strong>{item.name}</strong><small>Quest available</small></span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <aside id="region-detail" className="quest-card region-detail" aria-live="polite">
            <span className="card-index">REGION {String(selected + 1).padStart(2, "0")}</span>
            <h3>{quest.name}</h3>
            <p className="region-topic">{quest.topic}</p>
            <p className="muted">{quest.description}</p>
            <div className="quest-availability"><strong>{quest.title}</strong><p>{quest.duration} · 100 XP + a gold reward</p></div>
            <button className="button" onClick={() => chooseQuest(selected)}>Open this quest →</button>
          </aside>
        </div>
      </section>
      <QuestLesson key={quest.slug} quest={quest} questNumber={selected + 1} />
    </>
  );
}

function QuestLesson({ quest, questNumber }: { quest: LearningQuest; questNumber: number }) {
  const [requested, setRequested] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const [completion, setCompletion] = useState("");
  const [saving, setSaving] = useState(false);

  async function chooseAnswer(index: number) {
    setAnswer(index);
    setCompletion("");
    if (index !== quest.correctAnswer) return;
    setSaving(true);
    try {
      const response = await fetch("/api/academy/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lesson: quest.slug, answers: { answer: quest.answerKey }, idempotencyKey: crypto.randomUUID() }),
      });
      const result = await response.json();
      if (!response.ok) {
        if (response.status === 401) throw new Error("Correct! Sign in to save this quest and earn its reward.");
        throw new Error(result.error?.message ?? "Progress could not be saved.");
      }
      setCompletion(result.data.awarded
        ? `Quest saved. Your balance is now ${result.data.xp} XP and ${result.data.gold} gold.`
        : `Already completed. Your balance remains ${result.data.xp} XP and ${result.data.gold} gold.`);
    } catch (error) {
      setCompletion(error instanceof Error ? error.message : "Progress could not be saved.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="lesson section" id="active-quest" aria-labelledby="quest-title">
      <div className="lesson-heading">
        <p className="eyebrow">{quest.name} / Quest {String(questNumber).padStart(2, "0")}</p>
        <h2 id="quest-title">{quest.title}</h2>
        <p className="muted">{quest.duration}. No setup or coding required.</p>
      </div>
      <div className="lesson-grid">
        <article className="quest-card lesson-copy">
          <span className="card-index">01 / UNDERSTAND</span>
          <h3>{quest.conceptTitle}</h3>
          {quest.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </article>
        <div className="quest-card playground">
          <span className="card-index">02 / TRY IT</span>
          <h3>Send an example request.</h3>
          <p className="muted">This simulation uses safe example data and does not contact a third-party API.</p>
          <div className="request-line"><span>GET</span><code>{quest.request}</code></div>
          <button className="button" onClick={() => setRequested(true)}>{requested ? "Send request again ↗" : "Send example request ↗"}</button>
          <div className="response-box" aria-live="polite">
            {requested ? <><span className="success-label">200 OK · Example response</span><pre>{JSON.stringify(quest.response, null, 2)}</pre><p className="small muted">{quest.responseNote}</p></> : <p className="muted">Your example response will appear here.</p>}
          </div>
        </div>
      </div>
      <fieldset className="knowledge-check">
        <legend>Check your understanding</legend>
        <p>{quest.question}</p>
        <div className="answer-options">
          {quest.answers.map((label, index) => <button key={label} aria-pressed={answer === index} onClick={() => void chooseAnswer(index)} disabled={saving} className="answer-button">{label}</button>)}
        </div>
        <div className="answer-feedback" aria-live="polite">
          {answer === quest.correctAnswer ? <p className="success-label">✓ Exactly. {quest.explanation}</p> : answer !== null ? <p>Not quite. Review the example and try again.</p> : <p className="muted">Choose an answer to see an explanation.</p>}
        </div>
        <p className="small muted" aria-live="polite">{saving ? "Validating and saving…" : completion || "Sign in to save completion and earn the one-time reward."}</p>
      </fieldset>
    </section>
  );
}
