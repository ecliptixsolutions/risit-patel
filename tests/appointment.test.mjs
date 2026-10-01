import assert from "node:assert/strict";
import { slotsFor, validateAppointment } from "../src/lib/appointment.ts";

const today = "2099-01-01";
assert.equal(slotsFor("2099-01-05", today).length, 12);
for (let day = 5; day <= 10; day++)
  assert.equal(slotsFor(`2099-01-${String(day).padStart(2, "0")}`, today).length, 12);
assert.deepEqual(slotsFor("2099-01-04", today), []); // Sunday
for (const date of ["", "garbage", "2099-02-30", "2098-12-31"])
  assert.deepEqual(slotsFor(date, today), []);
const slots = slotsFor("2099-01-05", today);
assert.equal(slots[0], "10:00 AM");
assert.equal(slots[7], "1:30 PM");
assert.equal(slots[8], "5:00 PM");
assert.equal(slots[11], "6:30 PM");
const valid = {
  name: "Patient",
  phone: "+91 9998 625 626",
  req: "Back pain",
  date: "2099-01-05",
  slot: "10:00 AM",
};
assert.deepEqual(validateAppointment(valid), {});
for (const key of Object.keys(valid)) assert.ok(validateAppointment({ ...valid, [key]: "" })[key]);
for (const phone of ["1         ", "12345", "abcdefghij", "+1234567890123456"])
  assert.ok(validateAppointment({ ...valid, phone }).phone);
assert.ok(validateAppointment({ ...valid, date: "2099-01-04" }).date);
assert.ok(validateAppointment({ ...valid, date: "2020-01-01" }).date);
assert.ok(validateAppointment({ ...valid, slot: "2:00 PM" }).slot);
console.log("Appointment schedule and validation checks passed.");
