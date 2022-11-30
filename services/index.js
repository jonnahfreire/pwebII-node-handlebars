const mysql = require("mysql2");
const config = require("../dbconfig/mysql-config");

const conn = mysql.createConnection(config);

conn.connect(err => {
    if(err) return false;
    return true;
});

const getBooks = async () => {
    const promise = new Promise((resolve, reject) => {
        const query = "SELECT * FROM books"; 

        conn.query(query, (err, data) => {
            err && console.log(err);
            
            if(err) reject([]);
            resolve(data);
        });
    })
    .then(books => books)
    .catch(__ => []);

    return await promise;
}

const addBook = (book) => {
    if(book != undefined) {
        const query = `
        INSERT INTO books (title, author, pages, tag, createdAt) 
        VALUES ("${book.title}", "${book.author}", "${book.pages}", "${book.tag}", now())`; 
    
        conn.query(query, (err, __) => {
            err && console.log(err);
            
            if(err) console.log(err);
            console.log("Livro inserido com sucesso!");
        });
    }
}

const updateBook = (book) => {
    if(book !== undefined) {
        const query = `
        UPDATE books SET title = "${book.title}", author = "${book.author}", pages = "${book.pages}", tag = "${book.tag}", updatedAt = now() WHERE id = "${book.id}"`; 
    
        conn.query(query, (err, __) => {
            err && console.log(err);
            
            if(err) console.log(err);
            console.log("Livro atualizado com sucesso!");
        });
    }
}

const removeBook = (id) => {
    if(id !== undefined) {
        const query = `
        DELETE FROM books WHERE id = "${id}"`; 
    
        conn.query(query, (err, __) => {
            err && console.log(err);
            
            if(err) console.log(err);
            console.log("Livro removido com sucesso!");
        });
    }
}


module.exports = {
    conn, 
    getBooks, 
    addBook, 
    updateBook, 
    removeBook
};