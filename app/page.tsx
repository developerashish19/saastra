"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  CircuitBoard,
  Bot,
  Bus,
  Utensils,
  Calendar,
  Building2,
  BarChart3,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  ChevronUp,
} from "lucide-react";

/**
 * Saastra – Home Page UI (Next.js App Router)
 * --------------------------------------------------------------
 * Drop this file into: /app/page.tsx
 * TailwindCSS recommended. Uses framer-motion + lucide-react.
 * All links and images are placeholders – replace with real routes.
 */

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "Development", href: "#development" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  // Dark mode: sync with document root + localStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("saastra-theme");
    const isDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("saastra-theme", next ? "dark" : "light");
  };

  // For smooth scroll on in-page anchors
  useEffect(() => {
    if (!mounted) return;
    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A") {
        const href = (target as HTMLAnchorElement).getAttribute("href");
        if (href?.startsWith("#")) {
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
          setMenuOpen(false);
        }
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [mounted]);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} dark={dark} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <TrustBar />
        <Features />
        <Products />
        <Development />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
    </div>
  );
}

// ------------------------------- Header -------------------------------
function Header({
  menuOpen,
  setMenuOpen,
  dark,
  toggleTheme,
}: {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  dark: boolean;
  toggleTheme: () => void;
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="group inline-flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="text-xl font-bold tracking-tight">Saastra</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-slate-900"
          >
            Get Started
          </a>
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="ml-1 rounded-xl border border-slate-200 px-3 py-2 text-sm transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
          >
            {dark ? "🌙" : "☀️"}
          </button>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
          >
            {dark ? "🌙" : "☀️"}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
            className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="py-1 text-sm font-medium">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-900">
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 opacity-80 blur-[6px]" />
      <span className="relative grid h-full w-full place-items-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
        <BookOpen className="h-5 w-5" />
      </span>
      <CircuitBoard className="-ml-1 h-4 w-4 text-cyan-500" />
    </span>
  );
}

// ------------------------------- Hero -------------------------------
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1250px_650px_at_50%_-200px,rgba(56,189,248,0.25),rgba(255,255,255,0))] dark:bg-[radial-gradient(1250px_650px_at_50%_-200px,rgba(56,189,248,0.12),rgba(2,6,23,0))]" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
              <Sparkles className="h-3.5 w-3.5" /> New: Unified SaaS suite for institutions
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Saastra – <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Smarter Software, Simplified.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
              All-in-one platform for hostel & mess management, events, transport, and AI chat. Buy our products or hire us to build your custom SaaS – the choice is yours.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#products" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-slate-900">
                Explore Products <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#development" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900">
                Request Development
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> SOC2-ready practices</div>
              <div className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> Razorpay/Stripe billing</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative mx-auto aspect-video w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 shadow-2xl dark:border-slate-800">
              {/* Placeholder hero mock – replace with product screenshots */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20" />
              <div className="relative grid h-full w-full place-items-center bg-slate-50 dark:bg-slate-900">
                <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3">
                  {[
                    { Icon: Building2, label: "Hostel" },
                    { Icon: Utensils, label: "Mess" },
                    { Icon: Calendar, label: "Events" },
                    { Icon: Bus, label: "Transport" },
                    { Icon: Bot, label: "AI Chat" },
                    { Icon: BarChart3, label: "Analytics" },
                  ].map(({ Icon, label }) => (
                    <div key={label} className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                      <Icon className="h-6 w-6" />
                      <span className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-300">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ------------------------------- Trust Bar -------------------------------
function TrustBar() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/60 dark:border-slate-900 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">Built with security-first practices • 99.9% uptime target • Privacy by design</p>
      </div>
    </section>
  );
}

// ------------------------------- Features -------------------------------
function Features() {
  const items = [
    { Icon: Building2, title: "Hostel Management", desc: "Room allocation, attendance, billing, complaints." },
    { Icon: Utensils, title: "Mess Management", desc: "Meal plans, couponing, payments, wastage analytics." },
    { Icon: Calendar, title: "Event Suite", desc: "Registration, ticketing, scheduling, announcements." },
    { Icon: Bus, title: "Transport / TTC", desc: "Routes, seat booking, GPS & route optimization." },
    { Icon: Bot, title: "AI Chat", desc: "24/7 support, FAQs, multilingual, WhatsApp integration." },
    { Icon: BarChart3, title: "Analytics", desc: "Dashboards, reports, and insights for admins." },
  ];

  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything institutions need</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Modular tools that work brilliantly alone and even better together.</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ Icon, title, desc }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ------------------------------- Products -------------------------------
function Products() {
  const products = [
    {
      name: "Hostel Management",
      icon: Building2,
      features: ["Room & bed allocation", "Attendance & entry/exit", "Fees, invoices & receipts", "Complaints & maintenance"],
    },
    {
      name: "Mess Management",
      icon: Utensils,
      features: ["Meal planning & coupons", "Payments & wallets", "Wastage prediction (AI)", "Daily reports"],
    },
    {
      name: "Event Suite",
      icon: Calendar,
      features: ["Registration & ticketing", "Agenda & speakers", "Email/WhatsApp alerts", "Check-in QR"],
    },
    {
      name: "Transport / TTC",
      icon: Bus,
      features: ["Routes & seat booking", "GPS & live location", "Driver app (soon)", "Parent notifications"],
    },
    {
      name: "AI Chat Assistant",
      icon: Bot,
      features: ["FAQ + 24/7 support", "WhatsApp & web widget", "Knowledge-base ingestion", "Multi-language"],
    },
  ];

  return (
    <section id="products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Products you can use today</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Pick a module or bundle the full suite. Free demos available.</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold">{p.name}</h3>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-slate-900">
                Book a Demo <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#pricing" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900">
                Pricing
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ------------------------------- Custom Development -------------------------------
function Development() {
  const steps = [
    { Icon: MessageSquare, title: "Consult", desc: "Understand goals, users and scope." },
    { Icon: BookOpen, title: "Design", desc: "Wireframes, UI kit & architecture." },
    { Icon: CircuitBoard, title: "Build", desc: "Agile sprints, clean code & tests." },
    { Icon: ShieldCheck, title: "Launch", desc: "Deploy, secure & monitor." },
    { Icon: BarChart3, title: "Scale", desc: "Iterate with analytics & feedback." },
  ];

  return (
    <section id="development" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Need a custom SaaS? We’ll build it.</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            From MVPs to enterprise platforms. Transparent timelines, fixed milestones, and post-launch support.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-slate-900">
              Request Free Consultation <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {steps.map(({ Icon, title, desc }) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold">{title}</h3>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------------------- Testimonials -------------------------------
function Testimonials() {
  const items = [
    {
      quote:
        "Saastra replaced three separate tools for us. Hostel allocation and mess billing now run on autopilot.",
      name: "Operations Lead",
      org: "TechVille Campus",
    },
    {
      quote:
        "Loved the speed. We shipped our custom event portal in 4 weeks with clean UI and smooth onboarding.",
      name: "Program Director",
      org: "Innovate Fest",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What our customers say</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Real teams, real results.</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {items.map((t, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
          >
            <blockquote className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">“{t.quote}”</blockquote>
            <figcaption className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              — {t.name}, {t.org}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

// ------------------------------- Pricing -------------------------------
function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "₹0",
      period: "/mo",
      features: ["Up to 100 users", "1 module", "Community support", "Email reports"],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Growth",
      price: "₹7,999",
      period: "/mo",
      features: ["Up to 2,000 users", "Any 3 modules", "Priority support", "Advanced analytics"],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: ["Unlimited users", "Full suite", "SSO & SLA", "Dedicated success manager"],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, scalable pricing</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Choose a plan that fits your institution. Switch or cancel anytime.</p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`relative rounded-3xl border p-6 shadow-sm transition hover:shadow-md ${
              t.highlighted
                ? "border-cyan-500 bg-cyan-50/40 dark:border-cyan-400/60 dark:bg-cyan-950/20"
                : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
            }`}
          >
            {t.highlighted && (
              <span className="absolute -top-3 left-6 rounded-full bg-cyan-600 px-3 py-1 text-xs font-semibold text-white dark:bg-cyan-500">
                Popular
              </span>
            )}
            <h3 className="text-lg font-semibold">{t.name}</h3>
            <div className="mt-2 flex items-end gap-1">
              <span className="text-3xl font-extrabold">{t.price}</span>
              <span className="pb-1 text-sm text-slate-500 dark:text-slate-400">{t.period}</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className={`mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                t.highlighted
                  ? "bg-slate-900 text-white hover:opacity-90 dark:bg-white dark:text-slate-900"
                  : "border border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
              }`}
            >
              {t.cta} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

// ------------------------------- FAQ -------------------------------
function FAQ() {
  const faqs = [
    {
      q: "Can we buy a single module?",
      a: "Yes. All modules are available standalone and can be bundled later without migration.",
    },
    {
      q: "Do you support WhatsApp?",
      a: "Our AI Chat Assistant works on web and can integrate with WhatsApp using official APIs.",
    },
    { q: "Which payment gateways are supported?", a: "Stripe and Razorpay at launch; others on request." },
    { q: "Is data portable?", a: "Yes. We provide secure export, backups and audit logs." },
  ];

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
      <div className="mt-8 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-950">
        {faqs.map((f) => (
          <details key={f.q} className="group px-6 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
              <span>{f.q}</span>
              <span className="transition group-open:rotate-180">
                <ChevronUp className="h-4 w-4" />
              </span>
            </summary>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

// ------------------------------- CTA -------------------------------
function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_450px_at_50%_-100px,rgba(56,189,248,0.25),rgba(255,255,255,0))] dark:bg-[radial-gradient(900px_450px_at_50%_-100px,rgba(56,189,248,0.12),rgba(2,6,23,0))]" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-950">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Let’s build something great</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                Tell us about your institution or project. We’ll reply within one business day.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/919999999999" // Replace with your real number
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  WhatsApp Us <MessageSquare className="h-4 w-4" />
                </a>
                <a href="mailto:hello@saastra.app" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900">
                  Email Sales
                </a>
              </div>
            </div>
            <form className="grid gap-4">
              <div className="grid gap-1">
                <label className="text-sm font-medium">Full Name</label>
                <input className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-cyan-500 dark:border-slate-700" placeholder="Your name" />
              </div>
              <div className="grid gap-1">
                <label className="text-sm font-medium">Work Email</label>
                <input type="email" className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-cyan-500 dark:border-slate-700" placeholder="you@company.com" />
              </div>
              <div className="grid gap-1">
                <label className="text-sm font-medium">What are you interested in?</label>
                <select className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-cyan-500 dark:border-slate-700">
                  <option>Hostel Management</option>
                  <option>Mess Management</option>
                  <option>Event Suite</option>
                  <option>Transport / TTC</option>
                  <option>AI Chat Assistant</option>
                  <option>Custom SaaS Development</option>
                </select>
              </div>
              <div className="grid gap-1">
                <label className="text-sm font-medium">Message</label>
                <textarea rows={4} className="resize-none rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-cyan-500 dark:border-slate-700" placeholder="Tell us about your needs" />
              </div>
              <button type="submit" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-slate-900">
                Send Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ------------------------------- Footer -------------------------------
function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#" className="inline-flex items-center gap-2">
              <Logo className="h-7 w-7" />
              <span className="text-lg font-bold">Saastra</span>
            </a>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Smarter Software, Simplified. Modular SaaS for institutions and modern teams.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Products</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li><a href="#products">Hostel Management</a></li>
              <li><a href="#products">Mess Management</a></li>
              <li><a href="#products">Event Suite</a></li>
              <li><a href="#products">Transport / TTC</a></li>
              <li><a href="#products">AI Chat Assistant</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li><a href="#development">Development</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>📧 hello@saastra.app</li>
              <li>📱 +91-99999-99999</li>
              <li>
                <a className="inline-flex items-center gap-2" href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
                  WhatsApp <MessageSquare className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          © {new Date().getFullYear()} Saastra. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ------------------------------- Helpers -------------------------------
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white shadow-lg transition hover:translate-y-[-2px] dark:border-slate-800 dark:bg-slate-900"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919999999999" // Replace with your number
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 left-6 grid h-12 w-12 place-items-center rounded-full bg-green-600 text-white shadow-xl transition hover:translate-y-[-2px]"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <MessageSquare className="h-5 w-5" />
    </a>
  );
}
