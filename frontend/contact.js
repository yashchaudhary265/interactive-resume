console.log("Contact Script is running");

// ✅ Replace with your actual Render backend URL:
const BACKEND_URL = "https://interactive-resume-6shg.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document
        .querySelector(link.getAttribute("href"))
        ?.scrollIntoView({ behavior: "smooth" });
    });
  });

  const form = document.getElementById("messageForm");
  if (form) {
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const data = {
        name: form.name.value.trim(),
        email: form.email?.value.trim() || "",
        message: form.message.value.trim()
      };

      try {
        const res = await fetch(`${BACKEND_URL}/send-message`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const json = await res.json();

        if (res.ok && json.success) {
          alert("✅ Message sent!");
          form.reset();
        } else {
          alert("❌ Error: " + (json.error || "Unknown error"));
        }
      } catch (err) {
        console.error(err);
        alert("⚠️ Network error; try again.");
      }
    });
  }
});
