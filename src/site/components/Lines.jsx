// Headline split into lines you control. Each line is masked so it can slide up into view
// (animated by useReveal via [data-lines] / [data-line]).
export function Lines({ lines, as: Tag = "h1", className = "" }) {
  return (
    <Tag className={className} data-lines>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <span data-line className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
