// pages/stories.js
import { useEffect, useState } from "react";

export default function Stories() {
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

  const handleJoinRaffle = async () => {
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
    <main style={{ padding: "2rem", fontFamily: "Lora, serif" }}>
      <h1>🎟️ Raffle Widget</h1>
      <p>Check your raffle status and enter if you haven't!</p>

      <p>
        {loading
          ? "Loading..."
          : error
          ? <span style={{ color: "red" }}>{error}</span>
          : `Tickets: ${ticketCount}`}
      </p>

      <button
        onClick={handleJoinRaffle}
        disabled={joining}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#E91E63",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        {joining ? "Joining..." : "Join the Raffle"}
      </button>
    </main>
  );
}
