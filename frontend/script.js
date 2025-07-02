console.log("Script is running");

// ✅ Replace with your actual Render backend URL:
const BACKEND_URL = "https://interactive-resume-6shg.onrender.com";

document.getElementById('generate-ai').addEventListener('click', async () => {
  const name = document.getElementById('user-name').value;
  const email = document.getElementById('user-email').value;

  const prompt = `Generate a professional message for an interactive resume site visitor named ${name} with email ${email}`;

  try {
    const response = await fetch(`${BACKEND_URL}/generate-ai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (response.ok && data.generatedText) {
      document.getElementById('user-message').value = data.generatedText;
    } else {
      alert('AI failed: ' + (data.error || 'No response from AI'));
    }
  } catch (err) {
    console.error(err);
    alert("Network error. Make sure backend is running.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document
        .querySelector(link.getAttribute("href"))
        ?.scrollIntoView({ behavior: "smooth" });
    });
  });

  const pic = document.getElementById("profilePic");
  if (pic) {
    pic.addEventListener("click", () => {
      pic.style.transition = "transform 0.3s ease";
      pic.style.transform = "rotateY(360deg)";
      setTimeout(() => (pic.style.transform = "none"), 600);
    });
  }

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
          alert("Message sent!");
          form.reset();
        } else {
          alert("Error: " + (json.error || "Unknown error"));
        }
      } catch (err) {
        console.error(err);
        alert("Network error; try again.");
      }
    });
  }

  const sections = document.querySelectorAll(".content-container section");
  const rotateSection = () => {
    const midY = window.innerHeight / 2;
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2) - midY;
      const maxOffset = midY + rect.height / 2;
      const norm = Math.max(-1, Math.min(1, offset / maxOffset));
      const angle = norm * 15;
      sec.style.transform = `rotateX(${-angle}deg)`;
    });
  };

  rotateSection();
  window.addEventListener("scroll", rotateSection);
});
