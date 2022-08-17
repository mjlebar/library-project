function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "already read" : "not read yet"
    }`;
  };
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
  console.log(this);
};

let myLibrary = [];
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

const books = document.querySelector(".books");

const displayBooks = function () {
  books.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let newCard = document.createElement("div");
    newCard.textContent = myLibrary[i].info();
    newCard.classList.add("card");
    newCard.dataset.index = i;
    let newImg = document.createElement(`img`);
    newImg.src = "delete-empty.svg";
    newImg.alt = "Delete book";
    newImg.addEventListener("click", deleteBook);

    let readCheck = document.createElement("input");
    readCheck.type = "checkbox";
    readCheck.checked = myLibrary[i].read;

    readCheck.addEventListener("click", (e) => {
      let card = e.target.parentNode;
      let book = myLibrary[card.dataset.index];
      book.toggleRead();
      displayBooks();
    });

    newCard.appendChild(readCheck);

    newCard.appendChild(newImg);
    books.appendChild(newCard);
  }
};

function deleteBook(e) {
  card = e.target.parentNode;
  index = card.dataset.index;
  card.remove();
  myLibrary.splice(index, 1);
  displayBooks();
}

const newBook = document.querySelector(".new-book");

const form = document.querySelector(".form");

newBook.addEventListener("click", () => {
  form.classList.remove("hidden");
});

const submit = document.querySelector(".submit");

submit.addEventListener("click", formToBook);

function formToBook() {
  const titleInput = document.querySelector("#title");
  let title = titleInput.value;
  const authorInput = document.querySelector("#author");
  let author = authorInput.value;
  const pagesInput = document.querySelector("#pages");
  let pages = pagesInput.value;
  const readInput = document.querySelector("#read");
  const read = readInput.checked;
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false;
  form.classList.add("hidden");

  if (!title || !author || !pages) return;
  else {
    addBookToLibrary(title, author, pages, read);
    displayBooks();
  }
}

// const hegelsIdealism = new Book("Hegel's Idealism", "Robert Pippin", 260, true);

addBookToLibrary("Hegel's Idealism", "Robert Pippin", 260, true);
addBookToLibrary("Making It Explicit", "Robert Brandom", 650, true);
addBookToLibrary("The God of Small Things", "Arundhati Roy", 32, false);
addBookToLibrary(
  "One Hundred Years of Solitude",
  "Gabrial Garcia Marquez",
  417,
  false
);

displayBooks();
