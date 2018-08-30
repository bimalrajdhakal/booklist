// Book Constructor 
function Book(title,author,isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;

}

// UI Constructor 
function UI(){}

// Add book to list
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  // create tr element 

  const row = document.createElement('tr');
  // insert columns 

  row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);

}
// show alert 

UI.prototype.showAlert =function(message,className){
  // create error div
  const div = document.createElement('div');
  // add classes 
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // get parent to insert into page
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  // insert alert 
  container.insertBefore(div,form);
  // disapper after 3 second 

  setTimeout(function(){
    document.querySelector('.alert').remove();
  },3000);

}
// delete book

UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

// clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Event Listener for add book

document.getElementById('book-form').addEventListener('submit', function(e){
  // Get Form Values
 const title = document.getElementById('title').value,
       author = document.getElementById('author').value,
       isbn = document.getElementById('isbn').value
  // Instantiate book
  const book = new Book(title,author,isbn);
// Instantiate UI
const ui = new UI();

// validate fields

  if(title === '' || author === '' || isbn === ''){
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');

  }else{
    // Add book to list
    ui.addBookToList(book);
    // show success alert 
    ui.showAlert('Book Added Successfully !!!','success');

    // clear fields

    ui.clearFields();
  }
 
  e.preventDefault();
});

// event listener for delete 

document.getElementById('book-list').addEventListener('click',function(e){
  // Instantiate UI
  const ui = new UI();
  // delete book 
  ui.deleteBook(e.target);
  // show delete alert 
  ui.showAlert('Book Removed Successfully!!!','success');
  e.preventDefault();
});



