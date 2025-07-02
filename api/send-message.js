import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ error: "All fields required" });

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    await db.collection("contacts").insertOne({
      name,
      email,
      message,
      timestamp: new Date()
    });
    res.status(200).json({ success: "Message received!" });
  } catch (err) {
    res.status(500).json({ error: "DB error: " + err.message });
  }
}
