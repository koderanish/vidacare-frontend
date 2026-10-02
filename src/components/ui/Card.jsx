export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-white rounded-xl2 border border-ink-900/5 shadow-card p-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
