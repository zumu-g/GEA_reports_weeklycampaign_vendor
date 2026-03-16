interface FeedbackRow {
  date: string;
  buyer: string;
  sentiment: string;
  comments: string;
}

interface BuyerFeedbackProps {
  feedback: FeedbackRow[];
}

function sentimentStyle(sentiment: string) {
  const s = sentiment.toLowerCase();
  if (s.includes("positive") || s.includes("keen") || s.includes("strong"))
    return { bg: "bg-success-soft", text: "text-success" };
  if (s.includes("negative") || s.includes("not") || s.includes("low"))
    return { bg: "bg-danger-soft", text: "text-danger" };
  return { bg: "bg-background-secondary", text: "text-foreground-secondary" };
}

export default function BuyerFeedback({ feedback }: BuyerFeedbackProps) {
  if (feedback.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-border-light p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-foreground">Buyer Feedback</h3>
        <span className="text-xs text-muted">{feedback.length} responses</span>
      </div>

      <div className="space-y-3">
        {feedback.map((fb, i) => {
          const style = sentimentStyle(fb.sentiment);
          return (
            <div key={i} className="bg-background-secondary rounded-2xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-foreground">{fb.buyer || "Anonymous Buyer"}</p>
                  {fb.date && <p className="text-xs text-muted mt-0.5">{fb.date}</p>}
                </div>
                {fb.sentiment && (
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${style.bg} ${style.text}`}>
                    {fb.sentiment}
                  </span>
                )}
              </div>
              {fb.comments && (
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  &ldquo;{fb.comments}&rdquo;
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
