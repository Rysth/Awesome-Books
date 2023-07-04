const form = document.querySelector('form');
const bookList = document.getElementById('bookList');

class Abooks {
  constructor() {
    this.books = [];

    this.displayBooks = () => {
      const storedBooks = JSON.parse(localStorage.getItem('books'));
      if (storedBooks) {
        this.books = storedBooks;
        bookList.className = 'bookList';
        bookList.innerHTML = this.books
          .map(
            (book, index) => `
        <li class="lineBook">
          "${book.title.toUpperCase()}" by ${book.author}
          <button class="btn btn-remove box-shadow" data-index="${index}">Remove</button>
        </li>
      `
          )
          .join('');
      }
    };

    this.submitbtn = () => {
      const title = document.getElementById('bookTitle').value;
      const author = document.getElementById('authorName').value;
      this.books.push({ title, author });
      localStorage.setItem('books', JSON.stringify(this.books));
      form.reset();
      this.displayBooks();
    };

    this.removeBook = (index) => {
      const [removedBook] = this.books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(this.books));
      this.displayBooks();
    };
  }
}

const abooks = new Abooks();
abooks.displayBooks();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  abooks.submitbtn();
});

bookList.addEventListener('click', ({ target }) => {
  if (target.classList.contains('btn-remove')) {
    const { index } = target.dataset;
    abooks.removeBook(index);
  }
});
