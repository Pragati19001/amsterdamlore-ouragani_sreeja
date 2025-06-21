import { useEffect, useState } from "react";

export default function StoriesPage() {
  const [ticketCount, setTicketCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);

  const userId = "123";

  useEffect(() => {
    fetch(`/api/raffle-status?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setTicketCount(data.tickets ?? 0);
        setLoading(false);
      })
      .catch(() => {
        setError("❌ Error, try again.");
        setLoading(false);
      });
  }, []);

  const handleJoin = async () => {
    setJoining(true);
    try {
      const res = await fetch("/api/raffle-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (res.ok) {
        setTicketCount(data.tickets ?? ticketCount + 1);
        setError("");
      } else {
        setError(data.message || "❌ Error, try again.");
      }
    } catch {
      setError("❌ Error, try again.");
    } finally {
      setJoining(false);
    }
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "Roboto, sans-serif" }}>
      <h1>🎟️ Join the Raffle</h1>
      <p>Win exclusive Amsterdam experiences! Tickets are limited.</p>
      <p>
        {loading ? "Loading..." : error ? <span>{error}</span> : <>Tickets: {ticketCount}</>}
      </p>
      <button onClick={handleJoin} disabled={joining}>
        {joining ? "Joining..." : "Join Raffle"}
      </button>
    </main>
  );
}
