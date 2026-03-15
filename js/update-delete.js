const API = "http://localhost/Library_Management_System/PHP";

const tbody      = document.getElementById("ud-tbody");
const editSection = document.getElementById("edit-section");
const editForm   = document.getElementById("edit-form");

function loadBooks() {
  fetch(`${API}/get_books.php`)
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
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td><span class="badge">${book.category}</span></td>
      <td class="td-actions">
        <button class="btn-edit"   onclick="openEdit('${book.id}', '${book.name}', '${book.author}', '${book.category}')">Edit</button>
        <button class="btn-delete" onclick="deleteBook('${book.id}')">Delete</button>
      </td>
    </tr>
  `).join("");
}

window.deleteBook = function(id) {
  if (!confirm("Are you sure you want to delete this book?")) return;

  const formData = new FormData();
  formData.append("id",id);
  fetch(`${API}/delete_book.php`, { 
	method: "POST",
    body: formData 
})
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

window.openEdit = function(id, title, author, category) {
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

  const formData = new FormData()
  formData.append("id",id);
  formData.append("name",title);
  formData.append("author",author);
  formData.append("category",category);

  fetch(`${API}/update_book.php`, {
    method: "POST",
    body: formData
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

document.getElementById("cancel-edit").addEventListener("click", function () {
  editSection.style.display = "none";
  editForm.reset();
});

loadBooks();
