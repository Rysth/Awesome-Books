class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

let booksArray = [];

function addBook(title, author) {
  const book = new Book(title, author);
  booksArray.push(book);
  updateLocalStorage();
  displayBooks();
}

function removeBook(index) {
  booksArray.splice(index, 1);
  displayBooks();
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem('booksArray', JSON.stringify(booksArray));
}

function showBooks(library) {
  library.innerHTML = booksArray
    .map(
      (book, index) => `
          <div class="book">
            <div class="book-cover">
              <h2 class="book-title">${book.title}</h2>
              <p class="book-author">${book.author}</p>
            </div>
            <button class="btn btn-danger float-right" type="button" onclick="removeBook(${index})">Remove</button>
            <hr />
          </div>
  `
    )
    .join('');
}

function displayBooks() {
  const library = document.querySelector('#library');
  showBooks(library);
}

function checkLocalStorage() {
  const storedData = localStorage.getItem('booksArray');
  if (storedData !== null) {
    const data = JSON.parse(storedData);
    booksArray.splice(0, booksArray.length, ...data);
    displayBooks();
  }
}

window.onload = checkLocalStorage;

const form = document.querySelector('#form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  addBook(title, author);

  form.reset();
});
