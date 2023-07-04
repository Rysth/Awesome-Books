const form = document.querySelector('form');
const bookList = document.getElementById('bookList');

class Abooks {
  constructor() {
    this.books = [];

    this.local = () => {
      if (localStorage.getItem('books')) {
        const storedBooks = JSON.parse(localStorage.getItem('books'));
        this.books = storedBooks;
      }
    };

    this.displayBooks = () => {
      if (localStorage.getItem('books')) {
        this.books = JSON.parse(localStorage.getItem('books'));
        bookList.className = 'bookList';
        bookList.innerHTML = '';
        this.books.forEach((book, index) => {
          const li = document.createElement('li');
          li.className = 'lineBook';
          li.innerHTML = ` " ${book.title} " by ${book.author} <button class="removeBtn" data-index="${index}">Remove</button>`;
          bookList.appendChild(li);
        });
      }
    };

    this.submitbtn = () => {
      const title = document.getElementById('bookTitle').value;
      const author = document.getElementById('authorName').value;
      const newBook = { title, author };
      this.books.push(newBook);
      localStorage.setItem('books', JSON.stringify(this.books));
      form.reset();
    };

    this.removeBook = (index) => {
      this.books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(this.books));
      this.displayBooks();
    };
  }
}

const Abooksa = new Abooks();
Abooksa.displayBooks();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  Abooksa.submitbtn();
  Abooksa.displayBooks();
});

bookList.addEventListener('click', (event) => {
  if (event.target.classList.contains('removeBtn')) {
    const { index } = event.target.dataset;
    Abooksa.removeBook(index);
  }
});
