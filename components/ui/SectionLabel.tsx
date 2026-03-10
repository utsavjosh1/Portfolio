interface SectionLabelProps {
  label: string;
  align?: "left" | "center";
}

export function SectionLabel({ label, align = "left" }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-3 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <span className="block h-px w-8 bg-accent" />
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
        {label}
      </span>
      {align === "center" && <span className="block h-px w-8 bg-accent" />}
    </div>
  );
}
