---
layout: default
title: Contact
permalink: /pages/contact/
---

<div class="contact-container">
  <h1>Get in Touch</h1>
  
  <div class="contact-grid">
    <div class="contact-info">
      <p>I'm always interested in hearing about new opportunities, collaborations, or just connecting with fellow data enthusiasts. Feel free to reach out via the contact form or through any of my social platforms.</p>
      
      <div class="contact-links">
        <div class="contact-link">
          <i class="fas fa-envelope"></i>
          <a href="mailto:your.email@example.com">your.email@example.com</a>
        </div>
        
        <div class="contact-link">
          <i class="fab fa-linkedin"></i>
          <a href="https://linkedin.com/in/michael-teixeira" target="_blank">Michael Teixeira on LinkedIn</a>
        </div>
        
        <div class="contact-link">
          <i class="fab fa-github"></i>
          <a href="https://github.com/Tex30" target="_blank">Tex30 on GitHub</a>
        </div>
        
        <div class="contact-link">
          <i class="fas fa-map-marker-alt"></i>
          <span>Melbourne, Australia</span>
        </div>
      </div>
      
      <div class="availability">
        <h3>Current Availability</h3>
        <p>I'm currently open to:</p>
        <ul>
          <li>Full-time data science opportunities</li>
          <li>Freelance analytics projects</li>
          <li>Collaborative research</li>
          <li>Speaking engagements</li>
        </ul>
      </div>
    </div>
    
    <div class="contact-form">
      <h2>Send a Message</h2>
      <form action="https://formspree.io/f/your_formspree_id" method="POST">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required>
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="_replyto" required>
        </div>
        
        <div class="form-group">
          <label for="subject">Subject</label>
          <input type="text" id="subject" name="subject" required>
        </div>
        
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        
        <input type="hidden" name="_next" value="{{ site.url }}{{ site.baseurl }}/pages/contact/?success=true">
        <input type="hidden" name="_subject" value="New message from portfolio contact form">
        <input type="text" name="_gotcha" style="display:none">
        
        <button type="submit" class="submit-btn">Send Message</button>
      </form>
      
      {% if page.url contains '?success=true' %}
      <div class="form-success">
        <p>Your message has been sent! I'll get back to you soon.</p>
      </div>
      {% endif %}
    </div>
  </div>
</div>
