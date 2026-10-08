// Client-supplied VidaCare Technologies logo. On dark backgrounds (`light`) the
// client's circular logo is used so the dark purple wordmark stays readable.
export function Logo({ light = false }) {
  if (light) {
    return (
      <img
        src="/images/logo-circle.png"
        alt="VidaCare Technologies"
        className="h-14 w-14 rounded-full"
      />
    );
  }
  return <img src="/images/logo.png" alt="VidaCare Technologies" className="h-9 w-auto md:h-10" />;
}
