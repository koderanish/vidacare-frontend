// Client-supplied VidaCare Technologies logo. The wordmark is dark purple, so on
// dark backgrounds (`light`) it sits on a white pill to stay readable.
export function Logo({ light = false }) {
  const img = <img src="/images/logo.png" alt="VidaCare Technologies" className="h-9 w-auto md:h-10" />;
  if (!light) return img;
  return <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5">{img}</span>;
}
