const API = "http://localhost/Library_Management_System/PHP";

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

  const formData = new FormData()

  formData.append("name",title);
  formData.append("author",author);
  formData.append("category",category);

  fetch(`${API}/add_book.php`, {
    method: "POST",
    body: formData
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
