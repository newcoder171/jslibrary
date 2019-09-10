let myLibrary = [];

function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages}, not read yet`
}

const addBookToLibrary = (book) => {
    if(book){
        myLibrary.push(book);
    }
}

const render = () => {
    console.log('render');
}
