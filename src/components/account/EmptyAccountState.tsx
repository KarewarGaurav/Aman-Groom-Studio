import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmptyAccountState({
  title,
  description,
  href = "/shop",
  cta = "Explore Collection",
}: {
  title: string;
  description: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="rounded-sm border border-dashed border-taupe/25 bg-warmwhite px-8 py-16 text-center">
      <p className="font-display text-2xl text-charcoal">{title}</p>
      <p className="mx-auto mt-3 max-w-sm text-sm text-charcoalsoft">
        {description}
      </p>
      <Button asChild variant="default" className="mt-8">
        <Link href={href}>{cta}</Link>
      </Button>
    </div>
  );
}
