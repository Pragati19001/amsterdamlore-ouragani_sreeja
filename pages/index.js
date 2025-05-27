import { useEffect, useState } from "react";

export default function Home() {
  const [ticketCount, setTicketCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);
  const [raffleHover, setRaffleHover] = useState(false);
  const [careDuelHover, setCareDuelHover] = useState(false);

  const userId = "123"; // Replace with real user ID

  useEffect(() => {
    fetch(`/api/raffle-status?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setTicketCount(data.tickets ?? 0);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to fetch raffle status.");
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
        setError(data.message || "Entry failed.");
      }
    } catch {
      setError("Failed to join the raffle.");
    } finally {
      setJoining(false);
    }
  };

  const styles = {
    main: {
      position: "relative",
      minHeight: "100vh",
      padding: "2vh 2vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      fontFamily: "Roboto, sans-serif",
      background: "#f9fafb",
      overflow: "hidden",
      maxWidth: "100vw",
      boxSizing: "border-box",
    },
    header: {
      textAlign: "center",
      maxWidth: "36rem",
      margin: "0 auto",
      padding: "0 1rem",
    },
    title: {
      fontSize: "2rem",
      fontFamily: "Raleway, sans-serif",
      fontWeight: "800",
      color: "#111827",
      marginBottom: "0.75rem",
    },
    subtitle: {
      fontSize: "1.125rem",
      color: "#374151",
      lineHeight: "1.6",
    },
    container: {
      maxWidth: "36rem",
      margin: "0 auto",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "2rem",
      padding: "0 1rem",
    },
    raffleSection: {
      borderRadius: "1.25rem",
      backgroundColor: raffleHover ? "#f3f4f6" : "#fff",
      padding: "2rem",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      transition: "background-color 0.3s ease",
      flexShrink: 0,
    },
    raffleTitle: {
      fontSize: "1.5rem",
      fontFamily: "Raleway, sans-serif",
      fontWeight: "700",
      marginBottom: "1rem",
      color: "#111827",
    },
    raffleText: {
      marginBottom: "1.25rem",
      color: "#4b5563",
      fontSize: "1rem",
    },
    ticketCount: {
      marginBottom: "2rem",
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#1f2937",
    },
    raffleButton: {
      backgroundColor: "#FF6F00",
      color: "#fff",
      fontWeight: "600",
      padding: "0.75rem 2rem",
      borderRadius: "1.25rem",
      fontSize: "1rem",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      opacity: joining ? 0.6 : 1,
      cursor: joining ? "not-allowed" : "pointer",
      border: "none",
      transition: "background-color 0.3s ease",
      width: "100%",
      maxWidth: "250px",
      alignSelf: "center",
    },
    careDuelSection: {
      borderRadius: "1.25rem",
      backgroundImage: "linear-gradient(to right, #0288D1, #0277BD)",
      color: "#fff",
      padding: "2rem",
      flexShrink: 0,
      backgroundColor: careDuelHover ? "#039be5" : undefined,
      textAlign: "center",
      transition: "background-color 0.3s ease",
    },
    careDuelTitle: {
      fontSize: "1.5rem",
      fontFamily: "Raleway, sans-serif",
      fontWeight: "700",
      marginBottom: "1rem",
    },
    careDuelText: {
      marginBottom: "1.25rem",
      fontSize: "1rem",
    },
    careDuelLink: {
      display: "inline-block",
      border: "2px solid #fff",
      color: careDuelHover ? "#0288D1" : "#fff",
      backgroundColor: careDuelHover ? "#fff" : "transparent",
      padding: "0.75rem 1.5rem",
      borderRadius: "1.25rem",
      fontWeight: "600",
      fontSize: "1rem",
      textDecoration: "none",
      transition: "all 0.3s ease",
    },
    footer: {
      textAlign: "center",
      fontSize: "0.875rem",
      color: "#6b7280",
      marginTop: "1vh",
      padding: "0 1rem",
    },
  };

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <h1 style={styles.title}>AmsterdamLore.com</h1>
        <p style={styles.subtitle}>
          Discover the tales, legends, and culture of Amsterdam through shared stories.
        </p>
      </header>

      <div style={styles.container}>
        <section
          aria-label="Join the raffle"
          onMouseEnter={() => setRaffleHover(true)}
          onMouseLeave={() => setRaffleHover(false)}
          style={styles.raffleSection}
        >
          <h2 style={styles.raffleTitle}>🎟️ Join the Raffle</h2>
          <p style={styles.raffleText}>Win exclusive Amsterdam experiences! Tickets are limited.</p>
          <p style={styles.ticketCount}>
            {loading ? (
              "Loading..."
            ) : error ? (
              <span style={{ color: "#dc2626" }}>{error}</span>
            ) : (
              <>Tickets: {ticketCount}</>
            )}
          </p>
          <button disabled={joining} onClick={handleJoinRaffle} style={styles.raffleButton}>
            {joining ? "Joining..." : "Join Raffle"}
          </button>
        </section>

        <section
          aria-label="CareDuel Topic of the Week"
          onMouseEnter={() => setCareDuelHover(true)}
          onMouseLeave={() => setCareDuelHover(false)}
          style={styles.careDuelSection}
        >
          <h2 style={styles.careDuelTitle}>🌟 Topic of the Week</h2>
          <p style={styles.careDuelText}>Explore exciting new stories on CareDuel.</p>
          <a
            href="https://careduel.com/topic-of-the-week"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.careDuelLink}
          >
            Explore Now
          </a>
        </section>
      </div>

      <footer style={styles.footer}>© 2025 AmsterdamLore. All rights reserved.</footer>
    </main>
  );
}




















