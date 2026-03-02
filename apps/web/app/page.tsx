"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

// ── JSON-LD Schema ──────────────────────────────────────────────────────────

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sync Automations",
  url: "https://sync-automations.com",
  logo: "https://sync-automations.com/logo.png",
  description:
    "An AI-powered unified coordination system providing high-end agencies with end-to-end operational visibility.",
  sameAs: [
    "https://twitter.com/syncautomations",
    "https://linkedin.com/company/syncautomations",
  ],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Sync Automations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sync Automations is an AI-powered unified coordination system that eliminates revenue leakage caused by manual coordination.",
      },
    },
    {
      "@type": "Question",
      name: "How does the post-call automation work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After every strategy call, our system transcribes decisions, structures action items into Notion, and fires Slack notifications to owners — all within minutes of the call ending.",
      },
    },
  ],
};

// ── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const contactRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["how-it-works", "case-studies", "stack", "contact"];
      let currentSection = "";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if the section is currently in the upper half of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 100) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      {/* ── Navigation ───────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/60 backdrop-blur-md border-b border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center font-bold text-white text-sm">
              S
            </div>
            <span className="font-semibold text-lg tracking-wide text-gray-900 dark:text-white">
              Sync Automations
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600 dark:text-gray-300">
            <a
              href="#how-it-works"
              className={`transition-colors font-medium ${activeSection === "how-it-works" ? "text-primary dark:text-primary" : "hover:text-primary dark:hover:text-white"}`}
            >
              How It Works
            </a>
            <a
              href="#case-studies"
              className={`transition-colors font-medium ${activeSection === "case-studies" ? "text-primary dark:text-primary" : "hover:text-primary dark:hover:text-white"}`}
            >
              Case Studies
            </a>
            <a
              href="#stack"
              className={`transition-colors font-medium ${activeSection === "stack" ? "text-primary dark:text-primary" : "hover:text-primary dark:hover:text-white"}`}
            >
              Stack
            </a>
            <ThemeToggle />
            <button
              onClick={scrollToContact}
              className="btn-primary rounded-full px-6 py-2.5 text-xs font-bold tracking-widest uppercase text-white"
            >
              Claim Revenue Audit
            </button>
          </div>
        </div>
      </nav>

      <main className="flex min-h-screen flex-col items-center pt-28 pb-24 overflow-hidden">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="w-full max-w-7xl mx-auto px-6 pt-12 pb-20 relative z-10">
          {/* Ambient glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
          <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full bg-primary-dark/10 blur-[100px] pointer-events-none" />

          <div className="text-center mb-6">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary border border-primary/30 rounded-full px-4 py-1.5 bg-primary/5">
              AI-Powered Revenue Operations
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-center max-w-5xl mx-auto mb-6 text-gray-900 dark:text-white">
            WE STOP REVENUE LEAKAGE CAUSED BY{" "}
            <span className="text-gradient">MANUAL COORDINATION.</span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-center leading-relaxed mb-10">
            Eliminate costly human errors, missed deadlines, and billing
            discrepancies. We integrate your data sources and provide a single,
            prioritized review stream — ensuring a human always makes the final
            call before critical business actions.
          </p>

          <div className="flex justify-center mb-16">
            <button
              onClick={scrollToContact}
              id="hero-cta"
              className="btn-primary rounded-full px-10 py-5 text-base font-bold shadow-[0_0_40px_rgba(0,184,255,0.3)] hover:shadow-[0_0_60px_rgba(0,184,255,0.5)] transition-all duration-300 uppercase tracking-widest"
            >
              Claim Your Custom Revenue Leakage Audit →
            </button>
          </div>

          {/* Hero diagram */}
          <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,184,255,0.08)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary-dark/5 z-10" />
            <Image
              src="/hero-flow.png"
              alt="AI flow: data sources → AI chip → human approval → revenue outputs"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </section>

        {/* ── Problem Section ───────────────────────────────────────────────── */}
        <section
          id="how-it-works"
          className="w-full max-w-7xl mx-auto px-6 mt-8 z-10"
        >
          <p className="text-center text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">
            The Problem
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-3">
            YOU ARE PAYING SMART PEOPLE
          </h2>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14 text-gradient">
            TO DO ROBOT WORK.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-8 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wide mb-3 text-gray-900 dark:text-white">
                Overlooked Discrepancies.
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Missed billable hours, incorrect customer-tiered pricing, and
                invoicing errors are silently draining your margins — undetected
                until the quarter closes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-8 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wide mb-3 text-gray-900 dark:text-white">
                Siloed Decision-Making.
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Critical business steps stall when key information is locked in
                one person's inbox or Slack thread, causing cascading delays and
                lost opportunities.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-8 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wide mb-3 text-gray-900 dark:text-white">
                Unprioritized Task Delays.
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Urgent revenue-generating actions are buried in the noise of
                daily admin tasks, leading to poor customer satisfaction and
                reduced lifetime value.
              </p>
            </div>
          </div>
        </section>

        {/* ── Engine Section ────────────────────────────────────────────────── */}
        <section className="w-full max-w-7xl mx-auto px-6 mt-32 z-10">
          <p className="text-center text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">
            The Solution
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-16">
            THE UNIFIED COORDINATION &amp; DECISION ENGINE.
          </h2>

          <div className="grid md:grid-cols-3 gap-0 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20 z-0" />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center p-8">
              <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6 shadow-[0_0_30px_rgba(0,184,255,0.15)]">
                <svg
                  className="w-9 h-9"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">
                Unify &amp; Ingest.
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                We automatically harvest critical business signals and event
                data from across your entire stack — Slack, Notion, CRM, ERP,
                calendar, and invoicing tools.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center p-8">
              <div className="w-20 h-20 rounded-full bg-primary-dark/10 border border-primary-dark/30 flex items-center justify-center text-purple-400 mb-6 shadow-[0_0_30px_rgba(138,43,226,0.15)]">
                <svg
                  className="w-9 h-9"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400 mb-3">
                Prioritize &amp; Pre-Process.
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our AI cross-references data, flags discrepancies, and presents
                a prioritized list for review — with suggested actions and full
                context attached.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center p-8">
              <div className="w-20 h-20 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary mb-6 shadow-[0_0_30px_rgba(0,255,157,0.15)]">
                <svg
                  className="w-9 h-9"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-3">
                Human-Led Execution.
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                A human reviews and approves all high-stakes actions, which are
                then instantly executed across connected platforms — no
                copy-paste, no missed steps.
              </p>
            </div>
          </div>
        </section>

        {/* ── Economics Section ─────────────────────────────────────────────── */}
        <section className="w-full max-w-7xl mx-auto px-6 mt-32 z-10">
          <p className="text-center text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">
            The Numbers
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-4">
            THE AGENCY ECONOMICS OF AUTOMATION.
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-500 text-sm mb-14">
            Industry data proves manual data entry drains margin.
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Chart visual */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
              <div className="px-6 pt-6 pb-2">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                  The Economics of Coordination
                </p>
              </div>
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src="/economics-chart.png"
                  alt="Bar chart showing coordination hours drop from 40/month to 3/month"
                  fill
                  className="object-contain object-center"
                />
              </div>
            </div>

            {/* Stats + quote */}
            <div className="flex flex-col gap-6">
              <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
                  The Coordination Drain
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  Manual coordination and human error cost businesses{" "}
                  <span className="text-gray-900 dark:text-white font-semibold">
                    $399 billion annually
                  </span>{" "}
                  in lost productive hours. Our structured, AI-assisted,
                  human-approved workflow can reclaim{" "}
                  <span className="text-primary font-semibold">
                    20% or more of lost revenue
                  </span>
                  . Citing data from Doodle State of Meetings, McKinsey &amp;
                  Co., and Asana Anatomy of Work.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-2xl font-extrabold text-primary">28%</p>
                    <p className="text-xs text-gray-500 mt-1">
                      of workday spent on coordination (McKinsey)
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-primary">9+</p>
                    <p className="text-xs text-gray-500 mt-1">
                      apps switched daily per employee (Asana)
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-primary">71%</p>
                    <p className="text-xs text-gray-500 mt-1">
                      of meetings have no clear follow-up action (Doodle)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic mb-4">
                  "The biggest risk to our margin was not competition, but our
                  own internal speed and accuracy. A system that gives us
                  confidence that every decision is backed by perfect data, yet
                  led by our best judgment."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                    C
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Agency COO
                    </p>
                    <p className="text-xs text-gray-500">
                      8-figure Digital Agency
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Case Studies ──────────────────────────────────────────────────── */}
        <section
          id="case-studies"
          className="w-full max-w-7xl mx-auto px-6 mt-32 z-10"
        >
          <p className="text-center text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">
            Case Studies
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-4">
            POST-STRATEGY CALL AUTOMATION.
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm max-w-2xl mx-auto mb-16">
            After every strategy call, our system transcribes decisions,
            structures action items into Notion, and fires Slack notifications
            to owners — all within minutes. The scenarios below are built on
            real market patterns.
          </p>

          {/* Automation flow diagram */}
          <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 mb-20 shadow-[0_0_60px_rgba(138,43,226,0.08)] bg-[#0a0f1a]">
            <Image
              src="/automation-flow.png"
              alt="Post-call automation flow: meeting → AI → Notion tasks + Slack alerts"
              width={1200}
              height={600}
              className="w-full h-auto block"
              style={{ display: "block" }}
            />
          </div>

          {/* Case study cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Case 1 */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-7 flex flex-col hover:border-primary/20 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                  01
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Digital Marketing Agency
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                4 Hours of Post-Call Admin → Zero.
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1">
                <strong className="text-gray-900 dark:text-gray-300">
                  The Problem:
                </strong>{" "}
                After every weekly strategy call with clients, account managers
                spent 3–4 hours manually writing up meeting notes, creating
                Notion tasks, and pinging team members on Slack about decisions
                made. Context was regularly lost between calls.
              </p>
              <div className="mt-5 pt-5 border-t border-gray-200 dark:border-white/5 space-y-2">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  <strong className="text-gray-900 dark:text-gray-300">
                    The Automation:
                  </strong>{" "}
                  Post-call, our system ingests the transcript, identifies
                  decisions and owners, creates structured task rows in Notion
                  with deadlines, and sends formatted Slack DMs to each task
                  owner — automatically.
                </p>
                <div className="flex flex-wrap gap-2 pt-3">
                  <span className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1">
                    Notion API
                  </span>
                  <span className="text-xs bg-purple-500/10 text-purple-400 rounded-full px-3 py-1">
                    Slack API
                  </span>
                  <span className="text-xs bg-green-500/10 text-green-400 rounded-full px-3 py-1">
                    OpenAI
                  </span>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-xl font-extrabold text-primary">92%</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Reduction in admin hours
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-xl font-extrabold text-secondary">
                    &lt;5 min
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    From call end to tasks live
                  </p>
                </div>
              </div>
            </div>

            {/* Case 2 */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-7 flex flex-col hover:border-primary/20 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 text-xs font-bold">
                  02
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                  Product Dev Studio
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Sprint Decisions That Actually Stick.
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1">
                <strong className="text-gray-900 dark:text-gray-300">
                  The Problem:
                </strong>{" "}
                Sprint planning calls produced concrete decisions — scope
                changes, feature prioritisations, deadline adjustments — that
                evaporated into Slack threads. Two weeks later, no one could
                agree on what was decided, causing re-work.
              </p>
              <div className="mt-5 pt-5 border-t border-gray-200 dark:border-white/5 space-y-2">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  <strong className="text-gray-900 dark:text-gray-300">
                    The Automation:
                  </strong>{" "}
                  Every sprint call generates a structured Notion decision log
                  with linked action items and owners. Slack broadcasts an
                  instant summary to the dev channel. Decision drift eliminated.
                </p>
                <div className="flex flex-wrap gap-2 pt-3">
                  <span className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1">
                    Notion API
                  </span>
                  <span className="text-xs bg-purple-500/10 text-purple-400 rounded-full px-3 py-1">
                    Slack API
                  </span>
                  <span className="text-xs bg-green-500/10 text-green-400 rounded-full px-3 py-1">
                    OpenAI
                  </span>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-xl font-extrabold text-primary">0</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Missed decisions per sprint
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-xl font-extrabold text-secondary">3×</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Faster task accountability
                  </p>
                </div>
              </div>
            </div>

            {/* Case 3 */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-7 flex flex-col hover:border-primary/20 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary text-xs font-bold">
                  03
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                  B2B Ops Consultancy
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Client Billing Leakage Closed at the Source.
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1">
                <strong className="text-gray-900 dark:text-gray-300">
                  The Problem:
                </strong>{" "}
                Scope changes verbally agreed on client calls were never
                captured in the CRM or invoicing system. According to Harvest's
                2023 Time Tracking Report, 67% of freelancers and agencies
                under-bill by an average of 11% per project due to untracked
                scope changes.
              </p>
              <div className="mt-5 pt-5 border-t border-gray-200 dark:border-white/5 space-y-2">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  <strong className="text-gray-900 dark:text-gray-300">
                    The Automation:
                  </strong>{" "}
                  When a scope change is detected in a call transcript, Sync
                  Automations creates a Notion change-order record, alerts the
                  account lead on Slack, and queues a CRM update — all pending
                  one human approval click.
                </p>
                <div className="flex flex-wrap gap-2 pt-3">
                  <span className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1">
                    Notion API
                  </span>
                  <span className="text-xs bg-purple-500/10 text-purple-400 rounded-full px-3 py-1">
                    Slack API
                  </span>
                  <span className="text-xs bg-orange-500/10 text-orange-400 rounded-full px-3 py-1">
                    CRM Integration
                  </span>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-xl font-extrabold text-primary">11%</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Revenue recaptured per project
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-xl font-extrabold text-secondary">100%</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Human-approved before billing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Long-form Content ─────────────────────────────────────────────── */}
        <section className="w-full max-w-4xl mx-auto px-6 mt-32 text-gray-700 dark:text-gray-300 space-y-8 z-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            The True Cost of Manual Coordination
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Backed by McKinsey, Asana, Harvard Business Review, and Doodle
            research.
          </p>
          <p className="leading-relaxed">
            In modern enterprises and high-end agencies, operational sprawl is
            the silent killer of profitability. Teams adopt specialized tools
            for specific functions: CRM for sales, ERP for resource planning,
            Slack for communication, and dedicated platforms for invoicing.
            However, the manual effort required to synchronize data across these
            disparate systems introduces a severe vulnerability known as revenue
            leakage.
          </p>
          <p className="leading-relaxed">
            When humans are responsible for copying data, updating statuses
            across multiple platforms, and ensuring that billable hours are
            accurately captured from project management tools into financial
            systems, errors are inevitable. According to McKinsey Global
            Institute, knowledge workers spend nearly{" "}
            <strong className="text-gray-900 dark:text-white">
              28% of their workday managing email and coordination tasks
            </strong>{" "}
            — work that could be entirely automated.
          </p>

          <div className="space-y-6 pt-4">
            <div className="p-6 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-primary font-bold mb-2">
                The Problem: Disconnected Silos
              </h4>
              <p className="text-sm leading-relaxed">
                Project managers spend nearly 30% of their day updating
                dashboards, translating Slack requests into Notion tickets, and
                manually verifying that invoiced amounts match delivered value.
                This fragmentation leads to delayed billing cycles, uncaptured
                out-of-scope work, and ultimately, a reduced bottom line.
                Doodle's State of Meetings report found that 71% of meetings
                have no defined follow-up action — meaning decisions evaporate
                the moment the call ends.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-secondary font-bold mb-2">
                The Solution: Unified AI Orchestration
              </h4>
              <p className="text-sm leading-relaxed">
                Sync Automations deploys a centralized processing engine that
                continuously monitors operational activity. When a scope change
                is discussed on a strategy call, our system detects the intent,
                drafts a structured Notion task with the decision owner and
                deadline assigned, fires a Slack notification to the relevant
                person, and queues a CRM or invoice adjustment — all while
                pausing for human approval at every critical juncture.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
              <h4 className="text-gray-900 dark:text-white font-bold mb-2">
                The Outcome: Exponential Revenue Growth
              </h4>
              <p className="text-sm leading-relaxed">
                By automating the connective tissue of your business, leadership
                gains unprecedented visibility into true operational velocity.
                Margins improve inherently as previously unbilled hours are
                automatically surfaced and captured. The human element is
                elevated from tedious data-entry operators to strategic
                decision-makers, validating AI-proposed actions rather than
                executing them from scratch.
              </p>
            </div>
          </div>
        </section>

        {/* ── Tech Stack ────────────────────────────────────────────────────── */}
        <section
          id="stack"
          className="w-full max-w-7xl mx-auto px-6 mt-32 z-10"
        >
          <p className="text-center text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">
            Tech Stack
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-4">
            BUILT ON THE TOOLS YOU ALREADY TRUST.
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-500 text-sm mb-14 max-w-2xl mx-auto">
            Native integrations with the CRMs, communication platforms, and
            automation tools your team uses every day — no migration required.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                category: "CRM & Sales",
                color: "text-blue-400",
                accent: "bg-blue-400",
                border: "border-blue-500/20",
                pillBg: "bg-blue-500/10",
                items: [
                  "HubSpot",
                  "Salesforce",
                  "Pipedrive",
                  "Zoho CRM",
                  "Close.io",
                  "Attio",
                ],
              },
              {
                category: "Communication",
                color: "text-purple-400",
                accent: "bg-purple-400",
                border: "border-purple-500/20",
                pillBg: "bg-purple-500/10",
                items: [
                  "Slack API",
                  "Microsoft Teams",
                  "Gmail API",
                  "Outlook API",
                  "Intercom",
                ],
              },
              {
                category: "Project & Docs",
                color: "text-cyan-400",
                accent: "bg-cyan-400",
                border: "border-cyan-500/20",
                pillBg: "bg-cyan-500/10",
                items: [
                  "Notion API",
                  "Asana",
                  "ClickUp",
                  "Linear",
                  "Jira",
                  "Monday.com",
                ],
              },
              {
                category: "AI & Intelligence",
                color: "text-green-400",
                accent: "bg-green-400",
                border: "border-green-500/20",
                pillBg: "bg-green-500/10",
                items: [
                  "OpenAI GPT-4o",
                  "Whisper API",
                  "Anthropic Claude",
                  "LangChain",
                ],
              },
              {
                category: "Automation",
                color: "text-orange-400",
                accent: "bg-orange-400",
                border: "border-orange-500/20",
                pillBg: "bg-orange-500/10",
                items: [
                  "Zapier",
                  "Make (Integromat)",
                  "n8n",
                  "Webhooks",
                  "REST APIs",
                ],
              },
              {
                category: "Frontend",
                color: "text-pink-400",
                accent: "bg-pink-400",
                border: "border-pink-500/20",
                pillBg: "bg-pink-500/10",
                items: [
                  "Next.js 16",
                  "React 18",
                  "TypeScript",
                  "Tailwind CSS",
                  "next-themes",
                ],
              },
              {
                category: "Backend & Infra",
                color: "text-emerald-400",
                accent: "bg-emerald-400",
                border: "border-emerald-500/20",
                pillBg: "bg-emerald-500/10",
                items: [
                  "Node.js",
                  "Nodemailer",
                  "Zod",
                  "Helmet.js",
                  "Vercel Serverless",
                ],
              },
              {
                category: "DevOps & Testing",
                color: "text-yellow-400",
                accent: "bg-yellow-400",
                border: "border-yellow-500/20",
                pillBg: "bg-yellow-500/10",
                items: [
                  "Turborepo",
                  "pnpm Workspaces",
                  "Playwright",
                  "Jest",
                  "GitHub Actions",
                ],
              },
            ].map((group) => (
              <div
                key={group.category}
                className={`relative bg-[var(--card-bg)] border ${group.border} rounded-xl p-5 hover:border-opacity-60 transition-all duration-300 overflow-hidden`}
              >
                {/* Colored top accent bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 ${group.accent} opacity-60`}
                />
                <p
                  className={`text-xs font-bold uppercase tracking-widest ${group.color} mb-4`}
                >
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full ${group.pillBg} ${group.color} border ${group.border}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact / CTA ─────────────────────────────────────────────────── */}
        <section
          id="contact"
          ref={contactRef}
          className="w-full max-w-3xl mx-auto px-6 mt-32 z-10"
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/10 p-10 md:p-14 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-dark/5 pointer-events-none" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-primary/8 blur-[100px] pointer-events-none" />

            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3 relative z-10">
              READY TO SECURE YOUR
            </h2>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gradient mb-4 relative z-10">
              REVENUE? LET'S TALK.
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 text-sm relative z-10">
              End the chaos of manual coordination today. Tell us where you're
              leaking.
            </p>

            {isSuccess ? (
              <div className="relative z-10 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-10 flex flex-col items-center justify-center animate-in fade-in duration-500 shadow-[0_0_40px_rgba(0,184,255,0.05)]">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6 shadow-[0_0_30px_rgba(0,184,255,0.3)] border border-primary/30">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                  Audit Request Received
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm text-center leading-relaxed max-w-sm">
                  Your secure revenue audit request has been logged. Our
                  operations team will process your details and follow up
                  directly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 text-xs text-primary hover:text-gray-900 dark:hover:text-white transition-colors uppercase tracking-widest font-semibold border-b border-primary/30 pb-1 hover:border-gray-900 dark:hover:border-white"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form
                className="flex flex-col gap-4 text-left relative z-10"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  setErrorMsg("");

                  const formData = new FormData(e.currentTarget);
                  const data = {
                    name: formData.get("name"),
                    email: formData.get("email"),
                    leakSource: formData.get("leakSource"),
                    message: formData.get("message"),
                  };

                  if (!data.leakSource) {
                    setErrorMsg("Please select a primary leakage area.");
                    setIsSubmitting(false);
                    return;
                  }

                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(data),
                    });

                    if (res.ok) {
                      setIsSuccess(true);
                      (e.target as HTMLFormElement).reset();
                    } else {
                      const errorData = await res.json().catch(() => ({}));
                      setErrorMsg(
                        errorData.error ||
                          "Failed to submit request. Please try again or reach out directly.",
                      );
                    }
                  } catch (err) {
                    console.error("Submission error:", err);
                    setErrorMsg(
                      "A network error occurred. Please check your connection and try again.",
                    );
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                {errorMsg && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium tracking-wide p-4 rounded-lg text-center">
                    {errorMsg}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    name="name"
                    required
                    placeholder="Your Name"
                    className="bg-gray-100 dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-lg p-4 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Work Email"
                    className="bg-gray-100 dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-lg p-4 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest pt-1">
                  Where do you think your manual coordination is leaking the
                  most?
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Invoicing Errors",
                    "Missed Deadlines",
                    "Incorrect Data",
                    "Other",
                  ].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="leakSource"
                        value={opt}
                        className="accent-primary"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>

                <textarea
                  name="message"
                  placeholder="Anything else we should know? (optional)"
                  rows={3}
                  className="bg-gray-100 dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-lg p-4 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="contact-submit"
                  className="btn-primary rounded-lg py-4 text-sm font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(0,184,255,0.25)] hover:shadow-[0_0_50px_rgba(0,184,255,0.45)] transition-all duration-300 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing Secure Request...
                    </>
                  ) : (
                    "Claim Your Custom Solution →"
                  )}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <footer className="w-full max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-600 z-10">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center font-bold text-white text-[10px]">
              S
            </div>
            <span>Sync Automations © {new Date().getFullYear()}</span>
          </div>
          <p>
            AI-Powered Revenue Operations · Built for High-Performance Agencies
          </p>
        </footer>
      </main>
    </>
  );
}
