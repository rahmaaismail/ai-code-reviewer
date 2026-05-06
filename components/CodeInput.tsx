"use client";

import { useState } from "react";

const LANGUAGES = ["Python", "Java", "JavaScript", "TypeScript", "C", "C++", "Rust", "Go", "Kotlin", "Other"];
const FOCUS_OPTIONS = ["Bugs", "Complexity", "Clean Rewrite", "Security", "Performance"];

interface Props {
  onSubmit: (code: string, language: string, focus: string[]) => void;
  loading: boolean;
}

export default function CodeInput({ onSubmit, loading }: Props) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Python");
  const [focus, setFocus] = useState<string[]>(["Bugs", "Complexity", "Clean Rewrite"]);

  function toggleFocus(item: string) {
    setFocus((prev) =>
      prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]
    );
  }

  function handleSubmit() {
    if (!code.trim() || focus.length === 0) return;
    onSubmit(code, language, focus);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Code editor */}
      <div className="lg:col-span-3">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          className="w-full h-80 bg-[#13131f] border border-[#1f1f35] rounded-xl p-4 font-mono text-sm text-[#e8e8f0] placeholder-[#3a3a5c] resize-none focus:outline-none focus:border-violet-500/50 transition-colors"
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4">
        {/* Language */}
        <div>
          <label className="text-xs font-mono text-[#6b7280] uppercase tracking-widest mb-2 block">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-[#13131f] border border-[#1f1f35] rounded-xl px-3 py-2.5 text-sm font-mono text-[#e8e8f0] focus:outline-none focus:border-violet-500/50 transition-colors cursor-pointer"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Focus */}
        <div>
          <label className="text-xs font-mono text-[#6b7280] uppercase tracking-widest mb-2 block">
            Focus On
          </label>
          <div className="flex flex-col gap-2">
            {FOCUS_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => toggleFocus(opt)}
                className={`px-3 py-2 rounded-lg text-xs font-mono text-left transition-all ${
                  focus.includes(opt)
                    ? "bg-violet-500/20 border border-violet-500/50 text-violet-300"
                    : "bg-[#13131f] border border-[#1f1f35] text-[#6b7280] hover:border-[#2a2a40]"
                }`}
              >
                {focus.includes(opt) ? "✓ " : "○ "}{opt}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading || !code.trim() || focus.length === 0}
          className="mt-auto w-full py-3 rounded-xl font-mono font-bold text-sm bg-gradient-to-r from-violet-500 to-sky-500 text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          {loading ? "Reviewing..." : "🚀 Review Code"}
        </button>
      </div>
    </div>
  );
}