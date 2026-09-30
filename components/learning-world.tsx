"use client";

import { type FormEvent, useState, useSyncExternalStore } from "react";
import { allAcademyQuests, courseQuests, lessonPagesFor, regions, type LearningQuest } from "@/lib/learning-regions";

const explorerNameKey = "questapis-explorer-name";
function subscribeToExplorerName(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("questapis-name", callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener("questapis-name", callback); };
}
function readExplorerName() { return window.localStorage.getItem(explorerNameKey) ?? ""; }
function readServerExplorerName() { return ""; }

export function AcademyExperience({ authenticated = false }: { authenticated?: boolean }) {
  const [selectedCourse, setSelectedCourse] = useState(0);
  const [selectedQuest, setSelectedQuest] = useState(0);
  const [view, setView] = useState<"map" | "list">("map");
  const [nameDraft, setNameDraft] = useState("");
  const explorerName = useSyncExternalStore(subscribeToExplorerName, readExplorerName, readServerExplorerName);
  const region = regions[selectedCourse];
  const quests = courseQuests[selectedCourse];
  const quest = quests[selectedQuest];

  function chooseQuest(courseIndex: number, questIndex: number) {
    setSelectedCourse(courseIndex);
    setSelectedQuest(questIndex);
    window.setTimeout(() => document.getElementById("active-quest")?.scrollIntoView({ behavior: "smooth" }), 0);
  }

  function chooseNextQuest() {
    if (selectedQuest < quests.length - 1) chooseQuest(selectedCourse, selectedQuest + 1);
    else if (selectedCourse < courseQuests.length - 1) chooseQuest(selectedCourse + 1, 0);
  }

  function saveExplorerName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = nameDraft.trim().slice(0, 24);
    if (!name) return;
    window.localStorage.setItem(explorerNameKey, name);
    window.dispatchEvent(new Event("questapis-name"));
  }

  return (
    <>
      <section className="academy-welcome" aria-label="Explorer welcome">
        <div className="welcome-orb" aria-hidden="true"><span>✦</span></div>
        <div>
          <p className="eyebrow">Your adventure remembers you</p>
          <h2>{explorerName ? `${authenticated ? "Welcome back" : "Welcome"}, ${explorerName}.` : "What should the Academy call you?"}</h2>
          <p className="muted">Twenty-four in-depth quests are ready. {authenticated ? "Your completed quests can be saved to this account." : "Sign in to save completion and rewards across devices."}</p>
        </div>
        {explorerName ? <button className="text-link welcome-change" onClick={() => { setNameDraft(explorerName); window.localStorage.removeItem(explorerNameKey); window.dispatchEvent(new Event("questapis-name")); }}>Change name</button> :
          <form className="explorer-name-form" onSubmit={saveExplorerName}>
            <label htmlFor="explorer-name">Explorer name</label>
            <div><input id="explorer-name" value={nameDraft} onChange={(event) => setNameDraft(event.target.value)} maxLength={24} placeholder="e.g. Nova" required /><button className="button">Save</button></div>
            <small>Stored only on this device.</small>
          </form>}
      </section>
      <section aria-labelledby="world-title" className="section">
        <div className="section-heading">
          <div><p className="eyebrow">The learning atlas</p><h2 id="world-title">Eight courses. Twenty-four playable quests.</h2></div>
          <div className="view-switch" aria-label="World display">
            <button aria-pressed={view === "map"} onClick={() => setView("map")}>Map</button>
            <button aria-pressed={view === "list"} onClick={() => setView("list")}>Quest list</button>
          </div>
        </div>
        <p className="muted world-note">Every region is now a complete three-quest course. Choose any route to learn, experiment, and save one-time rewards after signing in.</p>
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
                  <button className={`map-node ${selectedCourse === index ? "selected" : ""}`} aria-pressed={selectedCourse === index} aria-controls="region-detail" onClick={() => { setSelectedCourse(index); setSelectedQuest(0); }}>
                    <span className="node-marker" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span><strong>{item.name}</strong><small>3 quests available</small></span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <aside id="region-detail" className="quest-card region-detail" aria-live="polite">
            <span className="card-index">COURSE {String(selectedCourse + 1).padStart(2, "0")}</span>
            <h3>{region.name}</h3>
            <p className="region-topic">{region.topic}</p>
            <p className="muted">{region.description}</p>
            <div className="course-quest-list">
              {quests.map((item, index) => <button key={item.slug} className={selectedQuest === index ? "selected" : ""} onClick={() => setSelectedQuest(index)}><span>{String(index + 1).padStart(2, "0")}</span><span><strong>{item.title}</strong><small>About 67 minutes · 100 XP</small></span></button>)}
            </div>
            <button className="button" onClick={() => chooseQuest(selectedCourse, selectedQuest)}>Begin selected quest →</button>
          </aside>
        </div>
      </section>
      <QuestLesson key={quest.slug} quest={quest} questNumber={selectedCourse * 3 + selectedQuest + 1} totalQuests={allAcademyQuests.length} onNext={chooseNextQuest} isFinal={selectedCourse === courseQuests.length - 1 && selectedQuest === quests.length - 1} />
    </>
  );
}

function QuestLesson({ quest, questNumber, totalQuests, onNext, isFinal }: { quest: LearningQuest; questNumber: number; totalQuests: number; onNext: () => void; isFinal: boolean }) {
  const [requested, setRequested] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const [completion, setCompletion] = useState("");
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(0);
  const pages = lessonPagesFor(quest);
  const currentPage = pages[page];
  const correct = answer === quest.correctAnswer;

  function changePage(nextPage: number) {
    setPage(Math.max(0, Math.min(nextPage, pages.length - 1)));
    window.setTimeout(() => document.getElementById("quest-title")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

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
    <section className={`lesson section ${correct ? "celebrating" : ""}`} id="active-quest" aria-labelledby="quest-title">
      <div className="lesson-heading">
        <p className="eyebrow">{quest.name} / Quest {String(questNumber).padStart(2, "0")} of {totalQuests}</p>
        <h2 id="quest-title">{quest.title}</h2>
        <p className="muted">About 67 minutes · five guided pages · no setup or coding required.</p>
      </div>
      <nav className="lesson-progress" aria-label="Quest pages">
        {pages.map((item, index) => <button key={item.label} aria-current={page === index ? "step" : undefined} onClick={() => changePage(index)}><span>{index + 1}</span><small>{item.label}</small></button>)}
      </nav>
      <article className="quest-card lesson-page">
        <div className="lesson-page-heading"><span className="card-index">PAGE {page + 1} OF {pages.length} / {currentPage.label}</span><span className="lesson-time">◷ {currentPage.minutes} min</span></div>
        <h3>{currentPage.title}</h3>
        {currentPage.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <div className="lesson-details">
          <div><h4>Key ideas</h4><ul>{currentPage.takeaways.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="lesson-activity"><h4>Your field exercise</h4><p>{currentPage.activity}</p><strong>Reflect:</strong><p>{currentPage.prompt}</p></div>
        </div>
        {page === 2 && <div className="playground lesson-lab">
          <h4>Interactive request lab</h4>
          <p className="muted">This uses safe example data and does not contact a third-party API.</p>
          <div className="request-line"><span>GET</span><code>{quest.request}</code></div>
          <button className="button" onClick={() => setRequested(true)}>{requested ? "Send request again ↗" : "Send example request ↗"}</button>
          <div className="response-box" aria-live="polite">{requested ? <><span className="success-label">200 OK · Example response</span><pre>{JSON.stringify(quest.response, null, 2)}</pre><p className="small muted">{quest.responseNote}</p></> : <p className="muted">Predict the response, then send the request to compare.</p>}</div>
        </div>}
        {page === pages.length - 1 && <fieldset className="knowledge-check">
          <legend>Check your understanding</legend><p>{quest.question}</p>
          <div className="answer-options">{quest.answers.map((label, index) => <button key={label} aria-pressed={answer === index} onClick={() => void chooseAnswer(index)} disabled={saving} className="answer-button">{label}</button>)}</div>
          <div className="answer-feedback" aria-live="polite">{correct ? <p className="success-label">✓ Exactly. {quest.explanation}</p> : answer !== null ? <p>Not quite. Review the example and try again.</p> : <p className="muted">Choose an answer to see an explanation.</p>}</div>
          <p className="small muted" aria-live="polite">{saving ? "Validating and saving…" : completion || "Sign in to save completion and earn the one-time reward."}</p>
        </fieldset>}
      </article>
      <div className="lesson-navigation">
        <button className="text-link" onClick={() => changePage(page - 1)} disabled={page === 0}>← Previous page</button>
        {page < pages.length - 1 ? <button className="button" onClick={() => changePage(page + 1)}>Next page →</button> : correct && !isFinal ? <button className="button" onClick={onNext}>Next quest →</button> : correct && isFinal ? <a className="button" href="/dashboard">View your Academy progress →</a> : <span className="muted small">Complete the check to unlock the next quest.</span>}
      </div>
    </section>
  );
}
