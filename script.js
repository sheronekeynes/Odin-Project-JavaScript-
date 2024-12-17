const Library=[]

function Book(title,author,year){
    this.title=title
    this.author=author
    this.year=year 

}

function addToLibrary(book){

    Library.push(book)
    
}

function displayBook(){
    
    const libraryEl=document.getElementById('Book-container');
    libraryEl.innerHtml=""

    Library.forEach(book => {

        const bookCard=document.createElement('div');
        bookCard.innerHTML=`<h1>Title:${book.title}</h1>
                            <p>Author:${book.author}</p>
                            <p>Year:${book.year}</p>`

        bookCard.className='book-card';
        libraryEl.appendChild(bookCard);
        
    });
 
}

let book1=new Book('Harry Potter','J.K Rowling','1999')
let book2=new Book('One Piece',"Echiro Oda",'1997')

addToLibrary(book1)
addToLibrary(book2)
displayBook()
 