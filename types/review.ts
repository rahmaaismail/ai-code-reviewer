export interface Bug {
    line: string;
    severity: "High" | "Medium" | "Low";
    issue: string;
    fix: string;
  }
  
  export interface SecurityIssue {
    issue: string;
    severity: "High" | "Medium" | "Low";
  }
  
  export interface ReviewResult {
    summary: string;
    complexity: {
      time: string;
      space: string;
      rating: "Good" | "Acceptable" | "Poor";
    };
    bugs: Bug[];
    security_issues: SecurityIssue[];
    score: {
      overall: number;
      readability: number;
      efficiency: number;
      correctness: number;
    };
    rewrite: string;
    rewrite_explanation: string;
  }