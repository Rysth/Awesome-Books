// Create a collection that keeps a list of books (hint: you can use an array of objects for that).
let bookArray = [];

// Create a function to add a new book to the collection, with title and author.
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

function addBook(title, author) {
  const book = new Book(title, author);
  bookArray.push(book);
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
  bookArray.forEach((book, index) => {
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
  bookArray.splice(index, 1);
  displayBooks();
}
