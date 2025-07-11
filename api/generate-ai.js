export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { prompt } = req.body;

  try {
    const result = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
      }
    );
    
    const json = await result.json();
    
    // Enhanced error handling
    if (!json.candidates || json.candidates.length === 0) {
      return res.status(500).json({ 
        error: "No response generated from AI",
        details: json.error || "Unknown error"
      });
    }
    
    const generatedText = json?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated";
    
    // ✅ Fixed: Return 'generatedText' key to match enhanced script
    res.status(200).json({ 
      generatedText,
      success: true,
      timestamp: new Date().toISOString()
    });
    
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ 
      error: "Gemini error: " + err.message,
      success: false
    });
  }
}