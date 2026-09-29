"use client";
import { useState } from "react";
import { regions } from "@/lib/learning-regions";
export function LearningWorld() {
  const [selected, setSelected] = useState(0);
  const [view, setView] = useState("map");
  const region = regions[selected];
  return (
    <section aria-labelledby="world-title" className="section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">The learning atlas</p>
          <h2 id="world-title">Eight regions. One adventure.</h2>
        </div>
        <div className="view-switch" aria-label="World display">
          <button aria-pressed={view === "map"} onClick={() => setView("map")}>
            Map
          </button>
          <button
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
          >
            Quest list
          </button>
        </div>
      </div>
      <p className="muted world-note">
        Explore the planned learning path. Starter Grove has a playable
        introduction; other regions are coming later.
      </p>
      <div className="world-layout">
        <div className={`world-map ${view === "list" ? "list-view" : ""}`}>
          <svg
            viewBox="0 0 1000 650"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="map-terrain"
          >
            <path d="M0 0H1000V650H0Z" fill="#122d32" />
            <path
              d="M0 200 210 95 350 220 470 20 610 160 710 45 1000 240V0H0Z"
              fill="#28434b"
            />
            <path d="M0 540Q180 360 360 440T1000 370V650H0Z" fill="#193d35" />
            <path
              d="M610 0C490 190 720 240 500 390S450 570 310 650"
              fill="none"
              stroke="#32656a"
              strokeWidth="40"
            />
            <path
              d="M160 494 350 390 170 254 390 143 600 104 790 228 620 371 810 501"
              fill="none"
              stroke="#c7b77d"
              strokeWidth="3"
              strokeDasharray="7 9"
            />
          </svg>
          <ol className="region-nodes">
            {regions.map((item, i) => (
              <li
                key={item.name}
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
              >
                <button
                  className={`map-node ${selected === i ? "selected" : ""}`}
                  aria-pressed={selected === i}
                  aria-controls="region-detail"
                  onClick={() => setSelected(i)}
                >
                  <span className="node-marker" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <strong>{item.name}</strong>
                    <small>
                      {i === 0 ? "Introduction available" : "Coming later"}
                    </small>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <aside
          id="region-detail"
          className="quest-card region-detail"
          aria-live="polite"
        >
          <span className="card-index">
            REGION {String(selected + 1).padStart(2, "0")}
          </span>
          <h3>{region.name}</h3>
          <p className="region-topic">{region.topic}</p>
          <p className="muted">{region.description}</p>
          {selected === 0 ? (
            <a href="#first-quest" className="button">
              Try your first quest →
            </a>
          ) : (
            <div className="coming-state">
              <strong>Coming later</strong>
              <p>
                This region is part of the planned academy. No unlock is
                required to view this preview.
              </p>
              <a className="text-link" href="#first-quest">
                Try the available introduction →
              </a>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
export function FirstQuest() {
  const [requested, setRequested] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const [completion, setCompletion] = useState("");
  const [saving, setSaving] = useState(false);

  async function completeQuest() {
    setAnswer(1);
    setSaving(true);
    setCompletion("");
    try {
      const response = await fetch("/api/academy/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lesson: "what-is-an-api",
          answers: { answer: "weather-data" },
          idempotencyKey: crypto.randomUUID(),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error?.message ?? "Progress could not be saved.");
      setCompletion(result.data.awarded
        ? `Saved. You now have ${result.data.xp} XP and ${result.data.gold} gold.`
        : `Already completed. Your balance remains ${result.data.xp} XP and ${result.data.gold} gold.`);
    } catch (error) {
      setCompletion(error instanceof Error ? error.message : "Progress could not be saved.");
    } finally {
      setSaving(false);
    }
  }
  return (
    <section
      className="lesson section"
      id="first-quest"
      aria-labelledby="quest-title"
    >
      <div className="lesson-heading">
        <p className="eyebrow">Starter Grove / Introductory quest</p>
        <h2 id="quest-title">What is an API?</h2>
        <p className="muted">No setup, no coding, just a little curiosity.</p>
      </div>
      <div className="lesson-grid">
        <article className="quest-card lesson-copy">
          <span className="card-index">01 / UNDERSTAND</span>
          <h3>A way for apps to talk.</h3>
          <p>
            An API is a set of rules that lets one piece of software ask another
            for information or an action.
          </p>
          <p>
            Think of a weather app. It asks a weather service for a forecast.
            That <strong>request</strong> goes to the service through its API.
            The service sends back a <strong>response</strong> with the weather
            data.
          </p>
          <p>
            The app turns that data into something useful: “Bring a jacket.” You
            don’t need to write code to understand the conversation.
          </p>
        </article>
        <div className="quest-card playground">
          <span className="card-index">02 / TRY IT</span>
          <h3>Ask for the grove’s weather.</h3>
          <p className="muted">
            This is a simulation using example data. It does not contact a live
            API.
          </p>
          <div className="request-line">
            <span>GET</span>
            <code>/example/weather?place=starter-grove</code>
          </div>
          <button className="button" onClick={() => setRequested(true)}>
            {requested ? "Send request again ↗" : "Send example request ↗"}
          </button>
          <div className="response-box" aria-live="polite">
            {requested ? (
              <>
                <span className="success-label">
                  200 OK · Request successful
                </span>
                <pre>
                  {
                    '{\n  "place": "Starter Grove",\n  "weather": "Clear skies",\n  "temperatureC": 18\n}'
                  }
                </pre>
                <p className="small muted">
                  This format is called JSON: labels paired with values.
                </p>
              </>
            ) : (
              <p className="muted">Your example response will appear here.</p>
            )}
          </div>
        </div>
      </div>
      <fieldset className="knowledge-check">
        <legend>Check your understanding</legend>
        <p>In our weather example, what is the response?</p>
        <div className="answer-options">
          {[
            "The app asking for the forecast",
            "The weather data sent back by the service",
          ].map((label, i) => (
            <button
              key={label}
              aria-pressed={answer === i}
              onClick={() => i === 1 ? void completeQuest() : setAnswer(i)}
              disabled={saving}
              className="answer-button"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="answer-feedback" aria-live="polite">
          {answer === 1 ? (
            <p className="success-label">
              ✓ Exactly. The request asks; the response brings information back.
              You’ve completed this introductory preview.
            </p>
          ) : answer === 0 ? (
            <p>
              That’s the request. The response is what the service sends back.
              Try again.
            </p>
          ) : (
            <p className="muted">Choose an answer to see an explanation.</p>
          )}
        </div>
        <p className="small muted" aria-live="polite">
          {saving ? "Validating and saving…" : completion || "Sign in to save completion and earn the one-time reward."}
        </p>
      </fieldset>
    </section>
  );
}
