let myLibrary = [
    {id: 4, title: 'Think and Grow Rich', author: 'Sun Zhu', pages: '3', isRead: true},
];

const form = document.querySelector('#book-form');

function Book(id, title, author, pages, isRead){
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.statusUpdate = function() {
	this.isRead = !this.isRead;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages}, not read yet`
}

const bookInfoFromForm = () => {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let isRead = document.querySelector("#isRead").value;
    let id = myLibrary.length + 1;
    return [title, author, pages, isRead];
}


form.addEventListener('submit', (e) => {
	e.preventDefault(); 
    const values = [...form.elements].map(elem => elem.value);
    let isRead = document.querySelector("#isRead").checked;
    const id = myLibrary.length + 1;
    const [title, author, pages] = values;
    const book = new Book(id, title, author, pages, isRead);
    $('#bookInfoForm').modal('toggle');
    form.reset();
    if (book.title) {
        myLibrary.push(book);
        VanillaToasts.create({
              title: 'Book Created',
              text: `${title} by ${author}`,
              timeout: 3000
            });
            
    }
    
    render();
});


const render = () => {
    let contentBody = document.querySelector("#data");
    let html = "";
    if (myLibrary.length > 0) {
      for (const data of myLibrary) {
        html += template(
          data.id,
          data.title,
          data.author,
          data.pages,
          data.isRead
        );
      }
      contentBody.innerHTML = html;
    } else {
        contentBody.innerHTML = `<div class="text-center">No book found. Click the Add book
      button to create one</div>`;
    }

}


function template(id, title, author, pages, isRead) {  
    return `<div class="col-md-4 col-xs-12">
                <div class="card">
                    <h4 class="card-header text-center">${title}</h4>

                    <div class="card-body">
                        <p>Author: ${author}</p>
                        <p>Pages: ${pages}</p>
                        <p>Have Read: ${isRead ? `<span>YES</span>` : `<span>NO</span>`}</p>
                    </div>

                    <div class="card-footer">
                        <p class="card-text d-flex justify-content-around">
                            <button id="status-${id}" type="button" class="btn btn-sm btn-warning statusBtn" onClick="updateBook(${id})"> Change status</button>
                            <button id="delete-${id}" type="button" class="btn btn-sm btn-danger delBtn" onClick="deleteBook(${id})"> Delete </button>
                        </p>
                    </div>
                </div>
            </div>`;
}

const deleteBook = (id) => {
    myLibrary = myLibrary.filter( ( book ) => {
        return book.id !== id;
    });
    render();
}

const updateBook = (id) => {

    myLibrary = myLibrary.map(book => {
        if(book.id === id)
           return Object.assign({}, book, {isRead:!book.isRead})
        return book
    });
    render();
}




render();