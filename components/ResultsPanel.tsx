"use client";

import { useState } from "react";
import { ReviewResult, Bug } from "@/types/review";
import ScoreCard from "./ScoreCard";

interface Props {
  result: ReviewResult;
}

const SEVERITY_COLORS = {
  High: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", dot: "🔴" },
  Medium: { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-400", dot: "🟡" },
  Low: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400", dot: "🟢" },
};

const LANG_MAP: Record<string, string> = {
  Python: "python", Java: "java", JavaScript: "javascript",
  TypeScript: "typescript", "C++": "cpp", C: "c",
  Go: "go", Rust: "rust", Kotlin: "kotlin",
};

function BugCard({ bug }: { bug: Bug }) {
  const [open, setOpen] = useState(false);
  const s = SEVERITY_COLORS[bug.severity];
  return (
    <div className={`rounded-xl border ${s.bg} ${s.border} overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 text-left flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2 text-sm">
          <span>{s.dot}</span>
          <span className={`font-mono font-bold ${s.text}`}>{bug.severity}</span>
          <span className="text-[#6b7280]">Line {bug.line}:</span>
          <span className="text-[#e8e8f0]">{bug.issue}</span>
        </div>
        <span className="text-[#6b7280] text-xs flex-shrink-0">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-[#1f1f35] pt-3">
          <p className="text-sm text-[#6b7280] mb-1 font-mono">Fix:</p>
          <p className="text-sm text-[#e8e8f0]">{bug.fix}</p>
        </div>
      )}
    </div>
  );
}

export default function ResultsPanel({ result }: Props) {
  const [copied, setCopied] = useState(false);

  function copyRewrite() {
    navigator.clipboard.writeText(result.rewrite);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-12 space-y-8">
      <div className="h-px bg-[#1f1f35]" />

      {/* Summary */}
      <div>
        <h2 className="font-mono text-lg font-bold mb-3">📋 Summary</h2>
        <div className="bg-[#13131f] border border-[#1f1f35] rounded-xl p-4 text-sm text-[#b0b0c8] leading-relaxed">
          {result.summary}
        </div>
      </div>

      {/* Scores */}
      <div>
        <h2 className="font-mono text-lg font-bold mb-3">📊 Scores</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <ScoreCard label="Overall" score={result.score.overall} large />
          <ScoreCard label="Readability" score={result.score.readability} />
          <ScoreCard label="Efficiency" score={result.score.efficiency} />
          <ScoreCard label="Correctness" score={result.score.correctness} />
        </div>
      </div>

      {/* Complexity */}
      <div>
        <h2 className="font-mono text-lg font-bold mb-3">⏱️ Complexity</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Time", value: result.complexity.time },
            { label: "Space", value: result.complexity.space },
            { label: "Rating", value: result.complexity.rating },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#13131f] border border-[#1f1f35] rounded-xl p-4">
              <div className="text-xs font-mono text-[#6b7280] uppercase tracking-widest mb-1">{label}</div>
              <div className="font-mono text-sm text-[#e8e8f0]">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bugs */}
      {result.bugs.length > 0 && (
        <div>
          <h2 className="font-mono text-lg font-bold mb-3">🐛 Bugs & Issues</h2>
          <div className="space-y-2">
            {result.bugs.map((bug, i) => <BugCard key={i} bug={bug} />)}
          </div>
        </div>
      )}

      {result.bugs.length === 0 && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-emerald-400 text-sm font-mono">
          ✅ No bugs found
        </div>
      )}

      {/* Security */}
      {result.security_issues.length > 0 && (
        <div>
          <h2 className="font-mono text-lg font-bold mb-3">🔒 Security Issues</h2>
          <div className="space-y-2">
            {result.security_issues.map((s, i) => {
              const colors = SEVERITY_COLORS[s.severity];
              return (
                <div key={i} className={`rounded-xl border ${colors.bg} ${colors.border} px-4 py-3 flex items-center gap-2 text-sm`}>
                  <span>{colors.dot}</span>
                  <span className={`font-mono font-bold ${colors.text}`}>{s.severity}</span>
                  <span className="text-[#e8e8f0]">{s.issue}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Rewrite */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-mono text-lg font-bold">✨ Clean Rewrite</h2>
          <button
            onClick={copyRewrite}
            className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#13131f] border border-[#1f1f35] text-[#6b7280] hover:text-[#e8e8f0] hover:border-[#2a2a40] transition-all"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
        <pre className="bg-[#13131f] border border-[#1f1f35] rounded-xl p-4 overflow-x-auto text-sm font-mono text-[#e8e8f0] leading-relaxed whitespace-pre-wrap">
          {result.rewrite}
        </pre>
        <div className="mt-3 bg-[#13131f] border border-[#1f1f35] rounded-xl p-4">
          <p className="text-xs font-mono text-[#6b7280] uppercase tracking-widest mb-2">What changed</p>
          <p className="text-sm text-[#b0b0c8] leading-relaxed whitespace-pre-wrap">{result.rewrite_explanation}</p>
        </div>
      </div>
    </div>
  );
}