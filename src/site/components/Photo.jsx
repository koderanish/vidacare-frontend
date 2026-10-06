import { useState } from "react";

// <img> that falls back to a green placeholder panel if the file is missing,
// so the layout never shows a broken-image icon.
export function Photo({ src, alt, className = "", icon: Icon }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-vida-500/40 to-vida-deep text-vida-300 ${className}`}
      >
        {Icon && <Icon className="h-10 w-10 opacity-70" />}
      </div>
    );
  }
  return <img src={src} alt={alt} onError={() => setFailed(true)} className={`h-full w-full object-cover ${className}`} />;
}
