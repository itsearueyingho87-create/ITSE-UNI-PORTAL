document.addEventListener('DOMContentLoaded', () => {

  /* ========================
      HERO SLIDER
     ======================== */
  let heroCurrent = 0;
  const heroSlidesEl = document.querySelector(".slides");
  const heroDots = document.querySelectorAll(".dot");
  const HERO_TOTAL = heroDots.length || 5;

  function goToHeroSlide(idx) {
    heroCurrent = idx;
    if (heroSlidesEl) {
      heroSlidesEl.style.transform = `translateX(-${idx * 100}%)`;
    }
    updateHeroDots();
  }

  function updateHeroDots() {
    heroDots.forEach((d, i) =>
      d.classList.toggle("active", i === heroCurrent)
    );
  }

  if (heroSlidesEl && heroDots.length) {
    setInterval(() => {
      heroCurrent = (heroCurrent + 1) % HERO_TOTAL;
      goToHeroSlide(heroCurrent);
    }, 5000);
  }

  /* ========================
      FACT COUNTERS
     ======================== */
  const counters = document.querySelectorAll('.fact-number');

  counters.forEach(counter => {
    const target = Number(counter.getAttribute('data-target')) || 0;
    const duration = 1200;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      counter.textContent = Math.floor(progress * target);

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });

  /* ========================
      FACULTY HORIZONTAL SCROLLER
     ======================== */
  const facultySlider = document.querySelector(".slider");
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");
  const sliderContainer = document.querySelector(".slider-container");

  if (facultySlider && leftBtn && rightBtn && sliderContainer) {
    let translateX = 0;
    const card = document.querySelector(".faculty-card");

    if (card) {
      const calcSizes = () => {
        const cardStyle = window.getComputedStyle(card);
        const slideWidth =
          card.offsetWidth + parseInt(cardStyle.marginRight || 0);
        const totalItems =
          document.querySelectorAll(".faculty-card").length;
        const containerWidth = sliderContainer.offsetWidth;
        const maxTranslate = Math.min(
          0,
          containerWidth - totalItems * slideWidth
        );

        return { slideWidth, maxTranslate };
      };

      leftBtn.addEventListener("click", () => {
        const { slideWidth } = calcSizes();
        if (translateX < 0) {
          translateX += slideWidth;
          facultySlider.style.transform = `translateX(${translateX}px)`;
        }
      });

      rightBtn.addEventListener("click", () => {
        const { slideWidth, maxTranslate } = calcSizes();
        if (translateX > maxTranslate) {
          translateX -= slideWidth;
          facultySlider.style.transform = `translateX(${translateX}px)`;
        }
      });

      window.addEventListener("resize", () => {
        const { maxTranslate } = calcSizes();
        if (translateX < maxTranslate) {
          translateX = maxTranslate;
          facultySlider.style.transform = `translateX(${translateX}px)`;
        }
      });
    }
  }

  /* ========================
      ADMISSIONS SLIDER
     ======================== */
  const slider = document.querySelector(".admissions-slider");
  const dots = document.querySelectorAll(".admission-dot");
  let index = 0;

  function showSlide(n) {
    if (!slider || !dots.length) return;

    index = n;
    slider.style.transform = `translateX(-${n * 100}%)`;

    dots.forEach(d => d.classList.remove("active"));
    dots[n].classList.add("active");
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
  });

  if (slider && dots.length) {
    setInterval(() => {
      index = (index + 1) % dots.length;
      showSlide(index);
    }, 7000);
  }

  /* ========================
      MODAL
     ======================== */
  window.openModal = function () {
    const modal = document.getElementById("applyModal");
    if (modal) modal.style.display = "flex";
  };

  window.closeModal = function () {
    const modal = document.getElementById("applyModal");
    if (modal) modal.style.display = "none";
  };

}); 

// ROLE TOGGLE
document.querySelectorAll(".role-select button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".role-select button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// CHARACTER COUNT
const textarea = document.querySelector("textarea");
const count = document.querySelector(".char-count");

textarea.addEventListener("input", () => {
  count.textContent = `${textarea.value.length} / 225`;
});



document.getElementById("continueApplication").addEventListener("click", () => {
  const name = document.getElementById("modalFullName").value;
  const email = document.getElementById("modalEmail").value;

  // Basic validation
  if (!name || !email) {
    alert("Please enter both your name and email to continue.");
    return;
  }

  // Redirect to apply.html with query parameters
  const url = `apply.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
  window.location.href = url;
});

/* ========================
    SITE SEARCH FUNCTIONALITY
   ======================== */
const searchInputEl = document.querySelector(".search-input");
const searchResultsEl = document.querySelector(".search-results");

const searchableContent = [
  { title: "Home", keywords: ["home", "welcome", "vision", "learning"], link: "#Home" },
  { title: "About Us", keywords: ["about", "mission", "vision", "core values", "integrity"], link: "#about-preview" },
  { title: "Facts", keywords: ["facts", "students", "staff", "colleges", "degrees"], link: ".facts-section" },
  { title: "Social Activities", keywords: ["social", "clubs", "community", "service", "leadership"], link: "#social" },
  { title: "Faculties & Colleges", keywords: ["faculties", "colleges", "science", "medical", "engineering", "management"], link: "#faculty" },
  { title: "Sports", keywords: ["sports", "football", "basketball", "volleyball", "exercise", "recreation"], link: "#sports" },
  { title: "Admissions & Courses", keywords: ["admission", "courses", "undergraduate", "scholarships", "grants", "apply", "degrees"], link: ".admissions-section" },
  { title: "Academic Advisor Form", keywords: ["form", "advisor", "contact", "enquiry"], link: ".form-wrapper" },
  { title: "Contact & Footer", keywords: ["contact", "email", "phone", "address", "enquiry"], link: "#footer" }
];

if (searchInputEl && searchResultsEl) {
  searchInputEl.addEventListener("input", function() {
    const query = this.value.toLowerCase().trim();
    searchResultsEl.innerHTML = "";
    
    if (query.length > 0) {
      const results = searchableContent.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.keywords.some(k => k.includes(query))
      );
      
      if (results.length > 0) {
        results.forEach(res => {
          const div = document.createElement("div");
          div.className = "search-result-item";
          div.innerHTML = `<strong>${res.title}</strong><small>Go to section</small>`;
          div.addEventListener("click", () => {
            const targetEl = document.querySelector(res.link);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth' });
              searchInputEl.value = "";
              searchResultsEl.classList.remove("show");
              searchInputEl.classList.remove("expand");
            }
          });
          searchResultsEl.appendChild(div);
        });
      } else {
        const div = document.createElement("div");
        div.className = "search-result-item";
        div.innerHTML = `<small>No results found for "${query}"</small>`;
        searchResultsEl.appendChild(div);
      }
      searchResultsEl.classList.add("show");
    } else {
      searchResultsEl.classList.remove("show");
    }
  });

  // Close search results when clicking outside
  document.addEventListener("click", function(e) {
    if (!e.target.closest(".search-container")) {
      searchResultsEl.classList.remove("show");
    }
  });
}



