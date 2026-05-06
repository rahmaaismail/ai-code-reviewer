import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

function buildPrompt(code: string, language: string, focus: string[]): string {
  return `You are a senior software engineer at a top tech company doing a thorough code review.

Analyze the following ${language} code and respond ONLY with a valid JSON object (no markdown, no backticks).

Focus areas: ${focus.join(", ")}

Code to review:
\`\`\`
${code}
\`\`\`

Return exactly this JSON structure:
{
  "summary": "2-3 sentence overall assessment",
  "complexity": {
    "time": "O(...) with explanation",
    "space": "O(...) with explanation",
    "rating": "Good|Acceptable|Poor"
  },
  "bugs": [
    {
      "line": "line number or range or general",
      "severity": "High|Medium|Low",
      "issue": "description of the bug",
      "fix": "how to fix it"
    }
  ],
  "security_issues": [
    {
      "issue": "description",
      "severity": "High|Medium|Low"
    }
  ],
  "score": {
    "overall": 0-10,
    "readability": 0-10,
    "efficiency": 0-10,
    "correctness": 0-10
  },
  "rewrite": "the full improved version of the code",
  "rewrite_explanation": "bullet points explaining what changed and why"
}

If no bugs or security issues, return empty arrays. Be honest and specific.`;
}

export async function POST(req: NextRequest) {
  try {
    const { code, language, focus } = await req.json();

    if (!code || !language || !focus) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [{ role: "user", content: buildPrompt(code, language, focus) }],
    });

    const raw = (message.content[0] as { type: string; text: string }).text.trim();
    const cleaned = raw.startsWith("```")
      ? raw.split("```")[1].replace(/^json\n?/, "")
      : raw;

    const result = JSON.parse(cleaned);
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to analyze code" }, { status: 500 });
  }
}