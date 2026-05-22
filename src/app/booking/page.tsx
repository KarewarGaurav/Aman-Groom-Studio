"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BOOKING_SLOTS, BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { BookingFormData } from "@/types/cms";

const outfitOptions = [
  "Sherwani",
  "Tuxedo",
  "Indo-Western",
  "Full Bespoke",
  "Accessories Only",
  "Undecided — Need Guidance",
];

export default function BookingPage() {
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    weddingDate: "",
    appointmentDate: "",
    timeSlot: "",
    outfitPreference: "",
    message: "",
  });

  const update = (key: keyof BookingFormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-28 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="font-display text-4xl">Consultation Reserved</h1>
        <p className="mt-4 max-w-md text-champagne/80">
          {form.name}, we look forward to welcoming you on{" "}
          {form.appointmentDate && format(new Date(form.appointmentDate), "PPP")}{" "}
          at {form.timeSlot}.
        </p>
        <Button asChild className="mt-8" variant="outline">
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
              `Hi, I booked a styling session for ${form.appointmentDate} at ${form.timeSlot}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-2"
          >
              <WhatsAppIcon />
            Confirm on WhatsApp
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-28 safe-x sm:pt-24 sm:pb-24 md:pt-28 md:pb-20">
      <div className="mx-auto max-w-2xl px-3 sm:px-4 md:px-8">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">
          Private Appointment
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl">
          Groom Styling Consultation
        </h1>
        <p className="mt-4 text-champagne/80">
          Reserve your session at our Lajpat Nagar atelier. {BRAND.location}
        </p>

        <form onSubmit={handleSubmit} className="mt-12 space-y-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                required
                className="mt-2"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                required
                className="mt-2"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              className="mt-2"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="wedding">Wedding Date</Label>
              <Input
                id="wedding"
                type="date"
                required
                className="mt-2"
                value={form.weddingDate}
                onChange={(e) => update("weddingDate", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="appointment">Preferred Appointment</Label>
              <Input
                id="appointment"
                type="date"
                required
                className="mt-2"
                value={form.appointmentDate}
                onChange={(e) => update("appointmentDate", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Time Slot</Label>
            <div className="mt-3 flex flex-wrap gap-2">
              {BOOKING_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => update("timeSlot", slot)}
                  className={cn(
                    "border px-4 py-2 text-sm transition-colors",
                    form.timeSlot === slot
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-white/20 hover:border-gold/40"
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Outfit Preference</Label>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {outfitOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => update("outfitPreference", opt)}
                  className={cn(
                    "border px-4 py-3 text-left text-sm transition-colors",
                    form.outfitPreference === opt
                      ? "border-gold bg-gold/10"
                      : "border-white/15 hover:border-gold/30"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="message">Additional Notes</Label>
            <Input
              id="message"
              className="mt-2"
              placeholder="Vision, colors, events..."
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
            />
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full"
            disabled={
              !form.name ||
              !form.timeSlot ||
              !form.outfitPreference ||
              !form.appointmentDate
            }
          >
            Confirm Booking
          </Button>
        </form>
      </div>
    </div>
  );
}
