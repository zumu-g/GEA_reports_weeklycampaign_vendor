interface DailyQuoteProps {
  text: string;
  author: string;
}

export default function DailyQuote({ text, author }: DailyQuoteProps) {
  return (
    <div className="pt-12 pb-4 text-center">
      <p className="font-display text-5xl text-accent leading-none mb-5 select-none" aria-hidden="true">&ldquo;</p>
      <p className="font-display text-base font-medium text-foreground leading-relaxed max-w-sm mx-auto mb-4">
        {text}
      </p>
      <p className="font-body text-xs text-muted">&mdash;&nbsp;{author}</p>
    </div>
  );
}
