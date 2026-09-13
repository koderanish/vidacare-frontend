import { useEffect, useState } from "react";

const LAUNCH_DATE = new Date("2026-10-04T00:00:00"); // 20 days out

function getTimeLeft() {
  const diff = Math.max(0, LAUNCH_DATE - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="container">
      <h1 className="logo">VidaCare</h1>
      <p className="tagline">
        Health monitoring, journaling, and care — all in one place.
      </p>
      <h2 className="coming-soon">Coming Soon</h2>
      <div className="countdown" role="timer" aria-label="Time until launch">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div className="unit" key={unit}>
            <span className="value">{String(value).padStart(2, "0")}</span>
            <span className="label">{unit}</span>
          </div>
        ))}
      </div>
      <p className="note">We're building something for your health. Stay tuned.</p>
    </main>
  );
}
