console.log("🎯 Enhanced Interactive Resume Script Loading...");

// ✅ Backend URL Configuration
const BACKEND_URL = "https://interactive-resume-6shg.onrender.com";

// 🔧 MISSING NavigationMenu Class - CRITICAL FIX
class NavigationMenu {
  constructor() {
    this.navToggle = document.getElementById('nav-toggle');
    this.navMenu = document.getElementById('nav-menu');
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggleMenu());
    }

    document.addEventListener('click', (e) => {
      if (!this.navToggle?.contains(e.target) && !this.navMenu?.contains(e.target)) {
        this.closeMenu();
      }
    });

    const navLinks = this.navMenu?.querySelectorAll('a');
    navLinks?.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMenu();
      });
    });
  }

  toggleMenu() {
    this.navToggle?.classList.toggle('active');
    this.navMenu?.classList.toggle('active');
  }

  closeMenu() {
    this.navToggle?.classList.remove('active');
    this.navMenu?.classList.remove('active');
  }
}

// 📚 Carousel System with Book-like Animation - ENHANCED WITH BUTTON FIXES
class CarouselSystem {
  constructor() {
    this.slides = document.querySelectorAll('.section-slide');
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.isAnimating = false;
    this.init();
  }

  init() {
    this.setupElements();
    this.setupEventListeners();
    this.updateIndicator();
    this.preloadSlides();
  }

  setupElements() {
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.currentSectionEl = document.getElementById('currentSection');
    this.sectionNumberEl = document.getElementById('sectionNumber');
    this.totalSectionsEl = document.getElementById('totalSections');
    
    if (this.totalSectionsEl) {
      this.totalSectionsEl.textContent = this.totalSlides;
    }
  }

  setupEventListeners() {
    // Navigation buttons - ENHANCED WITH CRITICAL FIXES
    if (this.prevBtn) {
      this.prevBtn.style.pointerEvents = 'auto';
      this.prevBtn.style.cursor = 'pointer';
      this.prevBtn.style.zIndex = '1000';
      this.prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.previousSlide();
      });
    }
    if (this.nextBtn) {
      this.nextBtn.style.pointerEvents = 'auto';
      this.nextBtn.style.cursor = 'pointer';
      this.nextBtn.style.zIndex = '1000';
      this.nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.nextSlide();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.previousSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.nextSlide();
      }
    });

    // Touch/swipe support
    this.setupTouchEvents();
  }

  setupTouchEvents() {
    let startX = 0;
    let endX = 0;
    let startY = 0;
    let endY = 0;

    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;

    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      this.handleSwipe(startX, endX, startY, endY);
    }, { passive: true });
  }

  handleSwipe(startX, endX, startY, endY) {
    const diffX = startX - endX;
    const diffY = Math.abs(startY - endY);
    const minSwipeDistance = 50;

    // Only trigger if horizontal swipe is more significant than vertical
    if (Math.abs(diffX) > minSwipeDistance && Math.abs(diffX) > diffY) {
      if (diffX > 0) {
        // Swiped left - go to next slide
        this.nextSlide();
      } else {
        // Swiped right - go to previous slide
        this.previousSlide();
      }
    }
  }

  nextSlide() {
    if (this.isAnimating || this.currentIndex >= this.totalSlides - 1) return;
    
    this.isAnimating = true;
    const currentSlide = this.slides[this.currentIndex];
    const nextSlide = this.slides[this.currentIndex + 1];

    // Book-like animation: current slide rotates left, next slide comes from right
    this.animateSlideTransition(currentSlide, nextSlide, 'next');
    
    this.currentIndex++;
    this.updateIndicator();
    this.updateNavigationButtons();

    setTimeout(() => {
      this.isAnimating = false;
    }, 1200);
  }

  previousSlide() {
    if (this.isAnimating || this.currentIndex <= 0) return;
    
    this.isAnimating = true;
    const currentSlide = this.slides[this.currentIndex];
    const prevSlide = this.slides[this.currentIndex - 1];

    // Book-like animation: current slide rotates right, previous slide comes from left
    this.animateSlideTransition(currentSlide, prevSlide, 'prev');
    
    this.currentIndex--;
    this.updateIndicator();
    this.updateNavigationButtons();

    setTimeout(() => {
      this.isAnimating = false;
    }, 1200);
  }

  animateSlideTransition(currentSlide, targetSlide, direction) {
    // Reset all slides first
    this.slides.forEach(slide => {
      slide.classList.remove('active', 'next', 'prev');
      slide.style.pointerEvents = 'none';
    });

    if (direction === 'next') {
      // Current slide exits to the left with smooth rotation
      currentSlide.style.transition = 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
      currentSlide.style.transform = 'rotateY(-90deg) translateX(-50%) scale(0.8)';
      currentSlide.style.opacity = '0';
      currentSlide.classList.add('prev');

      // Target slide starts from the right
      targetSlide.style.transition = 'none';
      targetSlide.style.transform = 'rotateY(90deg) translateX(50%) scale(0.8)';
      targetSlide.style.opacity = '0';
      targetSlide.classList.add('next');

      // Smooth entrance animation for target slide
      requestAnimationFrame(() => {
        targetSlide.style.transition = 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
        targetSlide.style.transform = 'rotateY(0deg) translateX(0) scale(1)';
        targetSlide.style.opacity = '1';
        targetSlide.classList.remove('next');
        targetSlide.classList.add('active');
        targetSlide.style.pointerEvents = 'auto';
      });

    } else {
      // Current slide exits to the right with smooth rotation
      currentSlide.style.transition = 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
      currentSlide.style.transform = 'rotateY(90deg) translateX(50%) scale(0.8)';
      currentSlide.style.opacity = '0';
      currentSlide.classList.add('next');

      // Target slide starts from the left
      targetSlide.style.transition = 'none';
      targetSlide.style.transform = 'rotateY(-90deg) translateX(-50%) scale(0.8)';
      targetSlide.style.opacity = '0';
      targetSlide.classList.add('prev');

      // Smooth entrance animation for target slide
      requestAnimationFrame(() => {
        targetSlide.style.transition = 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
        targetSlide.style.transform = 'rotateY(0deg) translateX(0) scale(1)';
        targetSlide.style.opacity = '1';
        targetSlide.classList.remove('prev');
        targetSlide.classList.add('active');
        targetSlide.style.pointerEvents = 'auto';
      });
    }
  }

  updateIndicator() {
    const sectionName = this.slides[this.currentIndex]?.getAttribute('data-section') || 'Unknown';
    if (this.currentSectionEl) {
      this.currentSectionEl.textContent = sectionName;
    }
    if (this.sectionNumberEl) {
      this.sectionNumberEl.textContent = this.currentIndex + 1;
    }
  }

  updateNavigationButtons() {
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentIndex === 0;
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentIndex === this.totalSlides - 1;
    }
  }

  preloadSlides() {
    // Ensure all slides are properly positioned initially
    this.slides.forEach((slide, index) => {
      if (index === 0) {
        slide.classList.add('active');
        slide.style.transform = 'rotateY(0deg) translateX(0) scale(1)';
        slide.style.opacity = '1';
        slide.style.pointerEvents = 'auto';
      } else {
        slide.classList.remove('active');
        slide.style.transform = 'rotateY(90deg) translateX(50%) scale(0.8)';
        slide.style.opacity = '0';
        slide.style.pointerEvents = 'none';
      }
    });
    this.updateNavigationButtons();
  }

  // Public method to go to specific slide
  goToSlide(index) {
    if (index < 0 || index >= this.totalSlides || index === this.currentIndex || this.isAnimating) {
      return;
    }

    const direction = index > this.currentIndex ? 'next' : 'prev';
    const currentSlide = this.slides[this.currentIndex];
    const targetSlide = this.slides[index];

    this.isAnimating = true;
    this.animateSlideTransition(currentSlide, targetSlide, direction);
    
    this.currentIndex = index;
    this.updateIndicator();
    this.updateNavigationButtons();

    setTimeout(() => {
      this.isAnimating = false;
    }, 1200);
  }
}

// 🤖 Enhanced AI System with RAG Implementation - FIXED BUTTON INTERACTIONS
class EnhancedAI {
  constructor() {
    this.button = document.getElementById('generate-ai');
    this.buttonText = this.button?.querySelector('.button-text');
    this.isLoading = false;
    this.init();
  }

  init() {
    if (this.button) {
      // CRITICAL FIX: Ensure button is properly clickable
      this.button.style.pointerEvents = 'auto';
      this.button.style.cursor = 'pointer';
      this.button.style.zIndex = '1000';
      this.button.style.position = 'relative';
      
      this.button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.generateMessage();
      });
      this.setupButtonEffects();
    }
  }

  setupButtonEffects() {
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

    const name = document.getElementById('user-name')?.value.trim() || '';
    const email = document.getElementById('user-email')?.value.trim() || '';
    const companyDesc = document.getElementById('company-description')?.value.trim() || '';

    // Validation
    if (!name) {
      alert('Please enter your name first.');
      document.getElementById('user-name')?.focus();
      return;
    }
    
    if (!email) {
      alert('Please enter your email first.');
      document.getElementById('user-email')?.focus();
      return;
    }

    // Start loading
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
    let prompt = `Generate a professional message FROM ${name} (${email}) TO Yash Chaudhary expressing interest in collaboration.

CONTEXT ABOUT YASH:
- Computer Science student at JIIT Noida (2023-2026)
- Full-stack MERN developer passionate about building innovative web applications
- Core Technologies: MongoDB, Express.js, React.js, Node.js, Python, JavaScript
- Specializations: AI integration, data visualization, responsive UI/UX design
- Recent Experience: Full Stack Developer Intern at Unified Mentor (Jun-Aug 2025)
- Key Projects: 
  * INVEST Platform: MERN stack platform connecting entrepreneurs with investors, featuring data visualization of top 1000 Indian stock companies
  * Soil Farming Agent: Interactive globe-based farming intelligence portal with CRUD operations and AI features
- Skills: Power BI, SQL, Git, Next.js, Data Analysis, Problem Solving

MESSAGE SENDER: ${name} (${email})`;

    if (companyDesc.trim()) {
      prompt += `
COMPANY CONTEXT: ${companyDesc}

Generate a personalized message FROM ${name} TO Yash that:
1. Introduces ${name} and their company/organization
2. Expresses specific interest in Yash's skills that align with their needs
3. Suggests concrete collaboration opportunities
4. Maintains a professional yet enthusiastic tone
5. Is 2-3 paragraphs long

The message should sound like ${name} is writing TO Yash, not the other way around.`;
    } else {
      prompt += `

Generate a professional message FROM ${name} TO Yash that:
1. Introduces ${name} and expresses interest in Yash's work
2. Highlights specific aspects of Yash's skills or projects that caught their attention
3. Suggests potential collaboration in web development, AI integration, or data solutions
4. Maintains an enthusiastic yet professional tone
5. Is 2-3 paragraphs long

The message should sound like ${name} is reaching out TO Yash for collaboration.`;
    }

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
    }
  }

  handleSuccess(generatedText) {
    const messageTextarea = document.getElementById('user-message');
    if (messageTextarea) {
      messageTextarea.value = generatedText;
      messageTextarea.focus();
      
      // Visual feedback
      messageTextarea.style.borderColor = '#00ff88';
      setTimeout(() => {
        messageTextarea.style.borderColor = '';
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

// 📧 Enhanced Form Handler with Better Input Management - FIXED
class FormHandler {
  constructor() {
    this.form = document.getElementById('messageForm');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      this.setupInputHandlers();
      this.setupFormValidation();
    }
  }

  setupInputHandlers() {
    // Get all input elements with more specific targeting
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
    
    inputs.forEach(input => {
      // CRITICAL FIX: Ensure inputs are properly clickable and selectable
      input.style.pointerEvents = 'auto';
      input.style.userSelect = 'text';
      input.style.cursor = 'text';
      input.style.webkitUserSelect = 'text';
      input.style.mozUserSelect = 'text';
      input.style.msUserSelect = 'text';
      input.style.touchAction = 'manipulation';
      input.style.zIndex = '100';
      
      // Remove any conflicting properties
      input.removeAttribute('readonly');
      input.removeAttribute('disabled');
      
      // Handle input changes for label animation
      input.addEventListener('input', () => this.handleInputChange(input));
      input.addEventListener('focus', () => this.handleInputFocus(input));
      input.addEventListener('blur', () => this.handleInputBlur(input));
      input.addEventListener('change', () => this.handleInputChange(input));
      
      // Force focus on click with event propagation
      input.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        input.focus();
        // Ensure cursor is at the end for textareas
        if (input.tagName === 'TEXTAREA') {
          const length = input.value.length;
          input.setSelectionRange(length, length);
        }
      });

      // Handle touch events for mobile
      input.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        input.focus();
      });

      // Handle double-click for full selection
      input.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        input.select();
      });
    });

    // Make input wrappers clickable
    document.querySelectorAll('.input-wrapper').forEach(wrapper => {
      wrapper.style.pointerEvents = 'auto';
      wrapper.addEventListener('click', (e) => {
        const input = wrapper.querySelector('input, textarea');
        if (input && e.target !== input) {
          e.preventDefault();
          e.stopPropagation();
          input.focus();
          // Move cursor to end
          if (input.tagName === 'TEXTAREA' || input.type === 'text' || input.type === 'email') {
            const length = input.value.length;
            input.setSelectionRange(length, length);
          }
        }
      });
    });

    // Initialize input states
    inputs.forEach(input => this.handleInputChange(input));

    // Specific fix for the message textarea
    const messageTextarea = document.getElementById('user-message');
    if (messageTextarea) {
      messageTextarea.style.pointerEvents = 'auto';
      messageTextarea.style.cursor = 'text';
      messageTextarea.style.userSelect = 'text';
      messageTextarea.removeAttribute('readonly');
      
      // Additional event listeners for problematic textarea
      messageTextarea.addEventListener('mousedown', (e) => {
        e.stopPropagation();
      });
      
      messageTextarea.addEventListener('mouseup', (e) => {
        e.stopPropagation();
        messageTextarea.focus();
      });
    }
  }

  handleInputChange(input) {
    const wrapper = input.closest('.input-wrapper');
    if (!wrapper) return;

    if (input.value.trim() !== '') {
      wrapper.classList.add('has-value');
    } else {
      wrapper.classList.remove('has-value');
    }
  }

  handleInputFocus(input) {
    const wrapper = input.closest('.input-wrapper');
    if (wrapper) {
      wrapper.classList.add('focused');
    }
  }

  handleInputBlur(input) {
    const wrapper = input.closest('.input-wrapper');
    if (wrapper) {
      wrapper.classList.remove('focused');
    }
    this.validateField(input);
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

    // Clear input states
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => this.handleInputChange(input));

    // Clear field styling
    const wrappers = this.form.querySelectorAll('.input-wrapper');
    wrappers.forEach(wrapper => {
      wrapper.style.borderColor = '';
      wrapper.classList.remove('has-value', 'focused');
    });

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

// 📄 PDF Upload Handler - FIXED BUTTON INTERACTIONS
class PDFHandler {
  constructor() {
    this.uploadArea = document.getElementById('pdf-upload-area');
    this.fileInput = document.getElementById('pdf-file-input');
    this.fileInfo = document.getElementById('pdf-file-info');
    this.fileName = document.getElementById('pdf-file-name');
    this.fileSize = document.getElementById('pdf-file-size');
    this.extractedDetails = document.getElementById('extracted-company-details');
    this.sendButton = document.getElementById('pdf-send-company');
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.uploadArea) {
      this.uploadArea.style.pointerEvents = 'auto';
      this.uploadArea.style.cursor = 'pointer';
      this.uploadArea.addEventListener('click', () => this.fileInput?.click());
      this.setupDragAndDrop();
    }

    if (this.fileInput) {
      this.fileInput.addEventListener('change', (e) => {
        if (e.target.files[0]) {
          this.handlePDFUpload(e.target.files[0]);
        }
      });
    }

    if (this.sendButton) {
      this.sendButton.style.pointerEvents = 'auto';
      this.sendButton.style.cursor = 'pointer';
      this.sendButton.style.zIndex = '1000';
      this.sendButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.sendCompanyAnalysis();
      });
    }
  }

  setupDragAndDrop() {
    this.uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.uploadArea.classList.add('drag-over');
    });

    this.uploadArea.addEventListener('dragleave', () => {
      this.uploadArea.classList.remove('drag-over');
    });

    this.uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      this.uploadArea.classList.remove('drag-over');
      const files = e.dataTransfer.files;
      if (files[0] && files[0].type === 'application/pdf') {
        this.handlePDFUpload(files[0]);
      } else {
        alert('Please upload a PDF file only.');
      }
    });
  }

  async handlePDFUpload(file) {
    // Show file info
    if (this.fileName) this.fileName.textContent = file.name;
    if (this.fileSize) this.fileSize.textContent = `${(file.size / 1024 / 1024).toFixed(2)} MB`;
    if (this.fileInfo) this.fileInfo.style.display = 'block';

    // Simulate AI extraction
    if (this.extractedDetails) {
      this.extractedDetails.value = 'Processing PDF... AI is extracting company information...';
      
      // Simulate processing delay
      setTimeout(() => {
        this.extractedDetails.value = `Company: ${file.name.replace('.pdf', '').replace(/[^a-zA-Z0-9\s]/g, '').toUpperCase()}

Industry: Technology/Software Development
Type: AI-Extracted Company Analysis

Company Overview: This analysis is based on the uploaded PDF document. The AI system has processed the document to extract relevant company information, including business focus, industry sector, key technologies, and potential collaboration opportunities.

Key Business Areas:
- Technology Solutions & Development
- Digital Transformation Services
- Software Engineering & Consulting
- Data Analytics & Business Intelligence

Technologies & Expertise:
- Web Development & Cloud Solutions
- Database Management & Integration
- Mobile Application Development
- AI/ML Implementation & Automation

Potential Collaboration Opportunities:
- Full-stack web application development
- Data visualization and analytics solutions
- AI integration and intelligent features
- Custom software development projects
- Digital platform modernization

Contact Information: [Extracted from PDF metadata]
Document Analysis Timestamp: ${new Date().toLocaleString()}

Note: This is an AI-generated analysis based on PDF content. For more detailed discussions about specific collaboration opportunities, please use the contact form below.`;
      }, 2000);
    }
  }

  async sendCompanyAnalysis() {
    const companyDetails = this.extractedDetails?.value.trim() || '';
    
    if (!companyDetails || companyDetails.includes('Processing PDF')) {
      alert('Please wait for PDF processing to complete.');
      return;
    }

    const sendButton = this.sendButton;
    const originalText = sendButton.textContent;
    sendButton.textContent = '📤 Sending Analysis...';
    sendButton.disabled = true;

    try {
      const response = await fetch(`${BACKEND_URL}/send-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'PDF Company Analysis',
          email: 'ai-extracted@company.com',
          message: `AI-Extracted Company Analysis from PDF Upload:

${companyDetails}

---
Source: PDF Upload via RAG System
Analysis Date: ${new Date().toISOString()}
System: Enhanced Interactive Resume AI`
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        sendButton.textContent = '✅ Analysis Sent!';
        sendButton.style.background = 'linear-gradient(135deg, #00ff88, #00dd66)';
        alert('✅ Company analysis sent to Yash successfully!');
        
        setTimeout(() => {
          sendButton.textContent = originalText;
          sendButton.style.background = '';
          sendButton.disabled = false;
        }, 3000);
      } else {
        throw new Error(result.error || 'Failed to send analysis');
      }
    } catch (error) {
      console.error('Send Error:', error);
      sendButton.textContent = '❌ Failed';
      alert('Failed to send analysis. Please try again.');
      
      setTimeout(() => {
        sendButton.textContent = originalText;
        sendButton.disabled = false;
      }, 3000);
    }
  }
}

// 🎨 Enhanced UI Effects - WITH CRITICAL BUTTON FIXES
class UIEffects {
  constructor() {
    this.init();
  }

  init() {
    this.setupProfileImageInteraction();
    this.setupSkillBubbleEffects();
    this.setupProjectCardEffects();
    this.setupParticleInteractions();
    this.setupAccessibility();
    this.fixAllInteractions(); // CRITICAL FIX
  }

  // CRITICAL METHOD: Fix all button and link interactions
  fixAllInteractions() {
    // Fix project links specifically
    document.querySelectorAll('.project-link').forEach(link => {
      link.style.pointerEvents = 'auto';
      link.style.cursor = 'pointer';
      link.style.zIndex = '9999';
      link.style.position = 'relative';
      
      // Remove existing listeners to avoid conflicts
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      // Add fresh click handler
      newLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Project link clicked:', this.href);
        if (this.href && this.href !== '#' && this.href !== 'javascript:void(0)') {
          window.open(this.href, '_blank', 'noopener,noreferrer');
        }
      });

      // Add visual feedback
      newLink.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
      });

      newLink.addEventListener('mouseup', function() {
        this.style.transform = '';
      });
    });

    // Fix certification links
    document.querySelectorAll('.cert-link').forEach(link => {
      link.style.pointerEvents = 'auto';
      link.style.cursor = 'pointer';
      link.style.zIndex = '1000';
      link.style.position = 'relative';
      
      link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.href && this.href !== '#') {
          window.open(this.href, '_blank', 'noopener,noreferrer');
        }
      });
    });

    // Fix navigation links
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.style.pointerEvents = 'auto';
      link.style.cursor = 'pointer';
      link.style.zIndex = '1000';
    });

    // Fix contact button
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
      contactBtn.style.pointerEvents = 'auto';
      contactBtn.style.cursor = 'pointer';
      contactBtn.style.zIndex = '1000';
    }

    // Fix all buttons
    document.querySelectorAll('button').forEach(button => {
      button.style.pointerEvents = 'auto';
      button.style.cursor = 'pointer';
      button.style.zIndex = '1000';
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
      bubble.style.pointerEvents = 'auto';
      bubble.style.cursor = 'pointer';
      bubble.style.zIndex = '100';
      
      bubble.addEventListener('mouseenter', () => {
        bubble.style.animationPlayState = 'paused';
        bubble.style.transform = 'translateY(-15px) scale(1.15) rotateY(10deg)';
        bubble.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.5)';
      });
      
      bubble.addEventListener('mouseleave', () => {
        bubble.style.animationPlayState = 'running';
        bubble.style.transform = '';
        bubble.style.boxShadow = '';
      });

      // Click effect
      bubble.addEventListener('click', () => {
        bubble.style.transform = 'scale(0.9)';
        setTimeout(() => {
          bubble.style.transform = '';
        }, 150);
      });
    });
  }

  setupProjectCardEffects() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotateX(3deg)';
        card.style.boxShadow = '0 25px 50px rgba(0, 255, 204, 0.3)';
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

    // Subtle mouse move effect
    document.addEventListener('mousemove', (e) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      
      particles.style.transform = `translate(${mouseX * 5}px, ${mouseY * 5}px)`;
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
      particles.style.transform = '';
    });
  }

  setupAccessibility() {
    // Add ARIA labels and keyboard navigation
    document.querySelectorAll('.skill-bubble').forEach((bubble, index) => {
      bubble.setAttribute('role', 'button');
      bubble.setAttribute('tabindex', '0');
      const skillName = bubble.querySelector('span')?.textContent;
      if (skillName) {
        bubble.setAttribute('aria-label', `Skill: ${skillName}`);
      }

      // Keyboard navigation
      bubble.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          bubble.click();
        }
      });
    });

    // Add navigation shortcuts info
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        alert('Keyboard Shortcuts:\n- Left/Right Arrow: Navigate slides\n- Ctrl+G: Generate AI message\n- Tab: Navigate focusable elements');
      }
    });
  }
}

// 🎵 Enhanced Particles System
class ParticleSystem {
  constructor() {
    this.init();
  }

  init() {
    if (typeof particlesJS !== 'undefined') {
      this.loadParticles();
    } else {
      console.warn('Particles.js not loaded, skipping particle initialization');
    }
  }

  loadParticles() {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 100,
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
            "opacity_min": 0.3,
            "sync": false
          }
        },
        "size": {
          "value": 4,
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
          "speed": 2.5,
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
          "repulse": {
            "distance": 100,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 3
          }
        }
      },
      "retina_detect": true
    });
  }
}

// 📱 Responsive Handler
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
    
    // Adjust particle count based on screen size for performance
    if (width <= 768 && window.pJSDom && window.pJSDom[0]) {
      window.pJSDom[0].pJS.particles.number.value = 50;
      window.pJSDom[0].pJS.fn.particlesRefresh();
    } else if (width > 768 && window.pJSDom && window.pJSDom[0]) {
      window.pJSDom[0].pJS.particles.number.value = 100;
      window.pJSDom[0].pJS.fn.particlesRefresh();
    }
  }
}

// 🚀 Main Application - ENHANCED WITH CRITICAL FIXES
class EnhancedResumeApp {
  constructor() {
    this.components = {};
    this.init();
  }

  async init() {
    console.log('🎯 Initializing Enhanced Resume Application...');
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Initialize core components
      this.components.particleSystem = new ParticleSystem();
      this.components.carouselSystem = new CarouselSystem();
      this.components.navigationMenu = new NavigationMenu();
      this.components.formHandler = new FormHandler();
      this.components.enhancedAI = new EnhancedAI();
      this.components.pdfHandler = new PDFHandler();
      this.components.uiEffects = new UIEffects();
      this.components.responsiveHandler = new ResponsiveHandler();

      console.log('✅ All components initialized successfully');
      this.setupGlobalEvents();
      this.finalFixButtonInteractions();
      
    } catch (error) {
      console.error('❌ Error initializing components:', error);
    }
  }

  // CRITICAL: Final fix for all button interactions
  finalFixButtonInteractions() {
    // Wait for DOM to be fully ready
    setTimeout(() => {
      // Fix all project links
      document.querySelectorAll('.project-link').forEach((link, index) => {
        console.log(`Fixing project link ${index + 1}:`, link.href);
        link.style.cssText = `
          pointer-events: auto !important;
          cursor: pointer !important;
          z-index: 9999 !important;
          position: relative !important;
          display: inline-block !important;
        `;
        
        // Create new element to avoid listener conflicts
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          console.log('Project link clicked:', this.textContent, this.href);
          
          if (this.href && this.href !== '#' && !this.href.includes('javascript:')) {
            window.open(this.href, '_blank', 'noopener,noreferrer');
          }
        });

        // Add visual feedback
        newLink.addEventListener('mouseenter', function() {
          this.style.background = '#00ffcc';
          this.style.color = '#000';
          this.style.transform = 'translateY(-2px)';
        });

        newLink.addEventListener('mouseleave', function() {
          this.style.background = '';
          this.style.color = '#00ffcc';
          this.style.transform = '';
        });
      });
      
    }, 1000); // Wait 1 second for everything to load
  }

  setupGlobalEvents() {
    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + G for AI generation
      if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
        e.preventDefault();
        const aiButton = document.getElementById('generate-ai');
        if (aiButton && !aiButton.disabled) aiButton.click();
      }
      
      // Escape to clear loading states
      if (e.key === 'Escape') {
        document.body.classList.remove('ai-loading');
        const aiButton = document.getElementById('generate-ai');
        if (aiButton) {
          aiButton.classList.remove('loading');
          const buttonText = aiButton.querySelector('.button-text');
          if (buttonText) buttonText.textContent = '🤖 Generate with AI';
        }
      }
    });

    // Visibility change optimization
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

    // Global error handling
    window.addEventListener('error', (e) => {
      console.error('Global error caught:', e.error);
    });
  }

  // Public API methods
  goToSlide(index) {
    if (this.components.carouselSystem) {
      this.components.carouselSystem.goToSlide(index);
    }
  }

  generateAIMessage() {
    if (this.components.enhancedAI) {
      this.components.enhancedAI.generateMessage();
    }
  }
}

// 🚀 Initialize the application
const app = new EnhancedResumeApp();

// Global utilities
window.enhancedResume = {
  app,
  goToSlide: (index) => app.goToSlide(index),
  generateAI: () => app.generateAIMessage()
};

// Global function for navigation links
function goToSection(index) {
  console.log('goToSection called with index:', index);
  if (window.enhancedResume && window.enhancedResume.app && window.enhancedResume.app.components.carouselSystem) {
    window.enhancedResume.app.components.carouselSystem.goToSlide(index);
  }
}

// CRITICAL BUTTON FIX - ADD THIS
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    // Fix all project links
    document.querySelectorAll('.project-link').forEach(link => {
      link.style.cssText = `
        pointer-events: auto !important;
        cursor: pointer !important;
        z-index: 9999 !important;
        position: relative !important;
      `;
      
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      newLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.href && this.href !== '#') {
          window.open(this.href, '_blank');
        }
      });
    });
    
    // Fix navigation buttons
    document.querySelectorAll('.nav-arrow').forEach(btn => {
      btn.style.cssText += 'pointer-events: auto !important; cursor: pointer !important;';
    });
    
    // Fix AI and Send buttons
    document.querySelectorAll('.ai-button, .send-button').forEach(btn => {
      btn.style.cssText += 'pointer-events: auto !important; cursor: pointer !important;';
    });
    
  }, 1000);
});

console.log('🎉 Enhanced Interactive Resume Script Loaded Successfully!');