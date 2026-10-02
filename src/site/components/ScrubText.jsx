// Big paragraph whose words light up as the reader scrolls (animated by useReveal via [data-scrub]).
export function ScrubText({ text, highlight = [], className = "" }) {
  const words = text.split(" ");
  return (
    <p className={className} data-scrub>
      {words.map((word, i) => {
        const clean = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
        const isHighlight = highlight.includes(clean);
        return (
          <span key={i}>
            <span data-word className={isHighlight ? "text-vida-500" : ""}>
              {word}
            </span>{" "}
          </span>
        );
      })}
    </p>
  );
}
