import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import logo from "@/assets/casino-ai-logo.png";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { useUserId } from "@/components/UserIdGate";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "الشروط — Smart Odds" },
      {
        name: "description",
        content:
          "أكمل شروط التفعيل في Smart Odds: اختر المنصة، حمّل التطبيق، انضم للقناة، سجّل بالبروموكود وأودع الحد الأدنى.",
      },
      { property: "og:title", content: "الشروط — Smart Odds" },
      {
        property: "og:description",
        content: "خطوات تفعيل حسابك للحصول على توقعات Smart Odds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

const platforms = [
  { id: "gooobet", name: "Gooobet", short: "GB", url: "https://gooobet.com" },
  { id: "paripulse", name: "Paripulse", short: "PP", url: "https://paripulse.com" },
  { id: "megapari", name: "Megapari", short: "MP", url: "https://megapari.com" },
  { id: "winwin", name: "Winwin", short: "WW", url: "https://winwin.bet" },
];

const PROMO = "Gooo33";
const TELEGRAM = "https://t.me/";

function TermsPage() {
  const navigate = useNavigate();
  const { userId, ready, save } = useUserId();
  const [platform, setPlatform] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [joined, setJoined] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (ready && userId) navigate({ to: "/lobby" });
  }, [ready, userId, navigate]);

  useEffect(() => {
    if (!checking) return;
    const t = window.setTimeout(() => {
      save(value);
      setChecking(false);
      navigate({ to: "/lobby" });
    }, 3200);
    return () => window.clearTimeout(t);
  }, [checking, value, save, navigate]);

  const selected = platforms.find((p) => p.id === platform);
  const idValid = /^\d{10,14}$/.test(value);
  const done = [Boolean(platform), registered, joined, copied, true, idValid].filter(
    Boolean,
  ).length;
  const progress = Math.round((done / 6) * 100);

  return (
    <>
      <ParticlesBackground />
      {checking ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-5 backdrop-blur-md">
          <div
            dir="rtl"
            className="luxe-panel luxe-ring animate-rise w-full max-w-sm overflow-hidden p-7 text-center"
          >
            <div className="relative mx-auto h-16 w-16">
              <span className="absolute inset-0 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
              <span className="animate-spin-slow absolute inset-2 rounded-full border border-dashed border-gold-soft/50" />
              <span className="animate-pulse-glow absolute inset-5 rounded-full bg-gold/40 blur-[6px]" />
            </div>
            <p className="gold-text mt-5 text-sm font-extrabold tracking-wide">
              جارٍ ربط حسابك بالمنصة المختارة
            </p>
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              {selected ? selected.name : ""} — الرجاء الانتظار…
            </p>
            <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-foreground/10">
              <span className="luxe-sheen block h-full w-full luxe-aurora" />
            </div>
          </div>
        </div>
      ) : null}
      <main className="relative z-10 min-h-screen pb-16" dir="rtl">
        <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[420px] luxe-aurora blur-[90px] opacity-40" />
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-gold/15 bg-background/50 backdrop-blur-xl">
          <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-2">
            <span className="gold-text text-[13px] font-extrabold tracking-[0.22em]">
              Smart Odds
            </span>
            <span className="rounded-full border border-gold/30 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-gold-soft">
              الشروط
            </span>
          </div>
          <div className="h-0.5 w-full bg-foreground/5">
            <span
              className="block h-full luxe-aurora transition-[width] duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-4">
          {/* Hero */}
          <section className="animate-rise relative flex flex-col items-center pt-7">
            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/25 blur-[80px]" />
            <img
              src={logo}
              alt="Smart Odds logo"
              width={816}
              height={816}
              className="animate-float relative w-20 drop-shadow-[0_0_38px_oklch(0.66_0.26_300/0.6)]"
            />
            <h1 className="gold-text relative mt-3 text-2xl font-extrabold tracking-[0.2em]">
              Smart Odds
            </h1>
            <p className="relative mt-1.5 text-center text-[11px] text-muted-foreground">
              أكمل الشروط التالية لتفعيل التوقعات بنسبة دقة 90%
            </p>
            <span className="luxe-ring mt-3 rounded-full border border-gold/25 bg-background/40 px-4 py-1 text-[10px] font-bold tracking-[0.2em] text-gold-soft">
              {done} / 6 مكتمل
            </span>
          </section>

          {/* 1 - platforms */}
          <Step index={1} title="اختر المنصة" complete={Boolean(platform)} delay={0}>
            <div className="flex flex-wrap justify-center gap-3">
              {platforms.map((p) => {
                const active = platform === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setPlatform(p.id);
                      setRegistered(false);
                    }}
                    style={{ width: 100, height: 80 }}
                    className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 ${
                      active
                        ? "luxe-ring border-gold bg-[linear-gradient(180deg,oklch(0.66_0.26_300/0.25),oklch(0.5_0.22_295/0.14))] shadow-[0_0_30px_oklch(0.66_0.26_300/0.55)]"
                        : "border-gold/20 bg-background/30 hover:border-gold/60"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-[11px] font-extrabold tracking-wider transition-all ${
                        active
                          ? "animate-reveal border-gold bg-gold/20 text-gold-soft shadow-[0_0_18px_oklch(0.66_0.26_300/0.7)]"
                          : "border-gold/30 bg-background/60 text-muted-foreground"
                      }`}
                    >
                      {p.short}
                    </span>
                    <span className="text-[11px] font-bold text-foreground">{p.name}</span>
                  </button>
                );
              })}
            </div>
          </Step>

          {/* 2 - register */}
          <Step
            index={2}
            title={`التسجيل في منصة ${selected ? selected.name : "( اختر منصة أولاً )"}`}
            complete={registered}
            delay={60}
          >
            <a
              href={selected?.url ?? "#"}
              target="_blank"
              rel="noreferrer"
              onClick={() => selected && setRegistered(true)}
              className={`luxe-sheen block w-full rounded-2xl px-4 py-3 text-center text-sm font-extrabold transition-transform active:scale-[0.98] ${
                selected
                  ? "bg-foreground text-background"
                  : "pointer-events-none bg-foreground/30 text-background/60"
              }`}
            >
              التسجيل
            </a>
          </Step>

          {/* 3 - telegram */}
          <Step index={3} title="الانضمام إلى قناة التليجرام" complete={joined} delay={120}>
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noreferrer"
              onClick={() => setJoined(true)}
              className="luxe-sheen block w-full rounded-2xl bg-foreground px-4 py-3 text-center text-sm font-extrabold text-background transition-transform active:scale-[0.98]"
            >
              انضمام
            </a>
          </Step>

          {/* 4 - promo */}
          <Step index={4} title="إنشاء حساب بالبروموكود الخاص بنا" complete={copied} delay={180}>
            <div className="flex items-center gap-2">
              <span
                dir="ltr"
                className="luxe-ring flex-1 rounded-2xl border border-gold/30 bg-background/50 px-4 py-3 text-center text-base font-extrabold tracking-[0.25em] text-gold-soft"
              >
                {PROMO}
              </span>
              <button
                type="button"
                onClick={() => {
                  void navigator.clipboard?.writeText(PROMO);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1500);
                }}
                className="rounded-2xl bg-foreground px-4 py-3 text-sm font-extrabold text-background transition-transform active:scale-[0.98]"
              >
                {copied ? "تم" : "نسخ"}
              </button>
            </div>
          </Step>

          {/* 5 - deposit */}
          <Step index={5} title="إيداع مبلغ بحد أدنى" complete delay={240}>
            <div className="grid grid-cols-2 gap-3">
              {["300 جنيه", "6 دولار"].map((amount) => (
                <span
                  key={amount}
                  className="rounded-2xl border border-gold/25 bg-[linear-gradient(180deg,oklch(0.22_0.05_300/0.6),oklch(0.11_0.03_300/0.8))] px-4 py-3 text-center text-sm font-extrabold text-gold-soft transition-transform hover:-translate-y-0.5"
                >
                  {amount}
                </span>
              ))}
            </div>
          </Step>

          {/* 6 - id */}
          <Step index={6} title="إدخال الـ ID الخاص بك" complete={idValid} delay={300}>
            <input
              value={value}
              onChange={(e) => {
                setValue(e.target.value.replace(/\D/g, "").slice(0, 14));
                setError(null);
              }}
              inputMode="numeric"
              placeholder="ID"
              dir="ltr"
              className="w-full rounded-2xl border border-gold/25 bg-background/50 px-4 py-3 text-center text-base font-bold tracking-[0.2em] text-foreground outline-none transition-colors focus:border-gold"
            />
            {error ? (
              <p className="mt-2 text-[11px] font-semibold text-destructive">{error}</p>
            ) : null}
            <button
              type="button"
              disabled={checking}
              onClick={() => {
                if (!platform) {
                  setError("من فضلك اختر المنصة أولاً");
                  return;
                }
                if (!/^\d{10,14}$/.test(value)) {
                  setError("الرقم يجب أن يكون من 10 إلى 14 رقم");
                  return;
                }
                setChecking(true);
              }}
              className="gold-button mt-3 w-full rounded-2xl px-4 py-3 text-sm font-extrabold transition-transform active:scale-[0.98]"
            >
              {checking ? "جارٍ التحقق من الشروط…" : "التحقق من الشروط"}
            </button>
          </Step>
        </div>
      </main>
    </>
  );
}

function Step({
  index,
  title,
  complete,
  delay = 0,
  children,
}: {
  index: number;
  title: string;
  complete?: boolean;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`luxe-panel luxe-hairline animate-rise mt-4 overflow-hidden rounded-3xl p-4 transition-all duration-500 ${
        complete ? "border-gold/60 shadow-[0_0_36px_-14px_oklch(0.66_0.26_300/0.8)]" : ""
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[12px] font-extrabold transition-all ${
            complete
              ? "animate-reveal border-gold bg-gold/25 text-gold-soft shadow-[0_0_16px_oklch(0.66_0.26_300/0.7)]"
              : "border-gold/40 bg-gold/10 text-gold-soft"
          }`}
        >
          {complete ? "✓" : index}
        </span>
        <h2 className="text-sm font-extrabold text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}
