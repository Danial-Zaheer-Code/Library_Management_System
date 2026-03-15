const API = "http://localhost/Assignment3";

const tbody = document.getElementById("books-tbody");

function renderTable(books) {
  if (!books.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center; color:#aaa; padding:24px;">
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
    </tr>
  `).join("");
}

fetch(`${API}/books`)
  .then(res => res.json())
  .then(books => renderTable(books))
  .catch(err => {
    console.error("Failed to load books:", err);
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center; color:red; padding:24px;">
          Failed to load records.
        </td>
      </tr>`;
  });
