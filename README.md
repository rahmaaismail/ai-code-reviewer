# 🔍 AI Code Reviewer

AI-powered code review tool built with Next.js and Claude. Detects bugs, analyzes complexity, flags security issues, and generates cleaner rewrites.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Claude API](https://img.shields.io/badge/Claude_API-8A2BE2?style=for-the-badge)
![License](https://img.shields.io/github/license/YOUR_USERNAME/ai-code-reviewer)

## Live Demo
[your-url.vercel.app](https://your-url.vercel.app)

## Features
- 🐛 Bug detection with severity ratings (High / Medium / Low)
- ⏱️ Time & space complexity analysis  
- 🔒 Security vulnerability scanning
- ✨ Clean rewrite with explanation of every change
- 📊 Code scores — overall, readability, efficiency, correctness
- Supports Python, Java, JavaScript, TypeScript, C, C++, Rust, Go, Kotlin

## Run Locally

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/ai-code-reviewer
cd ai-code-reviewer
npm install
cp .env.local.example .env.local
# Add your Anthropic API key to .env.local
npm run dev
\`\`\`

Open http://localhost:3000

## Deploy on Vercel

1. Push to GitHub
2. Import at vercel.com
3. Add `ANTHROPIC_API_KEY` in Environment Variables
4. Deploy ✅

## License
MIT