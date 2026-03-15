const API = "http://your-api-url.com"; // Change this to your actual API URL

const form = document.getElementById("add-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title    = document.getElementById("book-title").value.trim();
  const author   = document.getElementById("author").value.trim();
  const category = document.getElementById("category").value;

  if (!title || !author || !category) {
    alert("Please fill in all fields.");
    return;
  }

  fetch(`${API}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, category })
  })
    .then(res => res.json())
    .then(() => {
      alert("Book added successfully!");
      form.reset();
    })
    .catch(err => {
      console.error("Failed to add book:", err);
      alert("Error adding book.");
    });
});
