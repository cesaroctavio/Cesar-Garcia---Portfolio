import React from "react";
import {
  Activity,
  ArrowUp,
  Bell,
  Check,
  CircleCheck,
  CircleX,
  GitBranch,
  FileArchive,
  Image,
  ListChecks,
  LoaderCircle,
  Mic,
  PanelLeft,
  Paperclip,
  Search,
  Sparkles,
  SquareKanban,
  Ticket,
  type LucideIcon,
} from "lucide-react";
import { Cursor, pressing, streamed, typed } from "./stage";

/*
 * Every scene renders from one number, t (ms since the scene started), so pausing,
 * restarting and the reduced-motion still frame all come from the same code.
 * Numbers that describe Cesar's work are real (55 specs, 17 storefronts); IDs and durations are filler.
 */

type SceneProps = { t: number };

const after = (t: number, at: number) => t >= at;

function AppMark({ size = "sm" }: { size?: "sm" | "lg" }) {
  return (
    <span className={`cp-mark cp-mark--${size}`}>
      <Check />
    </span>
  );
}

function Toast({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="cp-toast">
      <CircleCheck className="cp-toast__icon" />
      <div>
        <p className="cp-toast__title">{title}</p>
        <p className="cp-toast__detail">{detail}</p>
      </div>
    </div>
  );
}

type Status = "queued" | "running" | "passed" | "failed";

function StatusIcon({ state }: { state: Status }) {
  if (state === "queued") return <span className="cp-status cp-status--queued" />;
  if (state === "running") return <LoaderCircle className="cp-status cp-status--running" />;
  if (state === "passed") return <CircleCheck className="cp-status cp-status--passed" />;
  return <CircleX className="cp-status cp-status--failed" />;
}

/* 1 · Runs: the nightly run ticks through, one spec fails on the German storefront */

const RUN_ROWS = [
  { name: "login.spec.ts", market: "US", time: "1.2s" },
  { name: "search.spec.ts", market: "UK", time: "2.1s" },
  { name: "punchout-setup.spec.ts", market: "US", time: "3.4s" },
  { name: "quick-order.spec.ts", market: "MX", time: "2.8s" },
  { name: "cart.spec.ts", market: "JP", time: "1.9s" },
  { name: "checkout.spec.ts", market: "FR", time: "4.6s" },
  { name: "account.spec.ts", market: "CA", time: "1.4s" },
  { name: "quote-request.spec.ts", market: "DE", time: "5.0s", fails: true },
];
const rowStart = (i: number) => 450 + i * 400;
const ROW_RUN = 550;

function RunsScene({ t }: SceneProps) {
  const states: Status[] = RUN_ROWS.map((row, i) =>
    t < rowStart(i) ? "queued" : t < rowStart(i) + ROW_RUN ? "running" : row.fails ? "failed" : "passed",
  );
  const passed = 47 + states.filter((s) => s === "passed").length;
  const failed = states.includes("failed");
  const done = passed + (failed ? 1 : 0);

  return (
    <div className="cp-scene">
      <header className="cp-head">
        <div>
          <p className="cp-kicker">Run #2187 · Nightly · Chromium, WebKit</p>
          <p className="cp-title">Storefront release 24.11</p>
        </div>
        <div className="cp-head__meta">
          <span className="cp-pill">
            <span className="cp-live" /> 17 storefronts
          </span>
          <span className="cp-count" data-cursor="runs-count">
            <strong>{passed}</strong> / 55 passed
          </span>
          {failed && <span className="cp-pill cp-pill--fail cp-pop">1 failed</span>}
        </div>
      </header>
      <div className="cp-progress">
        <span style={{ transform: `scaleX(${done / 55})` }} data-failed={failed || undefined} />
      </div>
      <ul className="cp-rows">
        {RUN_ROWS.map((row, i) => (
          <li
            key={row.name}
            className="cp-row"
            data-state={states[i]}
            data-selected={(row.fails && after(t, 5250)) || undefined}
            data-cursor={`run-${i}`}
          >
            <StatusIcon state={states[i]} />
            <span className="cp-mono">{row.name}</span>
            <span className="cp-chip">{row.market}</span>
            <span className="cp-row__time">
              {states[i] === "queued" ? "queued" : states[i] === "running" ? "running" : row.time}
            </span>
          </li>
        ))}
      </ul>
      <p className="cp-foot">
        <GitBranch /> Triggered by GitHub Actions on main · HTML report, traces and videos attached
      </p>
      <Cursor
        t={t}
        path={[
          { at: 0, target: "runs-count" },
          { at: 4300, target: "run-7" },
          { at: 5100, target: "run-7", press: true },
        ]}
      />
    </div>
  );
}

/* 2 · Trace: the failed step, the page at failure, and the 500 behind it */

const TRACE_STEPS = [
  { code: "page.goto('/de/quote')", time: "0.4s" },
  { code: "fill('Part number', 'A-4434')", time: "0.2s" },
  { code: "click('Request quote')", time: "0.3s" },
  { code: "expect(confirmation).toBeVisible()", time: "5.0s", fails: true },
];
const NET_ROWS = [
  { method: "GET", path: "/de/quote", status: 200, at: 2100 },
  { method: "GET", path: "/api/session", status: 200, at: 2350 },
  { method: "POST", path: "/api/pricing", status: 500, at: 2600 },
];

function TraceScene({ t }: SceneProps) {
  return (
    <div className="cp-scene">
      <header className="cp-head">
        <div>
          <p className="cp-kicker">Trace · Run #2187</p>
          <p className="cp-title cp-title--mono" data-cursor="trace-title">
            quote-request.spec.ts
          </p>
        </div>
        <div className="cp-head__meta">
          <span className="cp-chip">DE storefront</span>
          <span className="cp-pill cp-pill--fail">Failed</span>
          {after(t, 4200) && (
            <span className="cp-btn cp-pop" data-cursor="ask-ai" data-pressed={pressing(t, 5700) || undefined}>
              <Sparkles /> Ask AI
            </span>
          )}
        </div>
      </header>
      <div className="cp-trace">
        <section className="cp-card">
          <p className="cp-card__label">Steps</p>
          <ol className="cp-steps">
            {TRACE_STEPS.map((step, i) =>
              after(t, 250 + i * 350) ? (
                <li key={step.code} className="cp-step cp-rise" data-cursor={`trace-step-${i}`} data-failed={step.fails || undefined}>
                  {step.fails ? <CircleX className="cp-status cp-status--failed" /> : <CircleCheck className="cp-status cp-status--passed" />}
                  <span className="cp-mono">{step.code}</span>
                  <span className="cp-row__time">{step.time}</span>
                  {step.fails && <span className="cp-step__error">Timed out after 5000ms waiting for the confirmation</span>}
                </li>
              ) : null,
            )}
          </ol>
        </section>
        <div className="cp-trace__side">
          <section className="cp-card cp-card--shot">
            <p className="cp-card__label">Page at failure</p>
            <div className="cp-shot">
              <div className="cp-shot__nav">
                <span />
                <span />
                <span />
              </div>
              <span className="cp-shot__title" />
              <span className="cp-shot__field" />
              <span className="cp-shot__field cp-shot__field--short" />
              <span className="cp-shot__button" />
              {after(t, 1900) && <span className="cp-shot__banner cp-pop">We couldn't price this item. Try again later.</span>}
            </div>
          </section>
          <section className="cp-card">
            <p className="cp-card__label">Network</p>
            <ul className="cp-net">
              {NET_ROWS.map((row, i) =>
                after(t, row.at) ? (
                  <li
                    key={row.path}
                    className="cp-net__row cp-rise"
                    data-cursor={`net-${i}`}
                    data-bad={row.status >= 500 || undefined}
                    data-pulse={(row.status >= 500 && after(t, 3000)) || undefined}
                    data-selected={(row.status >= 500 && after(t, 3850)) || undefined}
                  >
                    <span>{row.method}</span>
                    <span>{row.path}</span>
                    <span className="cp-net__code">{row.status}</span>
                  </li>
                ) : null,
              )}
            </ul>
          </section>
        </div>
      </div>
      <Cursor
        t={t}
        path={[
          { at: 0, target: "trace-title" },
          { at: 1700, target: "trace-step-3" },
          { at: 3000, target: "net-2" },
          { at: 3750, target: "net-2", press: true },
          { at: 4900, target: "ask-ai" },
          { at: 5650, target: "ask-ai", press: true },
        ]}
      />
    </div>
  );
}

/* 3 · AI assistant: ask why, get a root cause, draft the ticket */

const QUESTION = "Why did quote-request fail in DE?";
const ANSWER =
  "The pricing API returned 500 for DE only. The other 16 storefronts priced the same part, so this is DE pricing config, not a flaky test.";
const TYPE_START = 1000;
const SENT_AT = 3100;
const ANSWER_START = 3500;
const CHIPS_AT = 5700;

function AiScene({ t }: SceneProps) {
  const sent = after(t, SENT_AT);
  const draft = sent ? "" : typed(QUESTION, t, TYPE_START);
  const focused = after(t, 750) && !sent;
  const answer = streamed(ANSWER, t, ANSWER_START);
  const answering = sent && answer.length < ANSWER.length;

  return (
    <div className="cp-scene">
      <div className="cp-ai" data-sent={sent || undefined}>
        <p className="cp-ai__hello" data-cursor="ai-hello">
          <AppMark size="lg" /> Good afternoon, Cesar
        </p>

        {sent && (
          <div className="cp-convo">
            <p className="cp-msg cp-msg--user cp-rise">{QUESTION}</p>
            {after(t, ANSWER_START) && (
              <div className="cp-msg cp-msg--ai cp-rise">
                <span className="cp-msg__avatar">
                  <Sparkles />
                </span>
                <div>
                  <p>
                    {answer}
                    {answering && <span className="cp-caret" />}
                  </p>
                  {after(t, CHIPS_AT) && (
                    <div className="cp-msg__chips">
                      <span className="cp-chipbtn cp-pop">
                        <Activity /> Open trace
                      </span>
                      <span
                        className="cp-chipbtn cp-chipbtn--primary cp-pop"
                        data-cursor="ai-ticket"
                        data-pressed={pressing(t, 6900) || undefined}
                      >
                        <Ticket /> Draft Jira ticket
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="cp-input" data-focus={focused || undefined} data-cursor="ai-input">
          <p className="cp-input__text">
            {draft ? draft : !focused && <span className="cp-input__placeholder">Ask about a run, a trace or a ticket…</span>}
            {focused && <span className="cp-caret" />}
          </p>
          <div className="cp-input__tools">
            <Paperclip />
            <Mic className="cp-input__mic" />
            <span
              className="cp-send"
              data-ready={draft.length === QUESTION.length || undefined}
              data-pressed={pressing(t, 2950) || undefined}
              data-cursor="ai-send"
            >
              <ArrowUp />
            </span>
          </div>
        </div>

        {!sent && (
          <div className="cp-suggest">
            <span>What failed last night?</span>
            <span>Compare DE and US runs</span>
            <span>Summarize release 24.11</span>
          </div>
        )}
      </div>
      <Cursor
        t={t}
        path={[
          { at: 0, target: "ai-hello" },
          { at: 250, target: "ai-input" },
          { at: 700, target: "ai-input", press: true },
          { at: 2450, target: "ai-send" },
          { at: 2950, target: "ai-send", press: true },
          { at: 6200, target: "ai-ticket" },
          { at: 6900, target: "ai-ticket", press: true },
        ]}
      />
    </div>
  );
}

/* 4 · Ticket: the draft fills itself from the trace and gets filed */

const TICKET_TITLE = "Quote request fails in DE: pricing API returns 500";
const TICKET_STEPS = [
  "Open /de/quote as a B2B buyer",
  "Request a quote for any part number",
  "POST /api/pricing returns 500 and no confirmation shows",
];
const CREATE_AT = 4700;

function TicketScene({ t }: SceneProps) {
  const title = typed(TICKET_TITLE, t, 300, 24);
  const created = after(t, CREATE_AT + 150);

  return (
    <div className="cp-scene">
      <header className="cp-head">
        <div>
          <p className="cp-kicker">QA board · New ticket</p>
          <p className="cp-title">Report a bug</p>
        </div>
        <div className="cp-head__meta">
          <span className="cp-pill">
            <Sparkles className="cp-pill__icon" /> Drafted from the trace
          </span>
        </div>
      </header>
      <div className="cp-form">
        <div className="cp-field cp-field--wide">
          <span className="cp-field__label">Title</span>
          <p className="cp-field__box" data-cursor="ticket-title">
            {title}
            {title.length < TICKET_TITLE.length && <span className="cp-caret" />}
          </p>
        </div>
        <div className="cp-field">
          <span className="cp-field__label">Environment</span>
          <div className="cp-field__box cp-field__chips">
            {["DE storefront", "staging", "Chrome 131"].map((chip, i) =>
              after(t, 1700 + i * 150) ? (
                <span key={chip} className="cp-chip cp-pop">
                  {chip}
                </span>
              ) : null,
            )}
          </div>
        </div>
        <div className="cp-field">
          <span className="cp-field__label">Severity</span>
          <div className="cp-field__box cp-field__chips">
            {after(t, 2150) && <span className="cp-pill cp-pill--fail cp-pop">High · blocks quotes in DE</span>}
          </div>
        </div>
        <div className="cp-field">
          <span className="cp-field__label">Steps to reproduce</span>
          <ol className="cp-field__box cp-repro">
            {TICKET_STEPS.map((step, i) =>
              after(t, 2400 + i * 250) ? (
                <li key={step} className="cp-rise">
                  <span className="cp-repro__n">{i + 1}</span>
                  {step}
                </li>
              ) : null,
            )}
          </ol>
        </div>
        <div className="cp-field">
          <span className="cp-field__label">Evidence</span>
          <div className="cp-attachments">
            {after(t, 3200) && (
              <span className="cp-attach cp-pop">
                <FileArchive /> trace.zip <small>1.8 MB</small>
              </span>
            )}
            {after(t, 3450) && (
              <span className="cp-attach cp-pop">
                <Image /> screenshot.png <small>240 KB</small>
              </span>
            )}
          </div>
        </div>
        <div className="cp-form__foot">
          <span className="cp-btn cp-btn--quiet">Cancel</span>
          <span className="cp-btn" data-cursor="ticket-create" data-pressed={pressing(t, CREATE_AT) || undefined}>
            {created ? <Check /> : <Ticket />} {created ? "Created" : "Create ticket"}
          </span>
        </div>
      </div>
      {after(t, CREATE_AT + 250) && <Toast title="QA-1432 created" detail="Linked to run #2187 and its trace" />}
      <Cursor
        t={t}
        path={[
          { at: 0, target: "ticket-title" },
          { at: 3900, target: "ticket-create" },
          { at: CREATE_AT, target: "ticket-create", press: true },
        ]}
      />
    </div>
  );
}

/* 5 · Board: the bug lands in Blocked, a verified market moves to Passed */

type Card = { id: string; title: string; market: string; tag: string; bug?: boolean };

function KCard({ card, state, cursor }: { card: Card; state?: "hover" | "ghost" | "new"; cursor?: string }) {
  return (
    <div
      className={`cp-kcard${state === "new" ? " cp-kcard--new" : ""}`}
      data-hover={state === "hover" || undefined}
      data-ghost={state === "ghost" || undefined}
      data-bug={card.bug || undefined}
      data-cursor={cursor}
    >
      <p className="cp-kcard__title">{card.title}</p>
      <div className="cp-kcard__meta">
        <span className="cp-chip">{card.market}</span>
        <span>{card.tag}</span>
        {state === "new" && <CircleCheck className="cp-kcard__tick" />}
      </div>
    </div>
  );
}

const BUG: Card = { id: "bug", title: "QA-1432 · Quote request fails", market: "DE", tag: "Bug", bug: true };
const MOVING: Card = { id: "mx", title: "Checkout", market: "MX", tag: "B2C" };
const PICK_AT = 2200;
const DROP_AT = 3400;

function BoardScene({ t }: SceneProps) {
  const carrying = after(t, PICK_AT) && !after(t, DROP_AT);
  const dropped = after(t, DROP_AT);
  const columns: { id: string; name: string; tone: string; cards: React.ReactNode[] }[] = [
    {
      id: "todo",
      name: "To test",
      tone: "muted",
      cards: [
        <KCard key="jp" card={{ id: "jp", title: "Search", market: "JP", tag: "B2C" }} />,
        <KCard key="ca" card={{ id: "ca", title: "Account settings", market: "CA", tag: "B2B" }} />,
      ],
    },
    {
      id: "doing",
      name: "In progress",
      tone: "accent",
      cards: [
        !dropped && (
          <KCard
            key="mx"
            card={MOVING}
            cursor="card-mx"
            state={carrying ? "ghost" : after(t, 1500) ? "hover" : undefined}
          />
        ),
        <KCard key="uk" card={{ id: "uk", title: "Quick order", market: "UK", tag: "B2B" }} />,
      ],
    },
    {
      id: "blocked",
      name: "Blocked",
      tone: "error",
      cards: [after(t, 450) && <KCard key="bug" card={BUG} state="new" cursor="card-bug" />],
    },
    {
      id: "passed",
      name: "Passed",
      tone: "success",
      cards: [
        <span key="slot" className="cp-slot" data-open={carrying || undefined} data-cursor="passed-slot" />,
        dropped && <KCard key="mx" card={MOVING} state="new" />,
        <KCard key="us" card={{ id: "us", title: "Login", market: "US", tag: "B2B" }} />,
        <KCard key="fr" card={{ id: "fr", title: "Cart", market: "FR", tag: "B2C" }} />,
        <KCard key="pu" card={{ id: "pu", title: "PunchOut", market: "US", tag: "B2B" }} />,
      ],
    },
  ];

  return (
    <div className="cp-scene">
      <header className="cp-head">
        <div>
          <p className="cp-kicker">Board · Storefront release 24.11</p>
          <p className="cp-title">Release readiness</p>
        </div>
        <div className="cp-head__meta">
          <span className="cp-pill">
            <span className="cp-live" /> 17 storefronts
          </span>
        </div>
      </header>
      <div className="cp-board">
        {columns.map((col) => (
          <section key={col.id} className="cp-col" data-cursor={`col-${col.id}`}>
            <p className="cp-col__head">
              <span className="cp-col__dot" data-tone={col.tone} />
              {col.name}
              <span className="cp-col__count">{col.cards.filter((c) => c && (c as React.ReactElement).type === KCard).length}</span>
            </p>
            {col.cards}
          </section>
        ))}
      </div>
      {after(t, DROP_AT + 250) && <Toast title="Checkout · MX moved to Passed" detail="All checks green on the MX storefront" />}
      <Cursor
        t={t}
        path={[
          { at: 0, target: "col-blocked" },
          { at: 1500, target: "card-mx" },
          { at: PICK_AT, target: "card-mx", press: true },
          { at: 2500, target: "passed-slot" },
          { at: DROP_AT, target: "passed-slot", press: true },
        ]}
        carry={{ from: PICK_AT, to: DROP_AT, node: <KCard card={MOVING} /> }}
      />
    </div>
  );
}

/* Scene list and sidebar */

export type SceneDef = {
  id: string;
  label: string;
  nav: string;
  icon: LucideIcon;
  duration: number;
  /** The frame shown when motion is reduced. */
  still: number;
  description: string;
  Scene: (props: SceneProps) => React.ReactElement;
};

export const SCENES: SceneDef[] = [
  {
    id: "runs",
    label: "Runs",
    nav: "Runs",
    icon: ListChecks,
    duration: 7000,
    still: 7000,
    description: "A nightly run of 55 Playwright specs across 17 storefronts: 54 pass and the quote request spec fails on the German storefront.",
    Scene: RunsScene,
  },
  {
    id: "trace",
    label: "Trace",
    nav: "Trace",
    icon: Activity,
    duration: 7000,
    still: 6000,
    description: "The trace of the failed spec: the confirmation never appears, the page shows a pricing error, and the pricing API returned a 500.",
    Scene: TraceScene,
  },
  {
    id: "ai",
    label: "AI assistant",
    nav: "AI assistant",
    icon: Sparkles,
    duration: 8000,
    still: 7400,
    description: "Asked why the spec failed in Germany, the assistant points to German pricing configuration rather than a flaky test and offers to draft a ticket.",
    Scene: AiScene,
  },
  {
    id: "ticket",
    label: "Ticket",
    nav: "Tickets",
    icon: Ticket,
    duration: 7000,
    still: 6000,
    description: "A bug ticket fills in from the trace with steps and evidence, and is created as QA-1432.",
    Scene: TicketScene,
  },
  {
    id: "board",
    label: "Board",
    nav: "Board",
    icon: SquareKanban,
    duration: 7500,
    still: 5000,
    description: "On the release board the new bug sits in Blocked, and the Mexico checkout moves to Passed.",
    Scene: BoardScene,
  },
];

const PROJECTS = [
  { name: "Storefronts", count: "17", tone: "accent" },
  { name: "B2B", tone: "success" },
  { name: "B2C", tone: "accent-2" },
];

export function Sidebar({ active }: { active: string }) {
  return (
    <aside className="cp-side">
      <p className="cp-brand">
        <AppMark />
        Checkpoint
        <PanelLeft className="cp-brand__toggle" />
      </p>
      <p className="cp-search">
        <Search /> Search <kbd>/</kbd>
      </p>
      <ul className="cp-nav">
        {SCENES.map((s) => {
          const Icon = s.icon;
          return (
            <li key={s.id} className="cp-nav__item" data-active={s.id === active || undefined}>
              <Icon />
              {s.nav}
              {s.id === "runs" && <span className="cp-nav__badge">55</span>}
            </li>
          );
        })}
      </ul>
      <p className="cp-side__label">Projects</p>
      <ul className="cp-nav">
        {PROJECTS.map((p) => (
          <li key={p.name} className="cp-nav__item">
            <span className="cp-nav__hash">#</span>
            {p.name}
            {p.count && <span className="cp-nav__badge">{p.count}</span>}
            <span className="cp-nav__dot" data-tone={p.tone} />
          </li>
        ))}
      </ul>
      <p className="cp-user">
        <span className="cp-avatar">CG</span>
        Cesar G.
        <Bell className="cp-user__bell" />
      </p>
    </aside>
  );
}
