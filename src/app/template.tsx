"use client";

export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter min-h-0 flex-1">{children}</div>;
}
