

  const searchInput = document.querySelector(".search-input");
  const searchIcon = document.querySelector(".search-icon");
  const resultsBox = document.querySelector(".search-results");

  /* OPEN SEARCH */
  searchIcon.addEventListener("click", () => {
    searchInput.classList.toggle("expand");
    searchInput.focus();
  });

  /* SEARCH EVERYTHING */
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    resultsBox.innerHTML = "";

    if (query.length < 2) {
      resultsBox.classList.remove("show");
      return;
    }

    const elements = document.querySelectorAll(
      "section, h1, h2, h3, h4, p, a, li, .faculty-card"
    );

    let found = 0;

    elements.forEach(el => {
      const text = el.textContent.trim();
      if (!text) return;

      if (text.toLowerCase().includes(query) && found < 10) {
        const item = document.createElement("div");
        item.className = "search-result-item";
        item.innerHTML = `
          ${text.substring(0, 60)}...
          <small>Click to view</small>
        `;

        item.addEventListener("click", () => {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

          resultsBox.classList.remove("show");
          searchInput.value = "";
        });

        resultsBox.appendChild(item);
        found++;
      }
    });

    if (found > 0) {
      resultsBox.classList.add("show");
    } else {
      resultsBox.classList.remove("show");
    }
  });

  /* CLICK OUTSIDE CLOSE */
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) {
      resultsBox.classList.remove("show");
    }
  });

