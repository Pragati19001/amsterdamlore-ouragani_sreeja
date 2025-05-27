// pages/api/raffle-status.js

export default function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId parameter" });
  }

  // Mock data — in real app, fetch from DB
  const mockData = {
    joined: true,
    tickets: 3,
  };

  res.status(200).json(mockData);
}
