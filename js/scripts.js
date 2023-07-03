// Create a collection that keeps a list of books (hint: you can use an array of objects for that).
let bookArray = [];

// Create a function to add a new book to the collection, with title and author.
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

function addNewBook(title, author) {
  const library = document.querySelector('#library');
  const book = new Book(title, author);

  const newBook = `
  <div class="book">
    <div class="book-cover">
      <h2 class="book-title">${book.title}</h2>
      <p class="book-author">${book.author}</p>
    </div>
    <button class="btn btn-danger float-right" type="button">Remove</button>
    <hr />
  </div>
  `;

  library.innerHTML += newBook;
  bookArray.push(book);
}

const form = document.querySelector('#form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  addNewBook(title, author);

  form.reset();
});
