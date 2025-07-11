console.log("Enhanced Interactive Resume Script Loading...");

// ✅ Backend URL Configuration
const BACKEND_URL = "https://interactive-resume-6shg.onrender.com";

// 🎯 Enhanced Revolving Sections Animation System
class RevolvingSections {
  constructor() {
    this.sections = document.querySelectorAll('.revolving-section');
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollEffects();
    this.setupInitialAnimations();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.triggerSectionAnimation(entry.target);
        }
      });
    }, this.observerOptions);

    this.sections.forEach(section => observer.observe(section));
  }

  triggerSectionAnimation(section) {
    // Add enhanced entrance animation
    section.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // Trigger typing animation for titles
    const title = section.querySelector('.section-title');
    if (title) {
      setTimeout(() => {
        title.style.animation = 'typing 2s steps(40, end) forwards, blink 0.75s step-end infinite';
      }, 300);
    }
  }

  setupScrollEffects() {
    let ticking = false;
    
    const updateSections = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      this.sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distanceFromCenter = sectionCenter - windowHeight / 2;
        const normalizedDistance = distanceFromCenter / (windowHeight / 2);
        
        // Enhanced 3D transform calculations
        const rotateY = Math.max(-45, Math.min(45, normalizedDistance * 12));
        const translateZ = Math.max(-80, Math.min(0, -Math.abs(normalizedDistance) * 40));
        const scale = Math.max(0.95, Math.min(1, 1 - Math.abs(normalizedDistance) * 0.05));
        
        // Apply transforms with perspective
        section.style.transform = `
          perspective(1000px) 
          rotateY(${rotateY}deg) 
          translateZ(${translateZ}px) 
          scale(${scale})
        `;
        
        // Dynamic opacity based on distance
        const opacity = Math.max(0.6, Math.min(1, 1 - Math.abs(normalizedDistance) * 0.3));
        section.style.opacity = section.classList.contains('visible') ? opacity : 0;
      });
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateSections);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
    window.addEventListener('load', updateSections);
  }

  setupInitialAnimations() {
    // Staggered entrance animations
    this.sections.forEach((section, index) => {
      section.style.opacity = '0';
      setTimeout(() => {
        if (this.isInViewport(section)) {
          section.classList.add('visible');
        }
      }, index * 150);
    });
  }

  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

// 🤖 Enhanced AI System with RAG Implementation
class EnhancedAI {
  constructor() {
    this.button = document.getElementById('generate-ai');
    this.buttonText = this.button?.querySelector('.button-text');
    this.isLoading = false;
    this.init();
  }

  init() {
    if (this.button) {
      this.button.addEventListener('click', () => this.generateMessage());
      this.setupButtonHoverEffects();
    }
  }

  setupButtonHoverEffects() {
    this.button.addEventListener('mouseenter', () => {
      if (!this.isLoading) {
        this.enhanceParticles();
      }
    });

    this.button.addEventListener('mouseleave', () => {
      if (!this.isLoading) {
        this.resetParticles();
      }
    });
  }

  enhanceParticles() {
    const particles = document.getElementById('particles-js');
    if (particles) {
      particles.style.filter = 'hue-rotate(60deg) brightness(1.3) saturate(1.2)';
      particles.style.transition = 'filter 0.3s ease';
    }
  }

  resetParticles() {
    const particles = document.getElementById('particles-js');
    if (particles && !document.body.classList.contains('ai-loading')) {
      particles.style.filter = '';
    }
  }

  async generateMessage() {
    if (this.isLoading) return;

    const name = document.getElementById('user-name')?.value || '';
    const email = document.getElementById('user-email')?.value || '';
    const companyDesc = document.getElementById('company-description')?.value || '';

    // Start loading state
    this.startLoading();

    try {
      const prompt = this.buildEnhancedPrompt(name, email, companyDesc);
      const response = await this.callAIAPI(prompt);
      
      if (response.ok && response.data.generatedText) {
        this.handleSuccess(response.data.generatedText);
      } else {
        throw new Error(response.data.error || 'AI generation failed');
      }
    } catch (error) {
      this.handleError(error);
    } finally {
      this.stopLoading();
    }
  }

  buildEnhancedPrompt(name, email, companyDesc) {
    let prompt = `You are an AI assistant helping to generate professional messages for Yash Chaudhary's interactive resume website.

CONTEXT ABOUT YASH:
- Computer Science student at JIIT Noida (2023-2026)
- Full-stack MERN developer passionate about building innovative web applications
- Core Technologies: MongoDB, Express.js, React.js, Node.js, Python, JavaScript
- Specializations: AI integration, data visualization, responsive UI/UX design
- Recent Experience: Full Stack Developer Intern at Unified Mentor (Jun-Aug 2025)
- Key Projects: 
  * INVEST Platform: MERN stack platform connecting entrepreneurs with investors
  * Soil Farming Agent: Interactive globe-based farming intelligence portal with AI features
- Skills: Power BI, SQL, Git, Next.js, Data Analysis, Problem Solving
- Certifications: Microsoft & LinkedIn (Data Analysis), AWS, HackerRank

VISITOR INFORMATION:
- Name: ${name || 'Professional Visitor'}
- Email: ${email || 'Not provided'}`;

    if (companyDesc.trim()) {
      prompt += `
- Company/Organization: ${companyDesc}

ADVANCED RAG INSTRUCTIONS:
Based on the company description provided, please:
1. Analyze their industry/sector and identify relevant skills from Yash's profile
2. Reference specific technologies or approaches that align with their needs
3. Suggest concrete collaboration opportunities or project ideas
4. Highlight relevant experience (e.g., if they mention data, emphasize Power BI/SQL skills)
5. If they mention startups/investment, reference the INVEST platform
6. If they mention agriculture/environment, reference the Soil Farming Agent
7. For tech companies, emphasize MERN stack and AI integration capabilities

Generate a personalized 2-3 paragraph professional message that feels specifically tailored to their organization.`;
    } else {
      prompt += `

STANDARD INSTRUCTIONS:
Generate a professional, engaging 2-3 paragraph message that:
1. Introduces Yash's full-stack development expertise
2. Highlights his passion for building innovative, scalable solutions
3. Mentions his recent internship and key projects
4. Suggests potential collaboration in web development, AI integration, or data solutions
5. Maintains an enthusiastic yet professional tone`;
    }

    prompt += `

TONE: Professional, confident, enthusiastic, and personalized
LENGTH: 2-3 well-structured paragraphs
STYLE: Direct, action-oriented, and relationship-building focused`;

    return prompt;
  }

  async callAIAPI(prompt) {
    try {
      const response = await fetch(`${BACKEND_URL}/generate-ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      return { ok: response.ok, data };
    } catch (error) {
      throw new Error(`Network error: ${error.message}`);
    }
  }

  startLoading() {
    this.isLoading = true;
    document.body.classList.add('ai-loading');
    this.button.classList.add('loading');
    
    if (this.buttonText) {
      this.buttonText.textContent = '🧠 AI Generating...';
    }

    // Enhanced particle effects during loading
    const particles = document.getElementById('particles-js');
    if (particles) {
      particles.style.filter = 'hue-rotate(120deg) brightness(1.8) saturate(1.5)';
      particles.style.animation = 'aiPulse 0.5s ease-in-out infinite alternate';
    }
  }

  stopLoading() {
    this.isLoading = false;
    document.body.classList.remove('ai-loading');
    this.button.classList.remove('loading');

    // Reset particles
    const particles = document.getElementById('particles-js');
    if (particles) {
      particles.style.filter = '';
      particles.style.animation = '';
    }
  }

  handleSuccess(generatedText) {
    const messageTextarea = document.getElementById('user-message');
    if (messageTextarea) {
      messageTextarea.value = generatedText;
      messageTextarea.style.border = '2px solid #00ff88';
      setTimeout(() => {
        messageTextarea.style.border = '';
      }, 2000);
    }

    if (this.buttonText) {
      this.buttonText.textContent = '✅ Generated!';
      setTimeout(() => {
        this.buttonText.textContent = '🤖 Generate with AI';
      }, 2000);
    }
  }

  handleError(error) {
    console.error('AI Generation Error:', error);
    
    if (this.buttonText) {
      this.buttonText.textContent = '❌ Try Again';
      setTimeout(() => {
        this.buttonText.textContent = '🤖 Generate with AI';
      }, 3000);
    }

    alert('AI generation failed. Please try again or write your message manually.');
  }
}

// 📧 Enhanced Form Handler
class FormHandler {
  constructor() {
    this.form = document.getElementById('messageForm');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      this.setupFormValidation();
    }
  }

  setupFormValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const wrapper = field.closest('.input-wrapper');
    if (!wrapper) return;

    if (field.hasAttribute('required') && !field.value.trim()) {
      wrapper.style.borderColor = '#ff6b6b';
      return false;
    }

    if (field.type === 'email' && field.value && !this.isValidEmail(field.value)) {
      wrapper.style.borderColor = '#ff6b6b';
      return false;
    }

    wrapper.style.borderColor = '#00ffcc';
    return true;
  }

  clearFieldError(field) {
    const wrapper = field.closest('.input-wrapper');
    if (wrapper) {
      wrapper.style.borderColor = '';
    }
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async handleSubmit(e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById('user-name')?.value.trim() || '',
      email: document.getElementById('user-email')?.value.trim() || '',
      message: document.getElementById('user-message')?.value.trim() || ''
    };

    // Validate all fields
    if (!this.validateFormData(formData)) return;

    const sendButton = this.form.querySelector('.send-button');
    const originalText = sendButton.textContent;

    try {
      this.startSending(sendButton);
      
      const response = await fetch(`${BACKEND_URL}/send-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        this.handleSendSuccess(sendButton, originalText);
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      this.handleSendError(sendButton, originalText, error);
    }
  }

  validateFormData(data) {
    if (!data.name || !data.email || !data.message) {
      alert('Please fill in all required fields.');
      return false;
    }

    if (!this.isValidEmail(data.email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    return true;
  }

  startSending(button) {
    button.textContent = '📤 Sending...';
    button.style.opacity = '0.7';
    button.disabled = true;
  }

  handleSendSuccess(button, originalText) {
    button.textContent = '✅ Sent!';
    button.style.background = 'linear-gradient(135deg, #00ff88, #00dd66)';
    button.disabled = false;

    // Reset form
    this.form.reset();
    const companyDesc = document.getElementById('company-description');
    if (companyDesc) companyDesc.value = '';

    // Clear any field styling
    const wrappers = this.form.querySelectorAll('.input-wrapper');
    wrappers.forEach(wrapper => wrapper.style.borderColor = '');

    alert('✅ Message sent successfully! Yash will get back to you soon.');

    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
    }, 3000);
  }

  handleSendError(button, originalText, error) {
    console.error('Send Error:', error);
    button.textContent = '❌ Failed';
    button.disabled = false;
    alert('Failed to send message. Please try again.');

    setTimeout(() => {
      button.textContent = originalText;
      button.style.opacity = '';
    }, 3000);
  }
}

// 🎨 Enhanced UI Effects
class UIEffects {
  constructor() {
    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.setupProfileImageInteraction();
    this.setupSkillBubbleEffects();
    this.setupProjectCardEffects();
    this.setupParticleInteractions();
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  setupProfileImageInteraction() {
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
      profileImg.addEventListener('click', () => {
        profileImg.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        profileImg.style.transform = 'rotateY(360deg) scale(1.15)';
        
        setTimeout(() => {
          profileImg.style.transform = '';
        }, 800);
      });
    }
  }

  setupSkillBubbleEffects() {
    document.querySelectorAll('.skill-bubble').forEach(bubble => {
      bubble.addEventListener('mouseenter', () => {
        bubble.style.animationPlayState = 'paused';
        bubble.style.transform = 'translateY(-15px) scale(1.15) rotateY(10deg)';
        bubble.style.boxShadow = '0 15px 35px rgba(0, 212, 255, 0.5)';
      });
      
      bubble.addEventListener('mouseleave', () => {
        bubble.style.animationPlayState = 'running';
        bubble.style.transform = '';
        bubble.style.boxShadow = '';
      });

      // Add click effect
      bubble.addEventListener('click', () => {
        bubble.style.transform = 'scale(0.95)';
        setTimeout(() => {
          bubble.style.transform = '';
        }, 150);
      });
    });
  }

  setupProjectCardEffects() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) rotateX(2deg)';
        card.style.boxShadow = '0 20px 40px rgba(0, 255, 204, 0.3)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  }

  setupParticleInteractions() {
    const particles = document.getElementById('particles-js');
    if (!particles) return;

    // Mouse move effect on particles
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      particles.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px)`;
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
      particles.style.transform = '';
    });
  }
}

// 🎵 Enhanced Particles Configuration
class ParticleSystem {
  constructor() {
    this.init();
  }

  init() {
    if (typeof particlesJS !== 'undefined') {
      this.loadParticles();
    } else {
      // Fallback if particles.js isn't loaded
      console.warn('Particles.js not loaded, skipping particle initialization');
    }
  }

  loadParticles() {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 120,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#00d4ff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          }
        },
        "opacity": {
          "value": 0.8,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.4,
            "sync": false
          }
        },
        "size": {
          "value": 5,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 2,
            "size_min": 1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#00d4ff",
          "opacity": 0.6,
          "width": 1.5
        },
        "move": {
          "enable": true,
          "speed": 3,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": true,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 120,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }

  // Method to dynamically change particle effects
  updateParticleMode(mode) {
    const particles = document.getElementById('particles-js');
    if (!particles) return;

    switch (mode) {
      case 'ai-loading':
        particles.style.filter = 'hue-rotate(120deg) brightness(1.8) saturate(1.5)';
        particles.style.animation = 'aiPulse 0.5s ease-in-out infinite alternate';
        break;
      case 'success':
        particles.style.filter = 'hue-rotate(80deg) brightness(1.4)';
        break;
      case 'error':
        particles.style.filter = 'hue-rotate(0deg) brightness(1.2) saturate(1.3)';
        break;
      default:
        particles.style.filter = '';
        particles.style.animation = '';
    }
  }
}

// 📱 Responsive Design Handler
class ResponsiveHandler {
  constructor() {
    this.init();
  }

  init() {
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());
  }

  handleResize() {
    const width = window.innerWidth;
    
    if (width <= 768) {
      this.setupMobileOptimizations();
    } else {
      this.setupDesktopOptimizations();
    }
  }

  setupMobileOptimizations() {
    // Reduce particle count for mobile performance
    const particles = document.getElementById('particles-js');
    if (particles && window.pJSDom && window.pJSDom[0]) {
      window.pJSDom[0].pJS.particles.number.value = 60;
      window.pJSDom[0].pJS.fn.particlesRefresh();
    }

    // Adjust section animations for mobile
    document.querySelectorAll('.revolving-section').forEach(section => {
      section.style.transform = 'none';
      section.style.transition = 'opacity 0.5s ease';
    });
  }

  setupDesktopOptimizations() {
    // Restore full particle count for desktop
    const particles = document.getElementById('particles-js');
    if (particles && window.pJSDom && window.pJSDom[0]) {
      window.pJSDom[0].pJS.particles.number.value = 120;
      window.pJSDom[0].pJS.fn.particlesRefresh();
    }
  }
}

// 🎯 Performance Monitor
class PerformanceMonitor {
  constructor() {
    this.performanceData = {
      loadTime: 0,
      renderTime: 0,
      interactionTime: 0
    };
    this.init();
  }

  init() {
    this.measureLoadTime();
    this.setupPerformanceObserver();
  }

  measureLoadTime() {
    window.addEventListener('load', () => {
      this.performanceData.loadTime = performance.now();
      console.log(`🚀 Enhanced Resume loaded in ${this.performanceData.loadTime.toFixed(2)}ms`);
    });
  }

  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint') {
            console.log(`🎨 ${entry.name}: ${entry.startTime.toFixed(2)}ms`);
          }
        }
      });
      observer.observe({ entryTypes: ['paint'] });
    }
  }
}

// 🔧 Main Application Initialization
class EnhancedResumeApp {
  constructor() {
    this.components = {};
    this.init();
  }

  async init() {
    console.log('🎯 Initializing Enhanced Resume Application...');
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Initialize all components
      this.components.performanceMonitor = new PerformanceMonitor();
      this.components.particleSystem = new ParticleSystem();
      this.components.revolvingSections = new RevolvingSections();
      this.components.enhancedAI = new EnhancedAI();
      this.components.formHandler = new FormHandler();
      this.components.uiEffects = new UIEffects();
      this.components.responsiveHandler = new ResponsiveHandler();

      console.log('✅ All components initialized successfully');
      
      // Setup global event listeners
      this.setupGlobalEvents();
      
      // Initialize any additional features
      this.initializeAdditionalFeatures();
      
    } catch (error) {
      console.error('❌ Error initializing components:', error);
    }
  }

  setupGlobalEvents() {
    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + G for AI generation
      if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
        e.preventDefault();
        const aiButton = document.getElementById('generate-ai');
        if (aiButton) aiButton.click();
      }
      
      // Escape to clear AI loading state
      if (e.key === 'Escape' && document.body.classList.contains('ai-loading')) {
        document.body.classList.remove('ai-loading');
        const aiButton = document.getElementById('generate-ai');
        if (aiButton) {
          aiButton.classList.remove('loading');
          const buttonText = aiButton.querySelector('.button-text');
          if (buttonText) buttonText.textContent = '🤖 Generate with AI';
        }
      }
    });

    // Global error handling
    window.addEventListener('error', (e) => {
      console.error('Global error caught:', e.error);
    });

    // Visibility change handling (for performance optimization)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Pause animations when tab is not visible
        document.querySelectorAll('.skill-bubble').forEach(bubble => {
          bubble.style.animationPlayState = 'paused';
        });
      } else {
        // Resume animations when tab becomes visible
        document.querySelectorAll('.skill-bubble').forEach(bubble => {
          bubble.style.animationPlayState = 'running';
        });
      }
    });
  }

  initializeAdditionalFeatures() {
    // Add any additional initialization logic here
    this.setupAccessibility();
    this.setupAnalytics();
  }

  setupAccessibility() {
    // Add ARIA labels and roles for better accessibility
    document.querySelectorAll('.skill-bubble').forEach(bubble => {
      bubble.setAttribute('role', 'button');
      bubble.setAttribute('tabindex', '0');
      const skillName = bubble.querySelector('span')?.textContent;
      if (skillName) {
        bubble.setAttribute('aria-label', `Skill: ${skillName}`);
      }
    });

    // Add keyboard navigation for skill bubbles
    document.querySelectorAll('.skill-bubble').forEach(bubble => {
      bubble.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          bubble.click();
        }
      });
    });
  }

  setupAnalytics() {
    // Track user interactions for analytics (without external dependencies)
    const trackEvent = (eventName, data = {}) => {
      console.log(`📊 Analytics Event: ${eventName}`, data);
      // You can replace this with actual analytics implementation
    };

    // Track AI button usage
    const aiButton = document.getElementById('generate-ai');
    if (aiButton) {
      aiButton.addEventListener('click', () => {
        trackEvent('ai_generation_requested', {
          timestamp: new Date().toISOString()
        });
      });
    }

    // Track form submissions
    const form = document.getElementById('messageForm');
    if (form) {
      form.addEventListener('submit', () => {
        trackEvent('contact_form_submitted', {
          timestamp: new Date().toISOString()
        });
      });
    }

    // Track section views
    const sections = document.querySelectorAll('.revolving-section');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id || 'unknown';
          trackEvent('section_viewed', {
            section: sectionId,
            timestamp: new Date().toISOString()
          });
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));
  }

  // Public method to update particle effects
  updateParticles(mode) {
    if (this.components.particleSystem) {
      this.components.particleSystem.updateParticleMode(mode);
    }
  }

  // Public method to get performance data
  getPerformanceData() {
    return this.components.performanceMonitor?.performanceData || {};
  }
}

// 🚀 Start the application
const app = new EnhancedResumeApp();

// Export for external access if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EnhancedResumeApp, app };
}

// Global utility functions
window.enhancedResume = {
  app,
  updateParticles: (mode) => app.updateParticles(mode),
  getPerformanceData: () => app.getPerformanceData()
};

console.log('🎉 Enhanced Interactive Resume Script Loaded Successfully!');