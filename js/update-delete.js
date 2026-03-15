const API = "http://your-api-url.com"; // Change this to your actual API URL

const tbody      = document.getElementById("ud-tbody");
const editSection = document.getElementById("edit-section");
const editForm   = document.getElementById("edit-form");

// ── Load & Render ─────────────────────────────────
function loadBooks() {
  fetch(`${API}/books`)
    .then(res => res.json())
    .then(books => renderTable(books))
    .catch(err => {
      console.error("Failed to load books:", err);
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center; color:red; padding:24px;">
            Failed to load records.
          </td>
        </tr>`;
    });
}

function renderTable(books) {
  if (!books.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; color:#aaa; padding:24px;">
          No records found.
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = books.map((book, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td><span class="badge">${book.category}</span></td>
      <td class="td-actions">
        <button class="btn-edit"   onclick="openEdit('${book.id}', '${book.title}', '${book.author}', '${book.category}')">Edit</button>
        <button class="btn-delete" onclick="deleteBook('${book.id}')">Delete</button>
      </td>
    </tr>
  `).join("");
}

// ── Delete ────────────────────────────────────────
function deleteBook(id) {
  if (!confirm("Are you sure you want to delete this book?")) return;

  fetch(`${API}/books/${id}`, { method: "DELETE" })
    .then(res => res.json())
    .then(() => {
      alert("Book deleted.");
      loadBooks();
    })
    .catch(err => {
      console.error("Failed to delete book:", err);
      alert("Error deleting book.");
    });
}

// ── Edit ──────────────────────────────────────────
function openEdit(id, title, author, category) {
  document.getElementById("edit-index").value    = id;
  document.getElementById("edit-title").value    = title;
  document.getElementById("edit-author").value   = author;
  document.getElementById("edit-category").value = category;

  editSection.style.display = "block";
  editSection.scrollIntoView({ behavior: "smooth" });
}

editForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const id       = document.getElementById("edit-index").value;
  const title    = document.getElementById("edit-title").value.trim();
  const author   = document.getElementById("edit-author").value.trim();
  const category = document.getElementById("edit-category").value;

  if (!title || !author || !category) {
    alert("Please fill in all fields.");
    return;
  }

  fetch(`${API}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, category })
  })
    .then(res => res.json())
    .then(() => {
      alert("Book updated successfully!");
      editSection.style.display = "none";
      loadBooks();
    })
    .catch(err => {
      console.error("Failed to update book:", err);
      alert("Error updating book.");
    });
});

// ── Cancel Edit ───────────────────────────────────
document.getElementById("cancel-edit").addEventListener("click", function () {
  editSection.style.display = "none";
  editForm.reset();
});

// ── Init ──────────────────────────────────────────
loadBooks();
