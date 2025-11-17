// Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById("mobileMenuBtn")
        const nav = document.getElementById("nav")

        mobileMenuBtn.addEventListener("click", () => {
          mobileMenuBtn.classList.toggle("active")
          nav.classList.toggle("active")
        })

        // Close mobile menu when clicking on a link
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.addEventListener("click", () => {
            mobileMenuBtn.classList.remove("active")
            nav.classList.remove("active")
          })
        })

        // Smooth Scroll for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.addEventListener("click", function (e) {
            e.preventDefault()
            const target = document.querySelector(this.getAttribute("href"))
            if (target) {
              const headerOffset = 80
              const elementPosition = target.getBoundingClientRect().top
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              })
            }
          })
        })

        // Header Scroll Effect
        let lastScroll = 0
        const header = document.getElementById("header")

        window.addEventListener("scroll", () => {
          const currentScroll = window.pageYOffset

          if (currentScroll > 100) {
            header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)"
          } else {
            header.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
          }

          lastScroll = currentScroll
        })

        // Projects Carousel
        const carousel = document.getElementById("projectsCarousel")
        const carouselPrev = document.getElementById("carouselPrev")
        const carouselNext = document.getElementById("carouselNext")
        const carouselDots = document.getElementById("carouselDots")

        let currentSlide = 0
        const slides = document.querySelectorAll(".project-card")
        const totalSlides = slides.length

        // Create dots
        for (let i = 0; i < totalSlides; i++) {
          const dot = document.createElement("div")
          dot.classList.add("carousel-dot")
          if (i === 0) dot.classList.add("active")
          dot.addEventListener("click", () => goToSlide(i))
          carouselDots.appendChild(dot)
        }

        const dots = document.querySelectorAll(".carousel-dot")

        function updateCarousel() {
          const slideWidth = slides[0].offsetWidth + 24 // width + gap
          carousel.scrollTo({
            left: slideWidth * currentSlide,
            behavior: "smooth",
          })

          dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide)
          })
        }

        function goToSlide(index) {
          currentSlide = index
          updateCarousel()
        }

        carouselPrev.addEventListener("click", () => {
          currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
          updateCarousel()
        })

        carouselNext.addEventListener("click", () => {
          currentSlide = (currentSlide + 1) % totalSlides
          updateCarousel()
        })

        // Auto-scroll carousel on mobile
        let autoScrollInterval
        if (window.innerWidth < 768) {
          autoScrollInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides
            updateCarousel()
          }, 5000)
        }

        // Contact Form Submission
        const contactForm = document.getElementById("contactForm")
        const contactSuccess = document.getElementById("contactSuccess")

        contactForm.addEventListener("submit", (e) => {
          e.preventDefault()

          // Simulate form submission
          setTimeout(() => {
            contactSuccess.classList.add("show")
            contactForm.reset()

            setTimeout(() => {
              contactSuccess.classList.remove("show")
            }, 5000)
          }, 500)
        })

        // Donation Modal
        const donationModal = document.getElementById("donationModal")

        function openDonationModal() {
          donationModal.classList.add("show")
          document.body.style.overflow = "hidden"
        }

        function closeDonationModal() {
          donationModal.classList.remove("show")
          document.body.style.overflow = ""
        }

        // Close modal on escape key
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && donationModal.classList.contains("show")) {
            closeDonationModal()
          }
        })

        // Donation Tabs
        function switchDonationTab(tabName) {
          // Update tabs
          document.querySelectorAll(".donation-tab").forEach((tab) => {
            tab.classList.toggle("active", tab.dataset.tab === tabName)
          })

          // Update panels
          document.querySelectorAll(".donation-panel").forEach((panel) => {
            panel.classList.toggle("active", panel.id === `${tabName}-panel`)
          })
        }

        // Amount Selection
        function selectAmount(amount) {
          // Remove selected class from all buttons
          document.querySelectorAll(".amount-btn").forEach((btn) => {
            btn.classList.remove("selected")
          })

          // Add selected class to clicked button
          event.target.classList.add("selected")

          // Update input fields
          const customAmount = document.getElementById("customAmount")
          const cardAmount = document.getElementById("cardAmount")

          if (customAmount) customAmount.value = amount
          if (cardAmount) cardAmount.value = amount
        }

        // Copy PIX Key
        function copyPixKey() {
          const pixKey = "doacao@dcprsantacasa.org.br"

          // Create temporary input
          const tempInput = document.createElement("input")
          tempInput.value = pixKey
          document.body.appendChild(tempInput)
          tempInput.select()
          document.execCommand("copy")
          document.body.removeChild(tempInput)

          // Show feedback
          const btn = event.target
          const originalText = btn.textContent
          btn.textContent = "Copiado!"
          btn.style.background = "var(--color-success)"
          btn.style.color = "var(--color-white)"

          setTimeout(() => {
            btn.textContent = originalText
            btn.style.background = ""
            btn.style.color = ""
          }, 2000)
        }

        // Card Form Submission
        const cardForm = document.getElementById("cardForm")

        if (cardForm) {
          cardForm.addEventListener("submit", (e) => {
            e.preventDefault()

            // Simulate payment processing
            const btn = cardForm.querySelector('button[type="submit"]')
            const originalText = btn.textContent
            btn.textContent = "Processando..."
            btn.disabled = true

            setTimeout(() => {
              alert("Doação realizada com sucesso! Obrigado por sua contribuição.")
              closeDonationModal()
              cardForm.reset()
              btn.textContent = originalText
              btn.disabled = false
            }, 2000)
          })
        }

        // Intersection Observer for Animations
        const observerOptions = {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1"
              entry.target.style.transform = "translateY(0)"
            }
          })
        }, observerOptions)

        // Observe elements for animation
        document.querySelectorAll(".about-card, .project-card, .event-card, .help-card, .report-card, .transparency-stat, .news-headline").forEach((el) => {
          el.style.opacity = "0"
          el.style.transform = "translateY(20px)"
          el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
          observer.observe(el)
        })
