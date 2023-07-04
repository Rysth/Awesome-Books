// Book Function
function Book(title, author) {
  this.title = title;
  this.author = author;
}

// Books Collection
const booksArray = [];

// Function to update every add/remove the books collection in local storage.
function updateLocalStorage() {
  localStorage.setItem('booksArray', JSON.stringify(booksArray));
}

// Function to show each book within the library container.
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
  `,
    )
    .join('');
}

// Function to select in which container do I want to present the data.
function displayBooks() {
  const library = document.querySelector('#library');
  showBooks(library);
}

// Function to check if the books collection already exist in the local storage.
function checkLocalStorage() {
  const storedData = localStorage.getItem('booksArray');
  if (storedData !== null) {
    const data = JSON.parse(storedData);
    booksArray.splice(0, booksArray.length, ...data);
    displayBooks();
  }
}

// Called to the CheckLocalStorage function.
window.onload = checkLocalStorage;

// Function to add a new book into the collection.
function addBook(title, author) {
  const book = new Book(title, author);
  booksArray.push(book);
  updateLocalStorage();
  displayBooks();
}

// Function to remove a book from the collection.
// Disable eslint-disable because the function it's not called within the JS but in the HTML.
// Because my remove buttons have an onclick="remove(index)" where it's used there.
/* eslint-disable no-unused-vars */
function removeBook(index) {
  booksArray.splice(index, 1);
  displayBooks();
  updateLocalStorage();
}
/* eslint-enable no-unused-vars */

// Function to save the information of each new book.
const form = document.querySelector('#form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  addBook(title, author);

  form.reset();
});
