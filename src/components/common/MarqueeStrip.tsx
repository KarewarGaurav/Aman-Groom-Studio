interface MarqueeStripProps {
  words?: string[];
  speed?: number;
  className?: string;
}

const DEFAULT_WORDS = [
  "Luxury Couture",
  "·",
  "Bespoke Tailoring",
  "·",
  "Royal Sherwanis",
  "·",
  "Imperial Tuxedos",
  "·",
  "New Delhi Atelier",
  "·",
  "Indo-Western",
  "·",
  "Wedding Excellence",
  "·",
];

export function MarqueeStrip({
  words = DEFAULT_WORDS,
  speed = 32,
  className = "",
}: MarqueeStripProps) {
  const repeated = [...words, ...words];
  return (
    <div
      className={`overflow-hidden border-y border-gold/15 py-3.5 ${className}`}
      aria-hidden
    >
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {repeated.map((w, i) => (
          <span
            key={i}
            className={
              w === "·"
                ? "text-gold/50"
                : "font-body text-[10px] uppercase tracking-[0.28em] text-champagne/50"
            }
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
