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

  useEffect(() => {
    if (ready && userId) navigate({ to: "/lobby" });
  }, [ready, userId, navigate]);

  useEffect(() => {
    if (!checking) return;
    const t = window.setTimeout(() => {
      save(value);
      setChecking(false);
      navigate({ to: "/lobby" });
    }, 2600);
    return () => window.clearTimeout(t);
  }, [checking, value, save, navigate]);

  const selected = platforms.find((p) => p.id === platform);

  return (
    <>
      <ParticlesBackground />
      <main className="relative z-10 min-h-screen pb-16" dir="rtl">
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
              className="relative w-20 drop-shadow-[0_0_38px_oklch(0.66_0.26_300/0.6)]"
            />
            <h1 className="gold-text relative mt-3 text-2xl font-extrabold tracking-[0.2em]">
              Smart Odds
            </h1>
            <p className="relative mt-1.5 text-center text-[11px] text-muted-foreground">
              أكمل الشروط التالية لتفعيل التوقعات بنسبة دقة 90%
            </p>
          </section>

          {/* 1 - platforms */}
          <Step index={1} title="اختر المنصة">
            <div className="flex flex-wrap justify-center gap-3">
              {platforms.map((p) => {
                const active = platform === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id)}
                    style={{ width: 100, height: 80 }}
                    className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border transition-all duration-300 ${
                      active
                        ? "border-gold bg-[linear-gradient(180deg,oklch(0.85_0.15_88/0.22),oklch(0.62_0.13_75/0.14))] shadow-[0_0_26px_oklch(0.85_0.15_88/0.45)]"
                        : "border-gold/20 bg-background/30 hover:border-gold/60"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-[11px] font-extrabold tracking-wider ${
                        active
                          ? "border-gold bg-gold/20 text-gold-soft"
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

          {/* 2 - download */}
          <Step index={2} title={`تحميل منصة ${selected ? selected.name : "( اختر منصة أولاً )"}`}>
            <a
              href={selected?.url ?? "#"}
              target="_blank"
              rel="noreferrer"
              className={`block w-full rounded-2xl px-4 py-3 text-center text-sm font-extrabold transition-transform active:scale-[0.98] ${
                selected
                  ? "bg-foreground text-background"
                  : "pointer-events-none bg-foreground/30 text-background/60"
              }`}
            >
              تحميل
            </a>
          </Step>

          {/* 3 - telegram */}
          <Step index={3} title="الانضمام إلى قناة التليجرام">
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noreferrer"
              className="block w-full rounded-2xl bg-foreground px-4 py-3 text-center text-sm font-extrabold text-background transition-transform active:scale-[0.98]"
            >
              انضمام
            </a>
          </Step>

          {/* 4 - promo */}
          <Step index={4} title="إنشاء حساب بالبروموكود الخاص بنا">
            <div className="flex items-center gap-2">
              <span
                dir="ltr"
                className="flex-1 rounded-2xl border border-gold/30 bg-background/50 px-4 py-3 text-center text-base font-extrabold tracking-[0.25em] text-gold-soft"
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
          <Step index={5} title="إيداع مبلغ بحد أدنى">
            <div className="grid grid-cols-2 gap-3">
              {["300 جنيه", "6 دولار"].map((amount) => (
                <span
                  key={amount}
                  className="rounded-2xl border border-gold/25 bg-[linear-gradient(180deg,oklch(0.22_0.05_300/0.6),oklch(0.11_0.03_300/0.8))] px-4 py-3 text-center text-sm font-extrabold text-gold-soft"
                >
                  {amount}
                </span>
              ))}
            </div>
          </Step>

          {/* 6 - id */}
          <Step index={6} title="إدخال الـ ID الخاص بك">
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
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="luxe-panel animate-rise mt-4 rounded-3xl p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-[12px] font-extrabold text-gold-soft">
          {index}
        </span>
        <h2 className="text-sm font-extrabold text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}
