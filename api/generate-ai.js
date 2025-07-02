export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { prompt } = req.body;

  try {
    const result = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
      }
    );
    const json = await result.json();
    const response = json?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    res.status(200).json({ response });
  } catch (err) {
    res.status(500).json({ error: "Gemini error: " + err.message });
  }
}
