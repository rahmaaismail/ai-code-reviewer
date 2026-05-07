"use client";
import React from "react";
import { useState } from "react";
import CodeInput from "@/components/CodeInput";
import ResultsPanel from "@/components/ResultsPanel";
import { ReviewResult } from "@/types/review";

export default function Home() {
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleReview(code: string, language: string, focus: string[]) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, focus }),
      });

      if (!res.ok) throw new Error("Review failed");
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-[#1f1f35] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔍</span>
          <span className="font-mono font-bold text-lg tracking-tight">AI Code Reviewer</span>
        </div>
        <a
          href="https://github.com/rahmaaismail/ai-code-reviewer"
          target="_blank"
          className="text-sm text-[#6b7280] hover:text-[#e8e8f0] transition-colors font-mono"
        >
          GitHub ↗
        </a>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-12">
          <h1 className="font-mono text-4xl font-bold mb-3 bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            Instant Code Review
          </h1>
          <p className="text-[#6b7280] text-lg">
            Paste your code. Get bug detection, complexity analysis, and a cleaner rewrite.
          </p>
        </div>

        <CodeInput onSubmit={handleReview} loading={loading} />

        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {loading && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 text-[#6b7280]">
              <div className="w-5 h-5 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
              <span className="font-mono text-sm">Analyzing your code...</span>
            </div>
          </div>
        )}

        {result && <ResultsPanel result={result} />}
      </div>
    </main>
  );
}