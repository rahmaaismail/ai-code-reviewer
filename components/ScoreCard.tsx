interface Props {
    label: string;
    score: number;
    large?: boolean;
  }
  
  function scoreColor(score: number) {
    if (score >= 8) return "#34d399";
    if (score >= 5) return "#fbbf24";
    return "#f87171";
  }
  
  export default function ScoreCard({ label, score, large = false }: Props) {
    const color = scoreColor(score);
    return (
      <div className="bg-[#13131f] border border-[#1f1f35] rounded-xl p-4 text-center">
        <div
          className={`font-mono font-bold ${large ? "text-5xl" : "text-3xl"}`}
          style={{ color }}
        >
          {score}
          <span className="text-[#3a3a5c] text-lg">/10</span>
        </div>
        <div className="text-[#6b7280] text-xs uppercase tracking-widest mt-1 font-mono">
          {label}
        </div>
      </div>
    );
  }