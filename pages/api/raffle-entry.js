// pages/api/raffle-entry.js

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId in body" });
  }

  // Mock adding user to raffle (no DB, so just return success)
  res.status(200).json({ success: true, message: "User entered in raffle!" });
}
