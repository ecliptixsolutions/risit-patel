import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import drPhoto from "@/assets/image.png";
import { QRCodeSVG } from "qrcode.react";
import { Phone, MapPin, Clock, Navigation, Brain, Share2, UserPlus, ArrowUpRight, Stethoscope, BadgeCheck } from "lucide-react";
import { AppointmentBooking } from "@/components/AppointmentBooking";

const NAME = "Dr. Rishit V. Patel";
const TITLE = "Neurosurgeon (Brain & Spine Surgeon)";
const PHONE = "+91 9998 625 626";
const TEL = "tel:+919998625626";
const ADDR_LINES = ["Ground Floor, Bhoomi Complex,", "Dairy Rd, Manglaytan Society,", "Mehsana, Gujarat 384002"];
const ADDRESS = ADDR_LINES.join(" ");
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(NAME + ", " + ADDRESS)}`;
const HOURS = [
  { d: "Monday", h: "10 AM–2 PM, 5–7 PM" },
  { d: "Tuesday", h: "10 AM–2 PM, 5–7 PM" },
  { d: "Wednesday", h: "10 AM–2 PM, 5–7 PM" },
  { d: "Thursday", h: "10 AM–2 PM, 5–7 PM" },
  { d: "Friday", h: "10 AM–2 PM, 5–7 PM", note: "Gandhi Jayanti — Hours might differ" },
  { d: "Saturday", h: "10 AM–2 PM, 5–7 PM" },
  { d: "Sunday", h: "Closed", closed: true },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Rishit V. Patel — Neurosurgeon in Mehsana" },
      { name: "description", content: "Digital card of Dr. Rishit V. Patel, Neurosurgeon (Brain & Spine Surgeon), Bhoomi Complex, Dairy Rd, Mehsana. Hours and directions." },
      { property: "og:title", content: "Dr. Rishit V. Patel — Neurosurgeon, Mehsana" },
      { property: "og:description", content: "Dr. Rishit V. Patel — Neurosurgeon (Brain & Spine Surgeon) in Mehsana, Gujarat." },
      { property: "og:url", content: "https://drrishitpatel.vynkcard.com/" },
      { property: "og:image", content: "https://drrishitpatel.vynkcard.com/og-image.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Dr. Rishit V. Patel — Neurosurgeon, Mehsana, Gujarat" },
      { name: "twitter:title", content: "Dr. Rishit V. Patel — Neurosurgeon, Mehsana" },
      { name: "twitter:description", content: "Brain & Spine Surgeon in Mehsana, Gujarat." },
      { name: "twitter:image", content: "https://drrishitpatel.vynkcard.com/og-image.png" },
      { name: "twitter:image:alt", content: "Dr. Rishit V. Patel — Neurosurgeon, Mehsana, Gujarat" },
    ],
  }),
  component: Index,
});

function useUrl() {
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(window.location.href), []);
  return url;
}

function share(url: string) {
  const data = { title: NAME, text: `${NAME} — ${TITLE}`, url };
  if (navigator.share) navigator.share(data).catch(() => {});
  else navigator.clipboard?.writeText(url).then(() => alert("Card link copied"));
}

function saveContact(url: string) {
  const v = [
    "BEGIN:VCARD", "VERSION:3.0", "N:Patel;Rishit;V.;Dr.;", `FN:${NAME}`, `TITLE:${TITLE}`, "TEL;TYPE=WORK,VOICE:+919998625626",
    "ADR;TYPE=WORK:;Ground Floor\\, Bhoomi Complex;Dairy Rd\\, Manglaytan Society;Mehsana;Gujarat;384002;India",
    url ? `URL:${url}` : "", "END:VCARD",
  ].filter(Boolean).join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([v], { type: "text/vcard" }));
  a.download = "Dr-Rishit-V-Patel.vcf";
  a.click();
}

function Card({ children, className = "", delay = 0, id }: { children: React.ReactNode; className?: string; delay?: number; id?: string }) {
  return (
    <section id={id} className={`reveal scroll-mt-4 rounded-3xl border border-border bg-card p-5 shadow-soft ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </section>
  );
}

function Head({ icon: I, children }: { icon: typeof Clock; children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-primary"><I className="h-4 w-4" /></span>
      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{children}</h2>
    </div>
  );
}

function Index() {
  const url = useUrl();
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="min-h-screen bg-secondary/60 py-0 sm:py-10">
      <div className="mx-auto max-w-[440px] overflow-hidden bg-background pb-28 sm:rounded-[2rem] sm:border sm:border-border sm:shadow-soft sm:pb-6">
        {/* Header */}
        <header className="relative bg-hero px-6 pb-20 pt-10 text-center text-primary-foreground">
          <span className="reveal inline-block rounded-full border border-primary-foreground/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em]">Brain & Spine</span>
        </header>
        <div className="-mt-16 px-6 text-center">
          <div className="reveal mx-auto w-36 rounded-2xl bg-background p-1.5 shadow-soft" style={{ aspectRatio: "3/4" }}>
            <div className="h-full w-full overflow-hidden rounded-xl bg-white">
              <img src={drPhoto} alt={NAME} className="h-full w-full object-contain object-center" />
            </div>
          </div>
          <h1 className="reveal mt-4 font-display text-4xl font-bold text-primary" style={{ animationDelay: ".1s" }}>{NAME}</h1>
          <p className="reveal mt-1 text-sm font-medium text-foreground/80" style={{ animationDelay: ".15s" }}>{TITLE}</p>
          <p className="reveal mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground" style={{ animationDelay: ".2s" }}><MapPin className="h-3.5 w-3.5 text-primary" /> Mehsana, Gujarat</p>

          {/* Primary actions */}
          <div className="reveal mt-6 grid grid-cols-4 gap-2.5" style={{ animationDelay: ".25s" }}>
            {[
              { I: Phone, l: "Call", on: () => (window.location.href = TEL) },
              { I: Navigation, l: "Directions", on: () => window.open(MAPS, "_blank") },
              { I: UserPlus, l: "Save", on: () => saveContact(url) },
              { I: Share2, l: "Share", on: () => share(url) },
            ].map(({ I, l, on }) => (
              <button key={l} onClick={on} className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card py-3.5 text-xs font-semibold text-primary transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft active:scale-95">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"><I className="h-4 w-4" /></span>{l}
              </button>
            ))}
          </div>
        </div>

        <main className="mt-6 space-y-4 px-4">
          <Card id="about" delay={0.3}>
            <Head icon={Brain}>About</Head>
            <p className="text-sm leading-relaxed text-muted-foreground">{NAME} practises as a {TITLE} at Bhoomi Complex, Dairy Road, Mehsana.</p>
          </Card>

          <Card delay={0.35}>
            <Head icon={Stethoscope}>Areas of Care</Head>
            <div className="grid grid-cols-2 gap-2.5">
              {["Brain Surgery", "Spine Surgery", "Neurosurgery", "Brain & Spine Care"].map((t) => (
                <div key={t} className="flex items-center gap-2 rounded-2xl border border-border bg-secondary/60 px-3 py-3 text-xs font-semibold text-primary transition hover:-translate-y-0.5 hover:border-primary/40">
                  <BadgeCheck className="h-4 w-4 shrink-0" />{t}
                </div>
              ))}
            </div>
          </Card>

          <Card id="contact" delay={0.38}>
            <Head icon={Phone}>Contact</Head>
            <a href={TEL} className="flex items-center justify-between rounded-2xl bg-secondary px-4 py-3.5 text-sm font-semibold text-primary transition hover:-translate-y-0.5">
              <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" />{PHONE}</span><ArrowUpRight className="h-4 w-4" />
            </a>
          </Card>

          <Card id="location" delay={0.45}>
            <Head icon={MapPin}>Location</Head>
            <address className="not-italic text-sm leading-relaxed">{ADDR_LINES.map((l) => <div key={l}>{l}</div>)}</address>
            <a href={MAPS} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-between rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-soft">
              Get Directions <ArrowUpRight className="h-4 w-4" />
            </a>
          </Card>

          <Card id="hours" delay={0.4}>
            <Head icon={Clock}>Working Hours</Head>
            <ul className="space-y-1">
              {HOURS.map((r) => (
                <li key={r.d} className={`rounded-xl px-3 py-2.5 text-sm ${r.d === today ? "bg-secondary" : ""}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{r.d}{r.d === today && <span className="ml-2 text-[10px] font-bold uppercase text-primary">Today</span>}</span>
                    <span className={r.closed ? "rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-bold text-destructive" : "font-semibold text-primary"}>{r.h}</span>
                  </div>
                  {r.note && <p className="mt-1 text-right text-[11px] font-medium text-muted-foreground">{r.note}</p>}
                </li>
              ))}
            </ul>
          </Card>

          <AppointmentBooking tel={TEL} />

          <div className="space-y-3">
            {[
              { I: Navigation, t: "Get Directions", s: "Open the clinic in Google Maps", on: () => window.open(MAPS, "_blank") },
              { I: Phone, t: "Call the Clinic", s: PHONE, on: () => (window.location.href = TEL) },
              { I: Share2, t: "Share Card", s: "Send this card to someone", on: () => share(url) },
            ].map(({ I, t, s, on }, i) => (
              <button key={t} onClick={on} className="reveal group flex w-full items-center gap-4 rounded-2xl bg-hero p-4 text-left text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-soft active:scale-[.98]" style={{ animationDelay: `${0.5 + i * 0.05}s` }}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-foreground/15"><I className="h-5 w-5" /></span>
                <span className="flex-1"><span className="block text-sm font-semibold">{t}</span><span className="block text-xs text-primary-foreground/70">{s}</span></span>
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            ))}
          </div>

          <Card delay={0.65} className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Scan to Share</p>
            <div className="mx-auto mt-4 w-fit rounded-2xl border border-border bg-card p-3">
              {url ? <QRCodeSVG value={url} size={150} fgColor="currentColor" className="text-primary" /> : <div className="h-[150px] w-[150px]" />}
            </div>
            <div className="mt-3 font-display text-xl font-bold text-primary">{NAME}</div>
            <div className="text-xs text-muted-foreground">{TITLE}</div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button onClick={() => share(url)} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"><Share2 className="h-4 w-4" />Share Card</button>
              <button onClick={() => saveContact(url)} className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 py-2.5 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-secondary"><UserPlus className="h-4 w-4" />Save Contact</button>
            </div>
          </Card>
        </main>

        <footer className="mt-8 px-6 text-center">
          <div className="font-display text-lg font-bold text-primary">{NAME}</div>
          <div className="text-xs text-muted-foreground">{TITLE}</div>
          <div className="text-xs text-muted-foreground">Mehsana, Gujarat</div>
          <a href="https://vynkcard.com/" className="mt-4 inline-block rounded text-xs text-muted-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Designed and Developed by <span className="font-semibold text-primary">Vynkcard</span>
          </a>
        </footer>
      </div>

      {/* Sticky mobile bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur sm:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="mx-auto grid max-w-[440px] grid-cols-3 gap-2 p-3">
          <a href={TEL} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground active:scale-95"><Phone className="h-4 w-4" />Call</a>
          <a href={MAPS} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 py-3 text-sm font-semibold text-primary active:scale-95"><Navigation className="h-4 w-4" />Directions</a>
          <button onClick={() => share(url)} className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 py-3 text-sm font-semibold text-primary active:scale-95"><Share2 className="h-4 w-4" />Share</button>
        </div>
      </nav>
    </div>
  );
}
