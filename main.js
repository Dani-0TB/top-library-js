//"use strict";

const libraryList = [];
const addBookButton = document.querySelector(".btn-add");
const newBookForm = document.querySelector("dialog");
const form = document.querySelector("form");

addBookButton.addEventListener("click", () => {
    newBookForm.showModal();
});

form.addEventListener("submit", (e) =>
{
    e.preventDefault();

    let title = form[0].value;
    let author = form[1].value;
    let pages = form[2].value;
    let read = form[3].checked;

    if (title === "" || author === "" || pages < 1)
    {
        let error = document.querySelector(".error");
        error.classList.remove("hidden");
        setTimeout(() => {
            let error = document.querySelector(".error");
            error.classList.add("hidden");
        }, 3000);
        return;
    }

    addBookToLibrary(title, author, pages, read);
    updateDisplay();

    form.reset();
    newBookForm.close();
})


function Book(title = "", author = "", pages = 1, read = false)
{
    // Properties
    this.title = title;
    this.author = author; 
    this.pages = pages;
    this.read = read;
    
    // Methods
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read ? "read" : "not read yet"}`;
    }
}

function addBookToLibrary(title, author, pages, read = false)
{
    let newBook = new Book(title, author, pages, read);
    libraryList.push(newBook);
}

function populateLibrary()
{
    addBookToLibrary("Leviathan Wakes", "James A. Corey", 577);
    addBookToLibrary("Mistborn: The Final Empire", "Brandon Sanderson", 647, true);
    addBookToLibrary("Critique of pure reason", "Immanuel Kant", 785)
    addBookToLibrary("Project Management Body of Knowlege", "Project Management Institute", 370)
}

function updateDisplay()
{
    let display = document.getElementsByClassName("library-display")[0];
    display.innerHTML = "";
    // Update display with books from list
    for (let i = 0; i < libraryList.length; i++)
    {
        let bookCard = createBookCard(libraryList[i]);
        display.appendChild(bookCard);
    }
}

function createBookCard(book)
{
    const card = document.createElement("div");
    card.className = "book-card";

    const title = document.createElement("h2");
    title.innerText = book.title;
    title.className = "book-title"
    card.appendChild(title);

    const author = document.createElement("p");
    author.innerText = `By ${book.author}`;
    author.className = "book-author";
    card.appendChild(author);

    const pages = document.createElement("p");
    pages.innerText = `Pages: ${book.pages}`
    pages.className = "book-pages";
    card.appendChild(pages);

    const read = document.createElement("p");
    read.innerText = `${book.read ? "This book is read" : "This book is not read yet"}`
    read.className = `${book.read ? "book-read" : "book-not-read"}`
    card.appendChild(read);

    return card;
}


populateLibrary();
updateDisplay();