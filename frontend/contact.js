console.log("Enhanced Contact Script is running");

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

  // Handle contact type change
  const contactTypeSelect = document.getElementById('contact-type');
  const websiteSection = document.getElementById('website-section');
  
  if (contactTypeSelect && websiteSection) {
    contactTypeSelect.addEventListener('change', function() {
      if (this.value === 'website') {
        websiteSection.style.display = 'block';
        websiteSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        websiteSection.style.display = 'none';
      }
    });
  }

  // Enhanced form submission
  const form = document.getElementById("messageForm");
  if (form) {
    form.addEventListener("submit", async e => {
      e.preventDefault();
      
      // Collect basic form data
      const formData = new FormData(form);
      const data = {
        name: formData.get('name')?.trim() || '',
        email: formData.get('email')?.trim() || '',
        company: formData.get('company')?.trim() || '',
        subject: formData.get('subject')?.trim() || '',
        message: formData.get('message')?.trim() || '',
        contactType: formData.get('contactType') || '',
        websiteType: formData.get('websiteType') || '',
        timeline: formData.get('timeline') || '',
        budget: formData.get('budget') || ''
      };

      // Collect selected technologies
      const frontendTech = [];
      const backendTech = [];
      
      document.querySelectorAll('input[name="frontend[]"]:checked').forEach(checkbox => {
        frontendTech.push(checkbox.value);
      });
      
      document.querySelectorAll('input[name="backend[]"]:checked').forEach(checkbox => {
        backendTech.push(checkbox.value);
      });

      // Add technologies to data if website development is selected
      if (data.contactType === 'website') {
        data.frontendTech = frontendTech;
        data.backendTech = backendTech;
      }

      // Validate required fields
      if (!data.name || !data.email || !data.subject || !data.message || !data.contactType) {
        alert('⚠️ Please fill in all required fields.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert('⚠️ Please enter a valid email address.');
        return;
      }

      // Enhanced message formatting
      let enhancedMessage = `Contact Type: ${data.contactType}\n\n`;
      
      if (data.company) {
        enhancedMessage += `Company: ${data.company}\n`;
      }
      
      enhancedMessage += `Message:\n${data.message}\n\n`;

      // Add website development details if applicable
      if (data.contactType === 'website') {
        enhancedMessage += `--- WEBSITE DEVELOPMENT DETAILS ---\n`;
        enhancedMessage += `Website Type: ${data.websiteType || 'Not specified'}\n`;
        enhancedMessage += `Timeline: ${data.timeline || 'Not specified'}\n`;
        enhancedMessage += `Budget: ${data.budget || 'Not specified'}\n`;
        
        if (frontendTech.length > 0) {
          enhancedMessage += `Frontend Technologies: ${frontendTech.join(', ')}\n`;
        }
        
        if (backendTech.length > 0) {
          enhancedMessage += `Backend Technologies: ${backendTech.join(', ')}\n`;
        }
        
        enhancedMessage += `\n⚠️ This is a PAID SERVICE inquiry.\n`;
      }

      enhancedMessage += `\nSubmitted: ${new Date().toLocaleString()}`;

      // Prepare final data for submission
      const submissionData = {
        name: data.name,
        email: data.email,
        subject: `[${data.contactType.toUpperCase()}] ${data.subject}`,
        message: enhancedMessage
      };

      // Show loading state
      const submitButton = form.querySelector('.btn');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = '📤 Sending...';
      submitButton.disabled = true;
      submitButton.style.opacity = '0.7';

      try {
        const res = await fetch(`${BACKEND_URL}/send-message`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData)
        });

        const json = await res.json();

        if (res.ok && json.success) {
          // Success handling
          submitButton.textContent = '✅ Message Sent!';
          submitButton.style.background = 'linear-gradient(135deg, #00ff88, #00dd66)';
          
          // Show success message based on contact type
          let successMessage = '✅ Message sent successfully!';
          
          if (data.contactType === 'website') {
            successMessage += '\n\n💼 Your website development inquiry has been received. You can expect a detailed response within 24-48 hours with project discussion and pricing information.';
          } else {
            successMessage += '\n\n📬 Yash will get back to you soon regarding your inquiry.';
          }
          
          alert(successMessage);
          
          // Reset form
          form.reset();
          websiteSection.style.display = 'none';
          
          // Reset button after delay
          setTimeout(() => {
            submitButton.textContent = originalButtonText;
            submitButton.style.background = '';
            submitButton.disabled = false;
            submitButton.style.opacity = '';
          }, 3000);
          
        } else {
          throw new Error(json.error || 'Unknown error occurred');
        }
        
      } catch (err) {
        console.error('Send Error:', err);
        
        // Error handling
        submitButton.textContent = '❌ Failed to Send';
        submitButton.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e53)';
        
        alert("⚠️ Network error or server issue. Please try again or contact directly at yashch11@gmail.com");
        
        // Reset button after delay
        setTimeout(() => {
          submitButton.textContent = originalButtonText;
          submitButton.style.background = '';
          submitButton.disabled = false;
          submitButton.style.opacity = '';
        }, 3000);
      }
    });
  }

  // Add enhanced form interactions
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // Add fade-in animations for form sections
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.form-section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(section);
  });

  console.log("✅ Enhanced Contact Script initialized successfully");
});