const API = "http://localhost/Assignment3";

// Fetch all books and show total count on home page
fetch(`${API}/books`)
  .then(res => res.json())
  .then(books => {
    const totalEl = document.getElementById("total-books");
    if (totalEl) totalEl.textContent = books.length;
  })
  .catch(err => console.error("Failed to load stats:", err));
