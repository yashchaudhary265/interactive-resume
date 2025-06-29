console.log("Script is running");

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

  // Profile pic spin
  const pic = document.getElementById("profilePic");
  if (pic) {
    pic.addEventListener("click", () => {
      pic.style.transition = "transform 0.3s ease";
      pic.style.transform = "rotateY(360deg)";
      setTimeout(() => (pic.style.transform = "none"), 600);
    });
  }

  // Contact form submit
  const form = document.getElementById("messageForm");
  if (form) {
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim()
      };

      try {
        const res = await fetch("/send-message", {
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

  // 3D rotate sections on scroll
  const sections = document.querySelectorAll(".content-container section");
  const rotateSection = () => {
    const midY = window.innerHeight / 2;
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2) - midY;
      const maxOffset = midY + rect.height / 2;
      const norm = Math.max(-1, Math.min(1, offset / maxOffset));
      const angle = norm * 15;
      sec.style.transform = `rotateX(${ -angle }deg)`;
    });
  };

  rotateSection();
  window.addEventListener("scroll", rotateSection);
});
