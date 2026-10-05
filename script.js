

(function() {


document.addEventListener('DOMContentLoaded', () => {
 
  const header = document.querySelector('.site-header');
  const scrollTopBtn = document.querySelector('.scroll-top-btn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      scrollTopBtn?.classList.add('visible');
    } else {
      scrollTopBtn?.classList.remove('visible');
    }
  });

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

 
  const mobileToggle = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const drawerClose = document.querySelector('.drawer-close');

  function openDrawer() {
    drawer?.classList.add('active');
    drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer?.classList.remove('active');
    drawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);
  document.querySelectorAll('.drawer-link').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

 
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
      closeDrawer();
    }
  });

 
  if (window.matchMedia('(min-width: 992px)').matches) {
    const tiltElements = document.querySelectorAll('.dash-stat-card');

    tiltElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

 
  const serviceCards = document.querySelectorAll('.service-box');
  if (serviceCards.length > 0) {
    serviceCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        serviceCards.forEach((c) => c.classList.remove('active-card'));
        card.classList.add('active-card');
      });
    });
  }

 
  const counterElements = document.querySelectorAll('.counter-val');
  if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const countTo = parseInt(target.getAttribute('data-count') || '0', 10);
          const duration = 1200;
          
         
          setTimeout(() => {
            let startTime = null;
            function step(timestamp) {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(ease * countTo);
              target.textContent = current;
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                target.textContent = countTo;
              }
            }
            requestAnimationFrame(step);
          }, 60);

          observer.unobserve(target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -15px 0px' });

    counterElements.forEach((el) => counterObserver.observe(el));
  }

 
  const capabilitySection = document.querySelector('.capability-section') || document.querySelector('.progress-list');
  const progressItems = document.querySelectorAll('.progress-item');

  if (progressItems.length > 0) {
    const progressObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          progressItems.forEach((item, index) => {
            const bar = item.querySelector('.progress-fill');
            const percentSpan = item.querySelector('.progress-percent');
            const targetVal = parseInt(
              (bar && bar.getAttribute('data-percent')) || 
              (percentSpan && percentSpan.getAttribute('data-percent')) || 
              '85', 
              10
            );

           
            const itemDelay = 60 + (index * 80);

           
            if (bar) {
              setTimeout(() => {
                bar.style.width = `${targetVal}%`;
              }, itemDelay);
            }

           
            if (percentSpan) {
              setTimeout(() => {
                let startTime = null;
                const duration = 1200;
                function countStep(timestamp) {
                  if (!startTime) startTime = timestamp;
                  const progress = Math.min((timestamp - startTime) / duration, 1);
                  const ease = 1 - Math.pow(1 - progress, 3);
                  const current = Math.floor(ease * targetVal);
                  percentSpan.textContent = `${current}%`;
                  if (progress < 1) {
                    requestAnimationFrame(countStep);
                  } else {
                    percentSpan.textContent = `${targetVal}%`;
                  }
                }
                requestAnimationFrame(countStep);
              }, itemDelay);
            }
          });

          if (capabilitySection) {
            observer.unobserve(capabilitySection);
          } else {
            progressItems.forEach(pi => observer.unobserve(pi));
          }
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    if (capabilitySection) {
      progressObserver.observe(capabilitySection);
    } else {
      progressItems.forEach(pi => progressObserver.observe(pi));
    }
  }

 
  const caseCards = document.querySelectorAll('.case-card');
  const caseDots = document.querySelectorAll('.carousel-dot');

  if (caseDots.length > 0 && caseCards.length > 0) {
    caseDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        caseDots.forEach((d) => d.classList.remove('active'));
        dot.classList.add('active');
        if (caseCards[index]) {
          caseCards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    });
  }

 
  const videoTriggers = document.querySelectorAll('.capsule-play-btn, .open-video-modal');
  const videoModal = document.querySelector('#videoModal');
  const videoModalCloses = document.querySelectorAll('.video-modal-close, #closeCaseModal');
  const videoPlayer = document.querySelector('#modal-video-player');

  function openVideoModal(e) {
    if (e) e.preventDefault();
    if (videoModal) {
      videoModal.classList.add('active');
      if (videoPlayer) {
        videoPlayer.currentTime = 0;
        videoPlayer.play().catch(() => {});
      }
    }
  }

  function closeVideoModal() {
    if (videoModal) {
      videoModal.classList.remove('active');
      if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
      }
    }
    const caseModal = document.querySelector('#caseStudyModal');
    if (caseModal) {
      caseModal.classList.remove('active');
    }
  }

  videoTriggers.forEach((btn) => btn.addEventListener('click', openVideoModal));
  videoModalCloses.forEach((btn) => btn.addEventListener('click', closeVideoModal));
  videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVideoModal();
  });

 
  window.addEventListener('pageshow', () => {
    closeVideoModal();
  });

 
  const caseVideoBadges = document.querySelectorAll('.case-video-badge');
  caseVideoBadges.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeVideoModal();
      window.location.href = '404.html';
    });
  });

 
  window.showToast = function(message, type = 'success') {
    let toast = document.querySelector('.stackly-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'stackly-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: #0f1833;
        color: #ffffff;
        border: 1px solid var(--primary);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        padding: 14px 28px;
        border-radius: 50px;
        font-family: var(--font-heading);
        font-size: 0.95rem;
        font-weight: 600;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        pointer-events: none;
      `;
      document.body.appendChild(toast);
    }

    const icon = type === 'success' ? '✓' : 'ℹ';
    toast.innerHTML = `<span style="background:var(--primary); color:#fff; width:22px; height:22px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:12px;">${icon}</span> ${message}`;
    toast.style.transform = 'translateX(-50%) translateY(0)';

    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 4000);
  };

 
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      window.location.href = '404.html';
    });
  });

  const generalForms = document.querySelectorAll('form[data-ajax="true"]');
  generalForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      window.showToast('Your request has been received. Our Salem advisors will reach out shortly!');
      form.reset();
    });
  });

 
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const messageInput = document.getElementById('contactMessage');

    const setError = (groupId, errorId, message) => {
      const group = document.getElementById(groupId);
      const errorElem = document.getElementById(errorId);
      if (group) group.classList.add('has-error');
      if (errorElem) {
        errorElem.textContent = message;
        errorElem.style.display = 'block';
      }
    };

    const clearError = (groupId, errorId) => {
      const group = document.getElementById(groupId);
      const errorElem = document.getElementById(errorId);
      if (group) group.classList.remove('has-error');
      if (errorElem) {
        errorElem.textContent = '';
        errorElem.style.display = 'none';
      }
    };

    if (nameInput) {
      nameInput.addEventListener('input', () => {
        const val = nameInput.value.trim();
        if (!val) {
          setError('nameBox', 'nameError', 'Please enter your full legal name.');
        } else if (!/^[A-Za-z\s]+$/.test(val)) {
          setError('nameBox', 'nameError', 'Name must contain alphabets only (no numbers or symbols).');
        } else if (val.length < 2) {
          setError('nameBox', 'nameError', 'Name must be at least 2 characters.');
        } else {
          clearError('nameBox', 'nameError');
        }
      });
    }

    if (emailInput) {
      emailInput.addEventListener('input', () => {
        const val = emailInput.value.trim();
        if (!val) {
          setError('emailBox', 'emailError', 'Please enter your corporate email address.');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) {
          setError('emailBox', 'emailError', 'Please enter a valid email address (e.g. name@domain.com).');
        } else {
          clearError('emailBox', 'emailError');
        }
      });
    }

    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        const val = phoneInput.value.trim();
        if (!val) {
          setError('phoneBox', 'phoneError', 'Please enter your phone number.');
        } else if (!/^[\+]?[0-9\s\-()]{7,20}$/.test(val)) {
          setError('phoneBox', 'phoneError', 'Please enter a valid phone number (digits only).');
        } else {
          clearError('phoneBox', 'phoneError');
        }
      });
    }

    if (messageInput) {
      messageInput.addEventListener('input', () => {
        const val = messageInput.value.trim();
        if (!val) {
          setError('messageBox', 'messageError', 'Please enter details of your advisory request.');
        } else if (val.length < 10) {
          setError('messageBox', 'messageError', 'Message must be at least 10 characters long.');
        } else {
          clearError('messageBox', 'messageError');
        }
      });
    }

   
    const subjectWrap = document.getElementById('subjectWrap');
    const subjectTrigger = document.getElementById('subjectTrigger');
    const subjectDisplay = document.getElementById('subjectDisplay');
    const subjectInput = document.getElementById('contactSubject');
    const subjectOptions = document.querySelectorAll('.custom-select-option');

    if (subjectTrigger && subjectWrap) {
      subjectTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = subjectWrap.classList.contains('is-open');
        if (isOpen) {
          subjectWrap.classList.remove('is-open');
          subjectTrigger.setAttribute('aria-expanded', 'false');
        } else {
          subjectWrap.classList.add('is-open');
          subjectTrigger.setAttribute('aria-expanded', 'true');
        }
      });

      subjectOptions.forEach((opt) => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          const val = opt.getAttribute('data-value');
          const text = opt.textContent.trim();

          if (subjectInput) subjectInput.value = val;
          if (subjectDisplay) subjectDisplay.textContent = text;

          subjectOptions.forEach((o) => o.classList.remove('is-selected'));
          opt.classList.add('is-selected');

          subjectWrap.classList.remove('is-open');
          subjectTrigger.setAttribute('aria-expanded', 'false');
          clearError('subjectBox', 'subjectError');
        });
      });

      document.addEventListener('click', (e) => {
        if (!subjectWrap.contains(e.target)) {
          subjectWrap.classList.remove('is-open');
          subjectTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      subjectTrigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          subjectWrap.classList.toggle('is-open');
        } else if (e.key === 'Escape') {
          subjectWrap.classList.remove('is-open');
        }
      });
    }


    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

     
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal) {
        setError('nameBox', 'nameError', 'Please enter your full legal name.');
        if (isValid && nameInput) nameInput.focus();
        isValid = false;
      } else if (!/^[A-Za-z\s]+$/.test(nameVal)) {
        setError('nameBox', 'nameError', 'Name must contain alphabets only (no numbers or symbols).');
        if (isValid && nameInput) nameInput.focus();
        isValid = false;
      } else if (nameVal.length < 2) {
        setError('nameBox', 'nameError', 'Name must be at least 2 characters.');
        if (isValid && nameInput) nameInput.focus();
        isValid = false;
      } else {
        clearError('nameBox', 'nameError');
      }

     
      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (!emailVal) {
        setError('emailBox', 'emailError', 'Please enter your corporate email address.');
        if (isValid && emailInput) emailInput.focus();
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailVal)) {
        setError('emailBox', 'emailError', 'Please enter a valid email address (e.g. name@domain.com).');
        if (isValid && emailInput) emailInput.focus();
        isValid = false;
      } else {
        clearError('emailBox', 'emailError');
      }

     
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      if (!phoneVal) {
        setError('phoneBox', 'phoneError', 'Please enter your phone number.');
        if (isValid && phoneInput) phoneInput.focus();
        isValid = false;
      } else if (!/^[\+]?[0-9\s\-()]{7,20}$/.test(phoneVal)) {
        setError('phoneBox', 'phoneError', 'Please enter a valid phone number (digits only).');
        if (isValid && phoneInput) phoneInput.focus();
        isValid = false;
      } else {
        clearError('phoneBox', 'phoneError');
      }

     
      if (!subjectInput || !subjectInput.value) {
        setError('subjectBox', 'subjectError', 'Please select an advisory interest.');
        if (isValid && subjectTrigger) subjectTrigger.focus();
        isValid = false;
      } else {
        clearError('subjectBox', 'subjectError');
      }

     
      const msgVal = messageInput ? messageInput.value.trim() : '';
      if (!msgVal) {
        setError('messageBox', 'messageError', 'Please enter details of your advisory request.');
        if (isValid && messageInput) messageInput.focus();
        isValid = false;
      } else if (msgVal.length < 10) {
        setError('messageBox', 'messageError', 'Message must be at least 10 characters long.');
        if (isValid && messageInput) messageInput.focus();
        isValid = false;
      } else {
        clearError('messageBox', 'messageError');
      }

      if (!isValid) return;

      window.location.href = '404.html';
    });
  }


 
  const scrollAnimObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -20px 0px',
    threshold: 0.08
  });

 
  const structuralMappings = [
    { selector: '.section-title, .section-subtitle', anim: 'animate-fade-up', delayBase: 1 },
    { selector: '.about-capsule-display', anim: 'animate-slide-left-long', delayBase: 1 },
    { selector: '.about-content', anim: 'animate-slide-right-long', delayBase: 1 },
    { selector: '.achievement-bar-wrap', anim: 'animate-fade-up', delayBase: 1 },
    { selector: '.counter-item', anim: 'animate-zoom-in', delayBase: 1 },
    { selector: '.ceo-text-col', anim: 'animate-slide-left-long', delayBase: 1 },
    { selector: '.ceo-portrait-col', anim: 'animate-slide-right-long', delayBase: 1 },
    { selector: '.process-text-col', anim: 'animate-slide-right-long', delayBase: 1 },
    { selector: '.capability-grid > div:first-child', anim: 'animate-slide-left-long', delayBase: 1 },
    { selector: '.capability-image-wrap', anim: 'animate-slide-right-long', delayBase: 1 },
    { selector: '.faq-image-cluster', anim: 'animate-slide-left-long', delayBase: 1 },
    { selector: '.faq-content-col', anim: 'animate-slide-right-long', delayBase: 1 },
    { selector: '.testimonial-card', anim: 'animate-fade-up', delayBase: 1 },
    { selector: '.newsletter-box', anim: 'animate-fade-up', delayBase: 1 }
  ];

  structuralMappings.forEach(({ selector, anim, delayBase }) => {
    document.querySelectorAll(selector).forEach((el, idx) => {
      el.classList.add(anim);
      const delay = Math.min(4, delayBase + (idx % 2));
      el.classList.add(`delay-${delay}`);
      scrollAnimObserver.observe(el);
    });
  });

 

 
  const serviceBoxes = document.querySelectorAll('.service-box');
  serviceBoxes.forEach((card, index) => {
    const total = serviceBoxes.length;
    const isLeftHalf = total <= 2 ? (index === 0) : (index < Math.ceil(total / 2));
    card.classList.add(isLeftHalf ? 'animate-slide-left-long' : 'animate-slide-right-long');
    const delayNum = (index % 4) + 1;
    card.classList.add(`delay-${delayNum}`);
    scrollAnimObserver.observe(card);
  });

 
  const allCaseCards = document.querySelectorAll('.case-card');
  allCaseCards.forEach((card, index) => {
    if (index % 3 === 0) {
      card.classList.add('animate-slide-left-long', 'delay-1');
    } else if (index % 3 === 1) {
      card.classList.add('animate-zoom-in', 'delay-2');
    } else {
      card.classList.add('animate-slide-right-long', 'delay-3');
    }
    scrollAnimObserver.observe(card);
  });

 
  const processCards = document.querySelectorAll('.process-card');
  processCards.forEach((card, index) => {
    if (index % 2 === 0) {
      card.classList.add('animate-slide-left-long');
    } else {
      card.classList.add('animate-slide-right-long');
    }
    const delayNum = (index % 4) + 1;
    card.classList.add(`delay-${delayNum}`);
    scrollAnimObserver.observe(card);
  });

 
  const blogCards = document.querySelectorAll('.blog-card');
  blogCards.forEach((card, index) => {
    if (index % 3 === 0) {
      card.classList.add('animate-slide-left-long', 'delay-1');
    } else if (index % 3 === 1) {
      card.classList.add('animate-fade-up', 'delay-2');
    } else {
      card.classList.add('animate-slide-right-long', 'delay-3');
    }
    scrollAnimObserver.observe(card);
  });

 
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach((card, index) => {
    const isLeft = (index % 2 === 0);
    card.classList.add(isLeft ? 'animate-slide-left-long' : 'animate-slide-right-long');
    const delayNum = (index % 4) + 1;
    card.classList.add(`delay-${delayNum}`);
    scrollAnimObserver.observe(card);
  });

 
  const statCards = document.querySelectorAll('.dash-stat-card');
  statCards.forEach((card, index) => {
    const isLeft = (index < 2);
    card.classList.add(isLeft ? 'animate-slide-left-long' : 'animate-slide-right-long');
    card.classList.add(`delay-${(index % 4) + 1}`);
    scrollAnimObserver.observe(card);
  });

 
  const faqItems = document.querySelectorAll('.faq-item, .faq-item-clean');
  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const questionBtn = item.querySelector('.faq-question, .faq-question-btn');
      const answer = item.querySelector('.faq-answer, .faq-answer-block');

     
      if (item.classList.contains('active') && answer) {
        answer.style.maxHeight = (answer.scrollHeight + 30) + 'px';
      }

      questionBtn?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

       
        faqItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.faq-question, .faq-question-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            const otherAnswer = other.querySelector('.faq-answer, .faq-answer-block');
            if (otherAnswer) otherAnswer.style.maxHeight = '0px';
          }
        });

       
        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
          if (answer) answer.style.maxHeight = (answer.scrollHeight + 30) + 'px';
        } else {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
          if (answer) answer.style.maxHeight = '0px';
        }
      });
    });
  }

 
  document.addEventListener('click', (e) => {
    const targetLink = e.target.closest('a');
    if (targetLink) {
      const href = targetLink.getAttribute('href');
      if (href === '#' || href === '') {
        e.preventDefault();
        window.location.href = '404.html';
      }
    }
  });

 
  const flexCarousels = document.querySelectorAll('.flex-carousel-wrap');
  flexCarousels.forEach((wrap) => {
    const items = wrap.querySelectorAll('.flex-carousel-item');
    items.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        items.forEach((i) => i.classList.remove('active'));
        item.classList.add('active');
      });
      item.addEventListener('click', () => {
        items.forEach((i) => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  });

 
  const depthContainers = document.querySelectorAll('.depth-carousel-container');
  depthContainers.forEach((container) => {
    const cards = Array.from(container.querySelectorAll('.depth-carousel-card'));
    const prevBtn = container.querySelector('.depth-prev-btn');
    const nextBtn = container.querySelector('.depth-next-btn');
    const dots = Array.from(container.querySelectorAll('.depth-dot'));
    const stage = container.querySelector('.depth-carousel-stage') || container;
    if (cards.length === 0) return;

    let currentIndex = 0;
    const total = cards.length;
    let isHolding = false;
    let hasMoved = false;
    let startX = 0;
    let currentX = 0;
    let isCycling = false;

    function updateDepthClasses() {
      cards.forEach((card, i) => {
        card.className = 'depth-carousel-card';
        card.style.transform = '';
        card.style.transition = '';
        const diff = (i - currentIndex + total) % total;

        if (diff === 0) {
          card.classList.add('depth-card-center');
        } else if (diff === 1) {
          card.classList.add('depth-card-right-1');
        } else if (diff === total - 1) {
          card.classList.add('depth-card-left-1');
        } else if (diff === 2) {
          card.classList.add('depth-card-right-2');
        } else if (diff === total - 2) {
          card.classList.add('depth-card-left-2');
        } else {
          card.classList.add('depth-card-hidden');
        }
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    function nextDepth() {
      if (isCycling) return;
      isCycling = true;
      currentIndex = (currentIndex + 1) % total;
      updateDepthClasses();
      setTimeout(() => { isCycling = false; }, 450);
    }

    function prevDepth() {
      if (isCycling) return;
      isCycling = true;
      currentIndex = (currentIndex - 1 + total) % total;
      updateDepthClasses();
      setTimeout(() => { isCycling = false; }, 450);
    }

    nextBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      nextDepth();
    });

    prevBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      prevDepth();
    });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentIndex !== idx) {
          currentIndex = idx;
          updateDepthClasses();
        }
      });
    });

   
   

    function onPointerDown(e) {
      if (isCycling) return;
      if (e.target.closest('.depth-nav-btn') || e.target.closest('.depth-dot')) return;
      
      const point = e.touches ? e.touches[0] : e;
      startX = point.clientX;
      currentX = startX;
      isHolding = true;
      hasMoved = false;
      container.classList.add('is-dragging');
    }

    function onPointerMove(e) {
      if (!isHolding || isCycling) return;
      const point = e.touches ? e.touches[0] : e;
      currentX = point.clientX;
      const diffX = currentX - startX;

      if (Math.abs(diffX) > 4) {
        hasMoved = true;
      }

      if (hasMoved) {
        const centerCard = container.querySelector('.depth-card-center');
        if (centerCard) {
          centerCard.classList.add('is-dragging');
          centerCard.style.transition = 'none';
          const dragTilt = Math.max(-18, Math.min(18, diffX * -0.08));
          centerCard.style.transform = `translate3d(${diffX * 0.45}px, 0, 0) rotateY(${dragTilt}deg)`;
        }
      }
    }

    function onPointerUp() {
      if (!isHolding) return;
      isHolding = false;
      container.classList.remove('is-dragging');

      const centerCard = container.querySelector('.depth-card-center');
      if (centerCard) {
        centerCard.classList.remove('is-dragging');
        centerCard.style.transition = '';
      }

      if (hasMoved) {
        const diffX = currentX - startX;
       
        if (diffX < -30) {
          nextDepth();
        } else if (diffX > 30) {
          prevDepth();
        } else {
          updateDepthClasses();
        }
      } else {
       
        updateDepthClasses();
      }
      hasMoved = false;
    }

    stage.addEventListener('mousedown', (e) => {
      e.preventDefault();
      onPointerDown(e);
    });
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    stage.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
    window.addEventListener('touchcancel', onPointerUp);

    updateDepthClasses();
  });

 
  const animSlideUpCards = document.querySelectorAll('.methodology-stack-card.anim-slide-up');
  if (animSlideUpCards.length > 0) {
    const cardObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    animSlideUpCards.forEach((el) => cardObserver.observe(el));

   
    requestAnimationFrame(() => {
      animSlideUpCards.forEach((el) => {
        const bounds = el.getBoundingClientRect();
        if (bounds.top < window.innerHeight && bounds.bottom > 0) {
          el.classList.add('is-visible');
        }
      });
    });
  }

 
  const photoDecks = document.querySelectorAll('.photo-stack-deck');
  photoDecks.forEach((deck) => {
    let cards = Array.from(deck.querySelectorAll('.photo-stack-card'));
    let isCycling = false;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    const cardNames = [
      'Salem Executive HQ',
      'Strategy Boardroom',
      'Forensic Tax Lab',
      'Promoter Wealth Trust'
    ];
    let activeCardIndex = 0;

    function updateDeckInfo() {
      const counterEl = document.querySelector('#deckCounter');
      const nameEl = document.querySelector('#deckCardName');
      if (counterEl) counterEl.textContent = `0${activeCardIndex + 1} / 0${cards.length}`;
      if (nameEl) nameEl.textContent = cardNames[activeCardIndex] || 'Salem Heritage';
    }

    function throwCard(direction = 'right') {
      if (isCycling || cards.length <= 1) return;
      isCycling = true;

      const topCard = cards.find((c) => c.getAttribute('data-pos') === '0');
      if (!topCard) {
        isCycling = false;
        return;
      }

      topCard.classList.remove('is-dragging');
      topCard.style.transform = '';
      topCard.classList.add(direction === 'left' ? 'throwing-left' : 'throwing-right');

      setTimeout(() => {
        cards.forEach((c) => {
          let pos = parseInt(c.getAttribute('data-pos'), 10);
          if (c === topCard) {
            c.setAttribute('data-pos', String(cards.length - 1));
          } else {
            c.setAttribute('data-pos', String(pos - 1));
          }
        });
        topCard.classList.remove('throwing-right', 'throwing-left');
        activeCardIndex = (activeCardIndex + 1) % cards.length;
        updateDeckInfo();
        isCycling = false;
      }, 550);
    }

    function prevCard() {
      if (isCycling || cards.length <= 1) return;
      isCycling = true;

      const bottomCard = cards.find((c) => c.getAttribute('data-pos') === String(cards.length - 1));
      if (!bottomCard) {
        isCycling = false;
        return;
      }

      cards.forEach((c) => {
        let pos = parseInt(c.getAttribute('data-pos'), 10);
        if (c === bottomCard) {
          c.setAttribute('data-pos', '0');
        } else {
          c.setAttribute('data-pos', String(pos + 1));
        }
      });
      activeCardIndex = (activeCardIndex - 1 + cards.length) % cards.length;
      updateDeckInfo();
      setTimeout(() => { isCycling = false; }, 300);
    }

   
    let isMouseDown = false;
    let hasMoved = false;

    function resetDragState() {
      if (!isMouseDown && !isDragging) return;
      isMouseDown = false;
      isDragging = false;
      hasMoved = false;
      const topCard = cards.find((c) => c.getAttribute('data-pos') === '0');
      if (topCard) {
        topCard.classList.remove('is-dragging');
        topCard.style.transition = 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)';
        topCard.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
        setTimeout(() => { topCard.style.transition = ''; }, 350);
      }
    }

    deck.addEventListener('mousedown', (e) => {
      if (isCycling) return;
      const topCard = cards.find((c) => c.getAttribute('data-pos') === '0');
      if (!topCard || !topCard.contains(e.target)) return;

      e.preventDefault();
      isMouseDown = true;
      hasMoved = false;
      isDragging = false;
      startX = e.clientX;
      currentX = startX;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      const topCard = cards.find((c) => c.getAttribute('data-pos') === '0');
      if (!topCard) return;

      currentX = e.clientX;
      const deltaX = currentX - startX;

     
      if (!hasMoved && Math.abs(deltaX) > 4) {
        hasMoved = true;
        isDragging = true;
        topCard.classList.add('is-dragging');
      }

      if (hasMoved) {
        const rotate = deltaX * 0.08;
        topCard.style.transform = `translate3d(${deltaX}px, 0, 0) rotate(${rotate}deg)`;
      }
    });

    window.addEventListener('mouseup', () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      const topCard = cards.find((c) => c.getAttribute('data-pos') === '0');
      if (!topCard) return;

      topCard.classList.remove('is-dragging');
      const deltaX = currentX - startX;

     
      if (hasMoved && deltaX > 30) {
        throwCard('right');
      } else if (hasMoved && deltaX < -30) {
        throwCard('left');
      } else {
       
        topCard.style.transition = 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)';
        topCard.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
        setTimeout(() => { topCard.style.transition = ''; }, 350);
      }

      isDragging = false;
      hasMoved = false;
    });

   
    window.addEventListener('mouseleave', resetDragState);
    window.addEventListener('blur', resetDragState);

   
    deck.addEventListener('touchstart', (e) => {
      if (isCycling || e.touches.length === 0) return;
      const topCard = cards.find((c) => c.getAttribute('data-pos') === '0');
      if (!topCard || !topCard.contains(e.target)) return;

      isMouseDown = true;
      hasMoved = false;
      isDragging = false;
      startX = e.touches[0].clientX;
      currentX = startX;
    }, { passive: true });

    deck.addEventListener('touchmove', (e) => {
      if (!isMouseDown || e.touches.length === 0) return;
      const topCard = cards.find((c) => c.getAttribute('data-pos') === '0');
      if (!topCard) return;

      currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;

      if (!hasMoved && Math.abs(deltaX) > 4) {
        hasMoved = true;
        isDragging = true;
        topCard.classList.add('is-dragging');
      }

      if (hasMoved) {
        const rotate = deltaX * 0.08;
        topCard.style.transform = `translate3d(${deltaX}px, 0, 0) rotate(${rotate}deg)`;
      }
    }, { passive: true });

    deck.addEventListener('touchend', () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      const topCard = cards.find((c) => c.getAttribute('data-pos') === '0');
      if (!topCard) return;

      topCard.classList.remove('is-dragging');
      const deltaX = currentX - startX;

      if (hasMoved && deltaX > 30) {
        throwCard('right');
      } else if (hasMoved && deltaX < -30) {
        throwCard('left');
      } else {
        topCard.style.transition = 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)';
        topCard.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
        setTimeout(() => { topCard.style.transition = ''; }, 350);
      }

      isDragging = false;
      hasMoved = false;
    });

   
    document.querySelectorAll('.btn-throw-card').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        throwCard('right');
      });
    });

    document.querySelectorAll('.btn-prev-card').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        prevCard();
      });
    });

    updateDeckInfo();
  });

 
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.dtbtn')) return;
      card.classList.toggle('flipped');
    });
  });

 
  const chromaCards = document.querySelectorAll('.chroma-card');
  chromaCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15), #0d152a 70%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '#0d152a';
    });
  });

 
  const execGrid = document.querySelector('.executive-ref-grid');
  if (execGrid) {
    const execCards = Array.from(execGrid.querySelectorAll('.executive-ref-card'));

    function updateTorchlight(clientX, clientY) {
      execCards.forEach((card) => {
        const imgWrap = card.querySelector('.executive-ref-img-wrap');
        if (!imgWrap) return;

        const imgRect = imgWrap.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

       
        const imgX = clientX - imgRect.left;
        const imgY = clientY - imgRect.top;

       
        const cardX = clientX - cardRect.left;
        const cardY = clientY - cardRect.top;

        card.style.setProperty('--torch-x', `${imgX}px`);
        card.style.setProperty('--torch-y', `${imgY}px`);
        card.style.setProperty('--torch-card-x', `${cardX}px`);
        card.style.setProperty('--torch-card-y', `${cardY}px`);

       
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const dist = Math.hypot(clientX - cardCenterX, clientY - cardCenterY);

       
        if (dist < 520) {
          const proximity = Math.max(0.3, 1 - (dist - 160) / 360);
          card.style.setProperty('--torch-opacity', Math.min(1, proximity).toFixed(3));
        } else {
          card.style.setProperty('--torch-opacity', '0');
        }
      });
    }

    execGrid.addEventListener('mousemove', (e) => {
      updateTorchlight(e.clientX, e.clientY);
    });

    execGrid.addEventListener('mouseleave', () => {
      execCards.forEach((card) => {
        card.style.setProperty('--torch-opacity', '0');
      });
    });

   
    execGrid.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        updateTorchlight(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    execGrid.addEventListener('touchend', () => {
      setTimeout(() => {
        execCards.forEach((card) => {
          card.style.setProperty('--torch-opacity', '0');
        });
      }, 1500);
    });
  }

 
  const storySliders = document.querySelectorAll('.story-slider-wrap');
  storySliders.forEach((slider) => {
    const track = slider.querySelector('.story-slider-track');
    const slides = slider.querySelectorAll('.story-slide');
    const prevBtn = slider.querySelector('.story-prev-btn');
    const nextBtn = slider.querySelector('.story-next-btn');
    if (!track || slides.length === 0) return;

    let slideIndex = 0;
    const totalSlides = slides.length;

    function getVisibleCount() {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 991) return 2;
      return 3;
    }

    function goToSlide(idx) {
      if (slider.classList.contains('multi-card-slider')) {
        const visibleCount = getVisibleCount();
        const maxIndex = Math.max(0, totalSlides - visibleCount);

        if (idx > maxIndex) {
          slideIndex = 0;
        } else if (idx < 0) {
          slideIndex = maxIndex;
        } else {
          slideIndex = idx;
        }

        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap = 24;
        track.style.transform = `translateX(-${slideIndex * (slideWidth + gap)}px)`;
      } else {
        slideIndex = (idx + totalSlides) % totalSlides;
        track.style.transform = `translateX(-${slideIndex * 100}%)`;
      }
    }

    nextBtn?.addEventListener('click', () => goToSlide(slideIndex + 1));
    prevBtn?.addEventListener('click', () => goToSlide(slideIndex - 1));

    let sliderInterval = setInterval(() => goToSlide(slideIndex + 1), 3500);
    slider.addEventListener('mouseenter', () => clearInterval(sliderInterval));
    slider.addEventListener('mouseleave', () => {
      clearInterval(sliderInterval);
      sliderInterval = setInterval(() => goToSlide(slideIndex + 1), 3500);
    });

    window.addEventListener('resize', () => goToSlide(slideIndex));
  });

  /* ==========================================================================
     STACKLY ENTERPRISE AUTHENTICATION & REDIRECTION SYSTEM
     ========================================================================== */
  const roleCards = document.querySelectorAll('.role-card');
  const selectedRoleInput = document.getElementById('selectedRole');
  if (roleCards.length > 0 && selectedRoleInput) {
    roleCards.forEach(card => {
      card.addEventListener('click', () => {
        roleCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const role = card.getAttribute('data-role');
        if (role) {
          selectedRoleInput.value = role;
        }
      });
    });
  }

 
  const setupPasswordToggle = (btnId, inputId) => {
    const toggleBtn = document.getElementById(btnId);
    const input = document.getElementById(inputId);
    if (toggleBtn && input) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isPass = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPass ? 'text' : 'password');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.className = isPass ? 'fas fa-eye-slash' : 'fas fa-eye';
        }
      });
    }
  };
  setupPasswordToggle('togglePassword', 'signinPassword');
  setupPasswordToggle('togglePassword', 'signupPassword');
  setupPasswordToggle('toggleConfirmPassword', 'signupConfirmPassword');

 
  const setAuthError = (boxId, errorId, msg) => {
    const box = document.getElementById(boxId);
    const err = document.getElementById(errorId);
    if (box && err) {
      box.classList.add('has-error');
      err.textContent = msg;
    }
  };
  const clearAuthError = (boxId, errorId) => {
    const box = document.getElementById(boxId);
    const err = document.getElementById(errorId);
    if (box && err) {
      box.classList.remove('has-error');
      err.textContent = '';
    }
  };

 
  const signinForm = document.getElementById('signinForm');
  if (signinForm) {
    const nameInput = document.getElementById('signinName');
    const emailInput = document.getElementById('signinEmail');
    const passInput = document.getElementById('signinPassword');

    if (nameInput) {
      nameInput.addEventListener('input', () => {
        if (nameInput.value.trim().length >= 2 && /^[A-Za-z\s]+$/.test(nameInput.value.trim())) {
          clearAuthError('nameBox', 'nameError');
        }
      });
    }
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailInput.value.trim())) {
          clearAuthError('emailBox', 'emailError');
        }
      });
    }
    if (passInput) {
      passInput.addEventListener('input', () => {
        if (passInput.value.length >= 6) {
          clearAuthError('passwordBox', 'passwordError');
        }
      });
    }

    signinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const passVal = passInput ? passInput.value : '';
      const roleVal = selectedRoleInput ? selectedRoleInput.value : 'corporate';

     
      if (!nameVal) {
        setAuthError('nameBox', 'nameError', 'Please enter your full name.');
        if (isValid && nameInput) nameInput.focus();
        isValid = false;
      } else if (!/^[A-Za-z\s]+$/.test(nameVal)) {
        setAuthError('nameBox', 'nameError', 'Name must contain alphabets only (no numbers or symbols).');
        if (isValid && nameInput) nameInput.focus();
        isValid = false;
      } else if (nameVal.length < 2) {
        setAuthError('nameBox', 'nameError', 'Name must be at least 2 characters.');
        if (isValid && nameInput) nameInput.focus();
        isValid = false;
      } else {
        clearAuthError('nameBox', 'nameError');
      }

     
      if (!emailVal) {
        setAuthError('emailBox', 'emailError', 'Please enter your corporate email address.');
        if (isValid && emailInput) emailInput.focus();
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailVal)) {
        setAuthError('emailBox', 'emailError', 'Please enter a valid email address (e.g. name@company.com).');
        if (isValid && emailInput) emailInput.focus();
        isValid = false;
      } else {
        clearAuthError('emailBox', 'emailError');
      }

     
      if (!passVal) {
        setAuthError('passwordBox', 'passwordError', 'Please enter your password.');
        if (isValid && passInput) passInput.focus();
        isValid = false;
      } else if (passVal.length < 6) {
        setAuthError('passwordBox', 'passwordError', 'Password must be at least 6 characters.');
        if (isValid && passInput) passInput.focus();
        isValid = false;
      } else {
        clearAuthError('passwordBox', 'passwordError');
      }

      if (!isValid) return;

     
      localStorage.setItem('stackly_user_name', nameVal);
      localStorage.setItem('stackly_user_email', emailVal);
      localStorage.setItem('stackly_user_role', roleVal);

     
      if (roleVal === 'admin') {
        window.location.href = 'admin-dashboard.html';
      } else {
        window.location.href = 'customer-dashboard.html';
      }
    });
  }

 
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    const nameInput = document.getElementById('signupName');
    const emailInput = document.getElementById('signupEmail');
    const passInput = document.getElementById('signupPassword');
    const confirmPassInput = document.getElementById('signupConfirmPassword');
    const termsCheck = document.getElementById('termsCheck');
    const successModal = document.getElementById('signupSuccessModal');

    if (nameInput) {
      nameInput.addEventListener('input', () => {
        if (nameInput.value.trim().length >= 2 && /^[A-Za-z\s]+$/.test(nameInput.value.trim())) {
          clearAuthError('nameBox', 'nameError');
        }
      });
    }
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailInput.value.trim())) {
          clearAuthError('emailBox', 'emailError');
        }
      });
    }
    if (passInput) {
      passInput.addEventListener('input', () => {
        if (passInput.value.length >= 6) {
          clearAuthError('passwordBox', 'passwordError');
        }
      });
    }
    if (confirmPassInput) {
      confirmPassInput.addEventListener('input', () => {
        if (confirmPassInput.value === passInput.value) {
          clearAuthError('confirmPasswordBox', 'confirmPasswordError');
        }
      });
    }
    if (termsCheck) {
      termsCheck.addEventListener('change', () => {
        if (termsCheck.checked) {
          clearAuthError('termsBox', 'termsError');
        }
      });
    }

    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const passVal = passInput ? passInput.value : '';
      const confirmVal = confirmPassInput ? confirmPassInput.value : '';
      const roleVal = selectedRoleInput ? selectedRoleInput.value : 'corporate';

     
      if (!nameVal) {
        setAuthError('nameBox', 'nameError', 'Please enter your full legal name.');
        if (isValid && nameInput) nameInput.focus();
        isValid = false;
      } else if (!/^[A-Za-z\s]+$/.test(nameVal)) {
        setAuthError('nameBox', 'nameError', 'Name must contain alphabets only (no numbers or symbols).');
        if (isValid && nameInput) nameInput.focus();
        isValid = false;
      } else if (nameVal.length < 2) {
        setAuthError('nameBox', 'nameError', 'Name must be at least 2 characters.');
        if (isValid && nameInput) nameInput.focus();
        isValid = false;
      } else {
        clearAuthError('nameBox', 'nameError');
      }

     
      if (!emailVal) {
        setAuthError('emailBox', 'emailError', 'Please enter your corporate email address.');
        if (isValid && emailInput) emailInput.focus();
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailVal)) {
        setAuthError('emailBox', 'emailError', 'Please enter a valid email address (e.g. name@company.com).');
        if (isValid && emailInput) emailInput.focus();
        isValid = false;
      } else {
        clearAuthError('emailBox', 'emailError');
      }

     
      if (!passVal) {
        setAuthError('passwordBox', 'passwordError', 'Please create a password.');
        if (isValid && passInput) passInput.focus();
        isValid = false;
      } else if (passVal.length < 6) {
        setAuthError('passwordBox', 'passwordError', 'Password must be at least 6 characters long.');
        if (isValid && passInput) passInput.focus();
        isValid = false;
      } else {
        clearAuthError('passwordBox', 'passwordError');
      }

     
      if (!confirmVal) {
        setAuthError('confirmPasswordBox', 'confirmPasswordError', 'Please confirm your password.');
        if (isValid && confirmPassInput) confirmPassInput.focus();
        isValid = false;
      } else if (confirmVal !== passVal) {
        setAuthError('confirmPasswordBox', 'confirmPasswordError', 'Passwords do not match.');
        if (isValid && confirmPassInput) confirmPassInput.focus();
        isValid = false;
      } else {
        clearAuthError('confirmPasswordBox', 'confirmPasswordError');
      }

     
      if (termsCheck && !termsCheck.checked) {
        setAuthError('termsBox', 'termsError', 'You must agree to the Terms of Service to register.');
        isValid = false;
      } else {
        clearAuthError('termsBox', 'termsError');
      }

      if (!isValid) return;

     
      localStorage.setItem('stackly_user_name', nameVal);
      localStorage.setItem('stackly_user_email', emailVal);
      localStorage.setItem('stackly_user_role', roleVal);

     
      if (successModal) {
        successModal.classList.add('is-active');
      }

     
      setTimeout(() => {
        window.location.href = 'signin.html';
      }, 1600);
    });
  }

 
  window.addEventListener('pageshow', (event) => {
    document.querySelectorAll('.auth-modal-backdrop.is-active, #signupSuccessModal.is-active').forEach((m) => m.classList.remove('is-active'));
    if (event.persisted || (performance.getEntriesByType('navigation')[0] || {}).type === 'back_forward') {
      [signinForm, signupForm].forEach((f) => { if (f) f.reset(); });
      document.querySelectorAll('.form-input-box.has-error').forEach((b) => b.classList.remove('has-error'));
      document.querySelectorAll('.error-msg').forEach((el) => { el.textContent = ''; });
    }
  });
});


})();

(function() {
/**
 * STACKLY - Enterprise Dashboards Interactive JavaScript
 * Client & Admin Portal functionality, mobile drawer toggle, tab navigation,
 * dynamic session hydration, chart simulations, data filter and chat widget
 */

document.addEventListener('DOMContentLoaded', () => {
 
  const storedName = localStorage.getItem('stackly_user_name');
  const storedEmail = localStorage.getItem('stackly_user_email');
  const storedRole = localStorage.getItem('stackly_user_role');

  if (storedName) {
    const dashName = document.getElementById('dashUserName');
    const sideName = document.getElementById('sideUserName');
    const adminName = document.getElementById('adminUserName');
    const sideAdminName = document.getElementById('sideAdminName');
    const userAvatar = document.getElementById('userAvatar');
    const adminAvatar = document.getElementById('adminAvatar');

    if (dashName) dashName.textContent = storedName;
    if (sideName) sideName.textContent = storedName;
    if (adminName) adminName.textContent = storedName;
    if (sideAdminName) sideAdminName.textContent = storedName;
    if (userAvatar) userAvatar.textContent = storedName.charAt(0).toUpperCase();
    if (adminAvatar) adminAvatar.textContent = storedName.charAt(0).toUpperCase();
  }

  if (storedEmail) {
    const dashEmail = document.getElementById('dashUserEmail');
    const sideEmail = document.getElementById('sideUserEmail');
    const adminEmail = document.getElementById('adminUserEmail');
    const sideAdminEmail = document.getElementById('sideAdminEmail');

    if (dashEmail) dashEmail.textContent = storedEmail;
    if (sideEmail) sideEmail.textContent = storedEmail;
    if (adminEmail) adminEmail.textContent = storedEmail;
    if (sideAdminEmail) sideAdminEmail.textContent = storedEmail;
  }

 
  const sidebarToggle = document.getElementById('dashSidebarToggle');
  const sidebarClose = document.getElementById('dashSidebarClose');
  const sidebarDock = document.querySelector('.dash-sidebar-dock');
  const sidebarBackdrop = document.getElementById('dashSidebarBackdrop');

  function openMobileSidebar() {
    if (sidebarDock) sidebarDock.classList.add('is-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('is-active');
    if (sidebarToggle) {
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      }
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMobileSidebar() {
    if (sidebarDock) sidebarDock.classList.remove('is-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('is-active');
    if (sidebarToggle) {
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
    document.body.style.overflow = '';
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebarDock && sidebarDock.classList.contains('is-open')) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
  }

  if (sidebarClose) {
    sidebarClose.addEventListener('click', closeMobileSidebar);
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeMobileSidebar);
  }

 
  const sidebarTabLinks = document.querySelectorAll('.dashboard-sidebar-menu a[data-tab]');
  if (sidebarTabLinks.length > 0) {
    sidebarTabLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetTabId = link.getAttribute('data-tab');
        if (!targetTabId) return;

        sidebarTabLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        document.querySelectorAll('.dash-tab-pane').forEach(pane => {
          pane.classList.remove('active');
        });

        const targetPane = document.getElementById(`tab-${targetTabId}`);
        if (targetPane) {
          targetPane.classList.add('active');
        }

       
        if (window.innerWidth <= 992) {
          closeMobileSidebar();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        const mainScroll = document.querySelector('.dash-main-scroll');
        if (mainScroll) mainScroll.scrollTop = 0;
      });
    });
  }

 
  const dashBellBtn = document.getElementById('dashBellBtn');
  const dashNotifDropdown = document.getElementById('dashNotifDropdown');
  if (dashBellBtn && dashNotifDropdown) {
    dashBellBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dashNotifDropdown.classList.toggle('is-open');
    });

    document.addEventListener('click', (e) => {
      if (!dashNotifDropdown.contains(e.target) && e.target !== dashBellBtn && !dashBellBtn.contains(e.target)) {
        dashNotifDropdown.classList.remove('is-open');
      }
    });
  }

 
  const logoutTriggers = document.querySelectorAll('.dash-logout-trigger');
  const logoutModal = document.getElementById('logoutModal');
  const cancelLogoutBtn = document.getElementById('cancelLogoutBtn');
  const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');

  if (logoutTriggers.length > 0 && logoutModal) {
    logoutTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        logoutModal.classList.add('is-active');
      });
    });

    if (cancelLogoutBtn) {
      cancelLogoutBtn.addEventListener('click', () => {
        logoutModal.classList.remove('is-active');
      });
    }

    if (confirmLogoutBtn) {
      confirmLogoutBtn.addEventListener('click', () => {
        localStorage.removeItem('stackly_user_name');
        localStorage.removeItem('stackly_user_email');
        localStorage.removeItem('stackly_user_role');
        window.location.href = 'index.html';
      });
    }

    logoutModal.addEventListener('click', (e) => {
      if (e.target === logoutModal) {
        logoutModal.classList.remove('is-active');
      }
    });
  }

 
  const searchInput = document.querySelector('#table-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const rows = document.querySelectorAll('.modern-data-table tbody tr, .custom-table tbody tr');

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

 
  const filterPills = document.querySelectorAll('.admin-filter-pill');
  if (filterPills.length > 0) {
    filterPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        filterPills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        const filterText = pill.textContent.trim().toLowerCase();
        const rows = document.querySelectorAll('.admin-client-table tbody tr');
        rows.forEach((row) => {
          const rowText = row.textContent.toLowerCase();
          if (filterText.includes('all')) {
            row.style.display = '';
          } else if (filterText.includes('heavy') && rowText.includes('heavy')) {
            row.style.display = '';
          } else if (filterText.includes('textiles') && (rowText.includes('textiles') || rowText.includes('garments'))) {
            row.style.display = '';
          } else if (filterText.includes('tech') && (rowText.includes('tech') || rowText.includes('cloudscale'))) {
            row.style.display = '';
          } else if (filterText.includes('pharma') && (rowText.includes('pharma') || rowText.includes('healthcare'))) {
            row.style.display = '';
          } else if (filterText.includes('action') && (rowText.includes('review') || rowText.includes('audit'))) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
    });
  }

 
  const actionButtons = document.querySelectorAll('.action-approve, .action-reject');
  actionButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const row = btn.closest('tr');
      const clientName = row?.querySelector('.client-name')?.textContent || 'Client Group';
      const statusBadge = row?.querySelector('.status-badge-modern, .status-badge');

      if (btn.classList.contains('action-approve')) {
        if (statusBadge) {
          statusBadge.className = 'status-badge-modern success';
          statusBadge.innerHTML = '<i class="fas fa-check-circle"></i> Active Retainer';
        }
        if (typeof window.showToast === 'function') {
          window.showToast(`Approved consulting engagement for ${clientName}!`);
        } else {
          alert(`Approved consulting engagement for ${clientName}!`);
        }
      } else {
        if (statusBadge) {
          statusBadge.className = 'status-badge-modern warning';
          statusBadge.innerHTML = '<i class="fas fa-clock"></i> Declined / On Hold';
        }
        if (typeof window.showToast === 'function') {
          window.showToast(`Declined engagement for ${clientName}`);
        } else {
          alert(`Declined engagement for ${clientName}`);
        }
      }
    });
  });

 
  const chatToggleBtn = document.querySelector('.chat-widget-toggle');
  const chatBox = document.querySelector('.chat-widget-box');
  const chatClose = document.querySelector('.chat-close-btn');
  const chatForm = document.querySelector('.chat-input-form');
  const chatMessages = document.querySelector('.chat-messages');

  if (chatToggleBtn && chatBox) {
    chatToggleBtn.addEventListener('click', () => {
      chatBox.classList.toggle('active');
    });

    chatClose?.addEventListener('click', () => {
      chatBox.classList.remove('active');
    });

    chatForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = chatForm.querySelector('input');
      const text = input?.value.trim();

      if (text && chatMessages) {
        const userMsg = document.createElement('div');
        userMsg.style.cssText = 'align-self: flex-end; background: var(--primary, #ff4a17); color: #fff; padding: 10px 16px; border-radius: 16px 16px 2px 16px; max-width: 80%; font-size: 0.88rem; margin-bottom: 8px;';
        userMsg.textContent = text;
        chatMessages.appendChild(userMsg);
        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
          const reply = document.createElement('div');
          reply.style.cssText = 'align-self: flex-start; background: #0f1c3f; color: #e2e8f0; padding: 10px 16px; border-radius: 16px 16px 16px 2px; max-width: 80%; font-size: 0.88rem; margin-bottom: 8px;';
          reply.textContent = 'Thank you for reaching out to Stackly Salem. Senior Tax Advisor Vignesh is reviewing your filing request right now.';
          chatMessages.appendChild(reply);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
      }
    });
  }

 
  const downloadBtns = document.querySelectorAll('.download-report-btn');
  downloadBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '404.html';
    });
  });
});

})();

(function() {

document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(pointer: fine)').matches && window.innerWidth > 991) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';

    const ring = document.createElement('div');
    ring.className = 'cursor-ring';

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = -100;
    let mouseY = -100;
    let prevMouseX = -100;
    let prevMouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let lastSparkleTime = 0;

    const sparkleColors = [
      'rgba(255, 74, 23, 0.9)',
      'rgba(255, 170, 0, 0.9)',
      'rgba(255, 255, 255, 0.95)',
      'rgba(56, 189, 248, 0.85)'
    ];

    function createSparkle(x, y) {
      const sparkle = document.createElement('div');
      sparkle.className = 'cursor-sparkle';
      const size = Math.random() * 4 + 3;
      const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
      const dx = (Math.random() - 0.5) * 36;
      const dy = (Math.random() - 0.5) * 36;

      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.backgroundColor = color;
      sparkle.style.boxShadow = `0 0 10px ${color}`;
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.setProperty('--dx', `${dx}px`);
      sparkle.style.setProperty('--dy', `${dy}px`);

      document.body.appendChild(sparkle);

      sparkle.addEventListener('animationend', () => {
        sparkle.remove();
      });
    }

    function createRipple(x, y) {
      const ripple = document.createElement('div');
      ripple.className = 'cursor-ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = '30px';
      ripple.style.height = '30px';

      document.body.appendChild(ripple);

      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    }

   
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        dot.classList.add('visible');
        ring.classList.add('visible');
      }

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

     
      const now = performance.now();
      const dist = Math.hypot(mouseX - prevMouseX, mouseY - prevMouseY);
      if (now - lastSparkleTime > 28 && dist > 5) {
        createSparkle(mouseX, mouseY);
        lastSparkleTime = now;
        prevMouseX = mouseX;
        prevMouseY = mouseY;
      }
    });

    window.addEventListener('mouseleave', () => {
      dot.classList.remove('visible');
      ring.classList.remove('visible');
      isVisible = false;
    });

   
    function animate() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

   
    window.addEventListener('mousedown', (e) => {
      ring.classList.add('click-active');
      dot.classList.add('click-active');
      createRipple(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
      ring.classList.remove('click-active');
      dot.classList.remove('click-active');
    });

   
    function bindHover() {
      const targets = document.querySelectorAll(
        'a, button, .dtbtn, .service-btn, .case-card-btn, .capsule-play-btn, .case-video-badge, input, select, textarea, .tab-btn, .faq-header, .faq-question, .wizard-step-node, [role="button"]'
      );
      targets.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          ring.classList.add('hover-active');
          dot.classList.add('hover-active');
        });
        el.addEventListener('mouseleave', () => {
          ring.classList.remove('hover-active');
          dot.classList.remove('hover-active');
        });
      });
    }

    bindHover();
  }
});

})();
