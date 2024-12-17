const Library = [];

function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
}

function addToLibrary(book) {
  Library.push(book);
}

function displayBook() {
  const libraryEl = document.getElementById("Book-container");
  libraryEl.innerHTML = "";

  Library.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.innerHTML = `<h1>Title:${book.title}</h1>
                            <p>Author:${book.author}</p>
                            <p>Year:${book.year}</p>`;

    bookCard.className = "book-card";

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove Book";
    removeBtn.className = "remove-btn";
    
    //create checkbox container
    const checkBoxEl=document.createElement('div')
    
    //read checkbox
    const readLabelEl = document.createElement("label");
    const readEl = document.createElement("input");


    readLabelEl.innerText = "Read";

    readEl.type = "checkBox";
    readEl.className = "read-box";

    //lable class
    readLabelEl.className = "read-label";

    //append child to div
    checkBoxEl.appendChild(readLabelEl);
    checkBoxEl.appendChild(readEl)
    //append child
    libraryEl.appendChild(bookCard);
    bookCard.appendChild(removeBtn);
    bookCard.appendChild(checkBoxEl)


    removeBtn.addEventListener("click", () => {
      Library.splice(index, 1);
      displayBook();
    });
  });
}

let book1 = new Book("Harry Potter", "J.K Rowling", "1999");
let book2 = new Book("One Piece", "Echiro Oda", "1997");

addToLibrary(book1);
addToLibrary(book2);
displayBook();

//modal logic

const modelContainerEl = document.getElementById("modal-container");
const bookformEl = document.getElementById("form-book");

const addBtnEl = document.getElementById("add-book-btn");
const closeBtnEl = document.getElementById("close-btn");

//button logics
addBtnEl.addEventListener("click", () => {
  modelContainerEl.style.display = "flex";
});

closeBtnEl.addEventListener("click", () => {
  modelContainerEl.style.display = "none";
});

bookformEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;

  const newBook = new Book(title, author, year);

  addToLibrary(newBook);

  displayBook();

  modelContainerEl.style.display = "none";
  bookformEl.reset();
});
