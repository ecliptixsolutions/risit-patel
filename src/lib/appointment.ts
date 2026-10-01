export const SLOTS = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
];

export type AppointmentForm = {
  name: string;
  phone: string;
  req: string;
  date: string;
  slot: string;
};

export function dateString(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function slotsFor(date: string, today = dateString(new Date())): string[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < today) return [];
  const parsed = new Date(date + "T00:00:00");
  return Number.isNaN(parsed.getTime()) || dateString(parsed) !== date || parsed.getDay() === 0
    ? []
    : SLOTS;
}

export function validateAppointment(form: AppointmentForm) {
  const errors: Partial<Record<keyof AppointmentForm, string>> = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  const phone = form.phone.trim().replace(/[\s()-]/g, "");
  if (!/^\+?\d{10,15}$/.test(phone))
    errors.phone = form.phone.trim()
      ? "Please enter a valid phone number."
      : "Please enter your phone number.";
  if (!form.req.trim()) errors.req = "Please describe your requirement.";
  if (!form.date) errors.date = "Please select a date.";
  else if (!slotsFor(form.date).length)
    errors.date = "Please choose a future or current working day. Sundays are closed.";
  if (!form.slot) errors.slot = "Please select a time slot.";
  else if (!slotsFor(form.date).includes(form.slot))
    errors.slot = "Please select a time within clinic hours.";
  return errors;
}
