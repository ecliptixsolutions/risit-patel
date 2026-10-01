import { useMemo, useState } from "react";
import { CalendarDays, Clock, Phone, CheckCircle2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  dateString,
  slotsFor,
  validateAppointment,
  type AppointmentForm as Form,
} from "@/lib/appointment";

const empty: Form = { name: "", phone: "", req: "", date: "", slot: "" };

export function AppointmentBooking({ tel }: { tel: string }) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [f, setF] = useState<Form>(empty);
  const [err, setErr] = useState<Partial<Record<keyof Form, string>>>({});
  const [done, setDone] = useState<Form | null>(null);
  const slots = useMemo(() => slotsFor(f.date), [f.date]);
  const isFriday = f.date && new Date(f.date + "T00:00:00").getDay() === 5;

  const set = (k: keyof Form, v: string) => {
    setF((p) => ({ ...p, [k]: v, ...(k === "date" ? { slot: "" } : {}) }));
    setErr((e) => {
      const next = { ...e };
      delete next[k];
      if (k === "date") delete next.slot;
      return next;
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = validateAppointment(f);
    setErr(n);
    if (Object.keys(n).length === 0)
      setDone({ ...f, name: f.name.trim(), phone: f.phone.trim(), req: f.req.trim() });
    else document.getElementById(`ap-${Object.keys(n)[0]}`)?.focus();
  };

  const input =
    "h-12 w-full rounded-2xl border border-primary-foreground/25 bg-primary-foreground/10 px-4 text-sm text-primary-foreground placeholder:text-primary-foreground/60 outline-none transition focus:border-primary-foreground/70 focus:bg-primary-foreground/15 focus:ring-2 focus:ring-primary-foreground/30";
  const Err = ({ k }: { k: keyof Form }) =>
    err[k] ? (
      <p
        id={`${k}-err`}
        role="alert"
        className="mt-1.5 px-1 text-xs font-medium text-primary-foreground/90"
      >
        ⚠ {err[k]}
      </p>
    ) : null;

  return (
    <section
      id="appointment"
      aria-labelledby="appointment-heading"
      className="reveal scroll-mt-4 rounded-3xl bg-hero p-6 text-primary-foreground shadow-soft"
      style={{ animationDelay: ".42s" }}
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary-foreground/70">
        Appointment
      </p>
      <h2 id="appointment-heading" className="mt-1 font-display text-3xl font-bold">
        Book Your Consultation
      </h2>

      {done ? (
        <div
          role="status"
          tabIndex={-1}
          ref={(node) => {
            node?.focus();
          }}
          className="reveal mt-5 rounded-2xl border border-primary-foreground/25 bg-primary-foreground/10 p-5"
        >
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="h-5 w-5" />
            Appointment Request
          </div>
          <p className="mt-1 text-sm text-primary-foreground/80">
            Your appointment request has been prepared.
          </p>
          <dl className="mt-4 space-y-1.5 text-sm">
            {[
              [
                "Date",
                new Date(done.date + "T00:00:00").toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }),
              ],
              ["Time", done.slot],
              ["Name", done.name],
              ["Requirement", done.req],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3">
                <dt className="text-primary-foreground/70">{k}</dt>
                <dd className="min-w-0 break-words text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-primary-foreground/75">
            This request has not been sent or booked. Final confirmation requires the appointment
            booking service. Please call the clinic to arrange your appointment.
          </p>
          <div className="mt-4 grid gap-3">
            <a
              href={tel}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary-foreground text-sm font-bold text-primary transition hover:-translate-y-0.5 active:scale-[.98]"
            >
              <Phone className="h-4 w-4" />
              Call to Confirm
            </a>
            <button
              onClick={() => {
                setDone(null);
                setF(empty);
              }}
              className="h-12 rounded-full border border-primary-foreground/40 text-sm font-semibold transition hover:bg-primary-foreground/10 active:scale-[.98]"
            >
              New Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="mt-5 space-y-3">
          <div>
            <label htmlFor="ap-name" className="sr-only">
              Name
            </label>
            <input
              id="ap-name"
              required
              maxLength={100}
              className={input}
              placeholder="Name"
              autoComplete="name"
              value={f.name}
              onChange={(e) => set("name", e.target.value)}
              aria-invalid={!!err.name}
              aria-describedby={err.name ? "name-err" : undefined}
            />
            <Err k="name" />
          </div>
          <div>
            <label htmlFor="ap-phone" className="sr-only">
              Phone
            </label>
            <input
              id="ap-phone"
              required
              maxLength={25}
              type="tel"
              inputMode="tel"
              className={input}
              placeholder="Phone"
              autoComplete="tel"
              value={f.phone}
              onChange={(e) => set("phone", e.target.value)}
              aria-invalid={!!err.phone}
              aria-describedby={err.phone ? "phone-err" : undefined}
            />
            <Err k="phone" />
          </div>
          <div>
            <label htmlFor="ap-req" className="sr-only">
              Requirement
            </label>
            <input
              id="ap-req"
              required
              className={input}
              placeholder="Requirement (e.g. back pain)"
              maxLength={120}
              value={f.req}
              onChange={(e) => set("req", e.target.value)}
              aria-invalid={!!err.req}
              aria-describedby={err.req ? "req-err" : undefined}
            />
            <Err k="req" />
          </div>
          <div>
            <label htmlFor="ap-date" className="sr-only">
              Select Date
            </label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <button
                  id="ap-date"
                  type="button"
                  className={`${input} flex items-center gap-3 text-left`}
                  aria-invalid={!!err.date}
                  aria-describedby={err.date ? "date-err" : undefined}
                >
                  <CalendarDays aria-hidden="true" className="h-4 w-4 shrink-0" />
                  {f.date ? (
                    new Date(f.date + "T00:00:00").toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  ) : (
                    <span className="text-primary-foreground/60">Select Date</span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-auto max-w-[calc(100vw-2rem)] rounded-2xl p-0"
              >
                <Calendar
                  mode="single"
                  selected={f.date ? new Date(f.date + "T00:00:00") : undefined}
                  disabled={[
                    { before: new Date(dateString(new Date()) + "T00:00:00") },
                    { dayOfWeek: [0] },
                  ]}
                  onSelect={(date) => {
                    if (date && slotsFor(dateString(date)).length) {
                      set("date", dateString(date));
                      setCalendarOpen(false);
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
            <Err k="date" />
          </div>

          <fieldset
            id="ap-slot"
            tabIndex={-1}
            aria-describedby={err.slot ? "slot-err" : undefined}
            className="rounded-2xl border border-primary-foreground/25 bg-primary-foreground/10 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <legend className="sr-only">Select Time Slot</legend>
            <p className="flex items-center gap-2 px-1 text-sm text-primary-foreground/80">
              <Clock className="h-4 w-4" />
              {f.date ? "Select Time Slot" : "Select Time Slot — choose a date first"}
            </p>
            {f.date && slots.length > 0 && (
              <div className="reveal mt-3 grid grid-cols-2 gap-2">
                {slots.map((s) => (
                  <label key={s} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="appointment-slot"
                      value={s}
                      checked={f.slot === s}
                      onChange={() => set("slot", s)}
                      className="peer sr-only"
                    />
                    <span
                      className={`flex h-11 items-center justify-center rounded-xl text-xs font-semibold transition peer-focus-visible:ring-2 peer-focus-visible:ring-primary-foreground active:scale-95 ${f.slot === s ? "border border-primary-foreground/60 bg-primary text-primary-foreground" : "border border-primary-foreground/25 hover:bg-primary-foreground/15"}`}
                    >
                      {s}
                    </span>
                  </label>
                ))}
              </div>
            )}
            {isFriday && (
              <p className="mt-2 px-1 text-[11px] text-primary-foreground/75">
                Gandhi Jayanti — Hours might differ
              </p>
            )}
            {f.date && (
              <p className="mt-2 px-1 text-[11px] text-primary-foreground/60">
                Slots follow clinic hours; availability is confirmed by the clinic.
              </p>
            )}
          </fieldset>
          <Err k="slot" />

          <button
            type="submit"
            className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-foreground text-sm font-bold text-primary shadow-soft transition hover:-translate-y-0.5 active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <CalendarDays className="h-4 w-4" />
            Book Appointment
          </button>
          <a
            href={tel}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/40 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-primary-foreground/10 active:scale-[.98]"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
        </form>
      )}
    </section>
  );
}
