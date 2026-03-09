import { siteConfig } from "@/data/config";

export function TerminalMockup() {
  return (
    <div className="relative rounded-lg border border-strong bg-[var(--bg-2)] shadow-md opacity-0 animate-fade-left-1 overflow-hidden">
      {/* Title Bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
        <div className="flex gap-1.5">
          <span className="block h-3 w-3 rounded-full bg-[var(--red)]" />
          <span className="block h-3 w-3 rounded-full bg-[var(--amber)]" />
          <span className="block h-3 w-3 rounded-full bg-green-500" />
        </div>
        <span className="flex-1 text-center text-[11px] font-mono text-[var(--text-3)]">
          ~/developer.ts
        </span>
      </div>

      {/* Terminal Body */}
      <div className="p-5 font-mono text-[13px] leading-relaxed">
        <p className="t-comment">{"// who am I?"}</p>
        <p className="mt-2">
          <span className="t-key">const</span>{" "}
          <span className="t-fn">developer</span>{" "}
          <span className="t-punct">=</span>{" "}
          <span className="t-bracket">{"{"}</span>
        </p>
        <p className="pl-6">
          <span className="t-key">name</span>
          <span className="t-punct">:</span>{" "}
          <span className="t-str">&quot;{siteConfig.name}&quot;</span>
          <span className="t-punct">,</span>
        </p>
        <p className="pl-6">
          <span className="t-key">role</span>
          <span className="t-punct">:</span>{" "}
          <span className="t-str">&quot;{siteConfig.role}&quot;</span>
          <span className="t-punct">,</span>
        </p>
        <p className="pl-6">
          <span className="t-key">location</span>
          <span className="t-punct">:</span>{" "}
          <span className="t-str">&quot;{siteConfig.location}&quot;</span>
          <span className="t-punct">,</span>
        </p>
        <p className="pl-6">
          <span className="t-key">focus</span>
          <span className="t-punct">:</span>{" "}
          <span className="t-bracket">[</span>
          <span className="t-str">&quot;Performance&quot;</span>
          <span className="t-punct">,</span>{" "}
          <span className="t-str">&quot;Scalability&quot;</span>
          <span className="t-punct">,</span>{" "}
          <span className="t-str">&quot;DX&quot;</span>
          <span className="t-bracket">]</span>
          <span className="t-punct">,</span>
        </p>
        <p className="pl-6">
          <span className="t-key">available</span>
          <span className="t-punct">:</span>{" "}
          <span className="t-bool">true</span>
          <span className="t-punct">,</span>
        </p>
        <p>
          <span className="t-bracket">{"}"}</span>
          <span className="t-punct">;</span>
        </p>
        <p className="mt-3">
          <span className="t-fn">developer</span>
          <span className="t-punct">.</span>
          <span className="t-fn">build</span>
          <span className="t-bracket">(</span>
          <span className="t-bracket">)</span>
          <span className="t-punct">;</span>
          <span className="inline-block w-2 h-4 bg-accent ml-1 animate-blink align-middle" />
        </p>
      </div>
    </div>
  );
}
