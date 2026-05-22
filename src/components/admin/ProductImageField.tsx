"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImageIcon, Link2, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";

const CATALOG_IMAGES: { label: string; src: string }[] = [
  { label: "Maharaja Sherwani", src: IMAGES.products.maharajaSherwani },
  { label: "Dynasty Sherwani", src: IMAGES.products.dynastySherwani },
  { label: "Nizam Achkan", src: IMAGES.products.nizamAchkan },
  { label: "Imperial Tuxedo", src: IMAGES.products.imperialTuxedo },
  { label: "Platinum Tuxedo", src: IMAGES.products.platinumTuxedo },
  { label: "Indo-Western", src: IMAGES.products.indoWestern },
  { label: "Champagne Bandhgala", src: IMAGES.products.champagneBandhgala },
  { label: "Kurta Set", src: IMAGES.products.kurtaSet },
  { label: "Haldi Kurta", src: IMAGES.products.haldiKurta },
  { label: "Jodhpuri", src: IMAGES.products.jodhpuri },
  { label: "Reception Blazer", src: IMAGES.products.receptionBlazer },
  { label: "Sangeet Blazer", src: IMAGES.products.sangeetBlazer },
  { label: "Accessories", src: IMAGES.products.accessories },
  { label: "Safa & Stole", src: IMAGES.products.safaStoleSet },
  { label: "Mojari Set", src: IMAGES.products.mojariSet },
];

export const CATEGORY_DEFAULT_IMAGE: Record<string, string> = {
  sherwanis: IMAGES.categories.sherwanis,
  tuxedos: IMAGES.categories.tuxedos,
  "indo-western": IMAGES.categories.indoWestern,
  "kurta-sets": IMAGES.categories.kurtaSets,
  reception: IMAGES.categories.reception,
  accessories: IMAGES.categories.accessories,
};

type ImageTab = "catalog" | "upload" | "url";

interface ProductImageFieldProps {
  image: string;
  onImageChange: (url: string) => void;
  error?: string;
}

export function ProductImageField({
  image,
  onImageChange,
  error,
}: ProductImageFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<ImageTab>("catalog");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setUploadError(null);
    if (!file.type.startsWith("image/")) {
      setUploadError("Please choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be under 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        onImageChange(result);
        setTab("upload");
      }
    };
    reader.onerror = () => setUploadError("Could not read that file. Try again.");
    reader.readAsDataURL(file);
  };

  const tabs: { id: ImageTab; label: string; icon: typeof ImageIcon }[] = [
    { id: "catalog", label: "Catalog", icon: ImageIcon },
    { id: "upload", label: "Upload", icon: Upload },
    { id: "url", label: "URL", icon: Link2 },
  ];

  return (
    <div className="space-y-3">
      <Label>Product image</Label>

      <div className="flex gap-4">
        <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-lg border border-champagne/50 bg-cream">
          {image ? (
            <Image
              src={image}
              alt="Product preview"
              fill
              className="object-cover"
              sizes="96px"
              unoptimized={image.startsWith("data:") || image.startsWith("http")}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-taupe">
              <ImageIcon className="h-8 w-8 opacity-40" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-1 rounded-lg border border-champagne/40 bg-ivory/60 p-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1 rounded-md px-2 py-1.5 font-body text-[10px] font-medium uppercase tracking-wider transition-colors sm:text-xs",
                  tab === id
                    ? "bg-burgundy text-ivory"
                    : "text-charcoalsoft hover:bg-champagne/40"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
          <p className="mt-2 font-body text-[11px] text-charcoalsoft">
            Shown on shop, cart, and admin listings.
          </p>
        </div>
      </div>

      {tab === "catalog" ? (
        <div className="max-h-36 overflow-y-auto rounded-lg border border-champagne/40 bg-ivory/40 p-2">
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
            {CATALOG_IMAGES.map(({ label, src }) => (
              <button
                key={src}
                type="button"
                title={label}
                onClick={() => onImageChange(src)}
                className={cn(
                  "relative aspect-[3/4] overflow-hidden rounded-md border-2 transition-all",
                  image === src
                    ? "border-burgundy ring-2 ring-burgundy/20"
                    : "border-transparent hover:border-champagne"
                )}
              >
                <Image
                  src={src}
                  alt={label}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {tab === "upload" ? (
        <div className="rounded-lg border border-dashed border-champagne/60 bg-cream/30 px-4 py-5 text-center">
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="sr-only"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <Upload className="mx-auto h-6 w-6 text-bronze" />
          <p className="mt-2 font-body text-sm text-charcoal">
            Upload product photo
          </p>
          <p className="mt-1 font-body text-xs text-charcoalsoft">
            JPG, PNG or WebP · max 5 MB
          </p>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-3 rounded-full border border-burgundy/25 bg-burgundy/5 px-4 py-1.5 font-body text-xs font-medium text-burgundy hover:bg-burgundy/10"
          >
            Choose file
          </button>
          {(uploadError || error) && (
            <p className="mt-2 font-body text-xs text-burgundy">
              {uploadError ?? error}
            </p>
          )}
        </div>
      ) : null}

      {tab === "url" ? (
        <div>
          <Input
            value={image.startsWith("data:") ? "" : image}
            onChange={(e) => onImageChange(e.target.value)}
            placeholder="/images/product-name.png or https://…"
            className="mt-1 font-body text-sm"
          />
          <p className="mt-1.5 font-body text-[11px] text-charcoalsoft">
            Use a path under <code className="text-bronze">/public/images/</code>{" "}
            or a full image URL.
          </p>
          {error ? (
            <p className="mt-1 font-body text-xs text-burgundy">{error}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
