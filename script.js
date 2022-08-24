let myLibrary = []; //Array of books

const books = document.querySelector(".books"); //selects the HTMl to put the library cards in

const newBook = document.querySelector(".new-book"); //Selects the HTML for the button to add a new book

newBook.addEventListener("click", () => {
  form.classList.remove("hidden");
}); //Shows the new book form when appropriate

const form = document.querySelector(".form");
//Selects the HTML that corresponds to a new book form

const submit = document.querySelector(".submit");
//Selects the HTML that allows you to submit a book

submit.addEventListener("click", formToBook);
//Ensures display updates with new book when submit is clicked

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "already read" : "not read yet"
    }`; //Return info of book & appropriate text for its library card
  };
} //Factory function to create books

Book.prototype.toggleRead = function () {
  this.read = !this.read;
}; //Attaches a function to each book that changes whether or not it is read

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks() {
  books.innerHTML = ""; //Clears previous cards from the display - since the for loop goes through the entire library, if it's not cleared the cards will duplicate

  for (let i = 0; i < myLibrary.length; i++) {
    let newCard = document.createElement("div");
    newCard.textContent = myLibrary[i].info();
    newCard.classList.add("card");
    newCard.dataset.index = i;
    let trashIcon = document.createElement(`img`);
    trashIcon.src = "delete-empty.svg";
    trashIcon.alt = "Delete book";
    trashIcon.addEventListener("click", (e) => {
      let card = e.target.parentNode;
      let index = card.dataset.index;
      myLibrary.splice(index, 1);
      displayBooks();
    }); //Removes book from library array and updates display

    let readCheck = document.createElement("input");
    readCheck.type = "checkbox";
    readCheck.checked = myLibrary[i].read;

    readCheck.addEventListener("click", (e) => {
      let card = e.target.parentNode;
      let book = myLibrary[card.dataset.index];
      book.toggleRead();
      displayBooks();
    }); //Updates whether the book is read and updates display - this is attached to the check mark

    newCard.appendChild(readCheck);
    newCard.appendChild(trashIcon);

    books.appendChild(newCard);
  }
}
//Creates and displays an appropriate card for every library book, with appropriate functionality attached to buttons

function formToBook() {
  const titleInput = document.querySelector("#title");
  let title = titleInput.value;
  const authorInput = document.querySelector("#author");
  let author = authorInput.value;
  const pagesInput = document.querySelector("#pages");
  let pages = pagesInput.value;
  const readInput = document.querySelector("#read");
  const read = readInput.checked;
  //Collects all the information for the book

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false;
  form.classList.add("hidden"); //Clears form of content & hides it

  if (!title || !author || !pages) return;
  else {
    addBookToLibrary(title, author, pages, read);
    displayBooks();
  } //If input is valid, adds the book to the library and updates display
} //When form is submitted, creates new book card

addBookToLibrary("Hegel's Idealism", "Robert Pippin", 260, true);
addBookToLibrary("Making It Explicit", "Robert Brandom", 650, true);
addBookToLibrary("The God of Small Things", "Arundhati Roy", 320, false);
addBookToLibrary(
  "One Hundred Years of Solitude",
  "Gabrial Garcia Marquez",
  417,
  false
);
//Just a few books to start the display...

displayBooks();
