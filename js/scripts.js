// Create a collection that keeps a list of books (hint: you can use an array of objects for that).
let booksArray = [];

// Create a function to add a new book to the collection, with title and author.
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

function addBook(title, author) {
  const book = new Book(title, author);
  booksArray.push(book);
  updateLocalStorage();
}

function showBook(library, book, index) {
  const newBook = `
  <div class="book">
    <div class="book-cover">
      <h2 class="book-title">${book.title}</h2>
      <p class="book-author">${book.author}</p>
    </div>
    <button class="btn btn-danger float-right" type="button" onclick="removeBook(${index})">Remove</button>
    <hr />
  </div>
  `;

  library.innerHTML += newBook;
}

function displayBooks() {
  const library = document.querySelector('#library');
  library.innerHTML = '';
  booksArray.forEach((book, index) => {
    showBook(library, book, index);
  });
}

const form = document.querySelector('#form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  addBook(title, author);

  displayBooks();

  form.reset();
});

// Create a function to remove a book from the collection (hint: you can use the array filter() method).

function removeBook(index) {
  booksArray.splice(index, 1);
  displayBooks();
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem('booksArray', JSON.stringify(booksArray));
}

function checkLocalStorage() {
  const item = localStorage.getItem('booksArray');
  console.log(item);
  if (item !== null) {
    const data = JSON.parse(item);
    if (data.length <= 0) return localStorage.clear();
    booksArray = data;
    displayBooks();
  }
}

window.onload = () => {
  checkLocalStorage();
};
