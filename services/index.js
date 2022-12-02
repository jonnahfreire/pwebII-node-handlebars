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

const getUserBooksById = async (userId) => {
    const allBooks = await getBooks();

    const books = allBooks.filter(book => book.idowner == userId);

    return books;
}

const getUsers = async () => {
    const users = new Promise((resolve, reject) => {
        const query = "SELECT * FROM users"; 

        conn.query(query, (err, user) => {
            err && console.log(err);
            
            if(err) reject([]);
            resolve(user);
        });
    })
    .then(user => user)
    .catch(__ => []);

    return await users;
}

const getUserById = async (id) => {
    const users = await getUsers();
    const user = users.filter(user => user.id == id)[0];

    return {
        id: user.id,
        name: user.name,
        email: user.email
    };
}

const addBook = async (book) => {
    const result = await new Promise((resolve, reject) => {
        const query = `
        INSERT INTO books (title, author, pages, idowner, createdAt) 
        VALUES ("${book.title}", "${book.author}", "${book.pages}", "${book.owner}", now())`; 
        
        conn.query(query, (err, data) => {
            if(err) reject(false);
            
            console.log("Livro inserido com sucesso!");
            resolve(JSON.stringify(data));
        });
    })
    .then(result => JSON.parse(result))
    .catch(__ => []);
        
    return await getBooks();
}

const updateBook = async (book) => {
    const result = await new Promise((resolve, reject) => {
        const query = `
        UPDATE books 
        SET title = "${book.title}",
        author = "${book.author}", 
        pages = "${book.pages}", 
        updatedAt = now() 
        WHERE id = "${book.id}"`; 
        
        conn.query(query, (err, data) => {
            if(err) reject(false);
            
            console.log("Livro atualizado com sucesso!");
            resolve(JSON.stringify(data));
        });
    })
    .then(result => JSON.parse(result))
    .catch(__ => []);
        
    return await getBooks();
}

const removeBook = async (id) => {
    const result = await new Promise((resolve, reject) => {
        const query = `
        DELETE FROM books WHERE id = "${id}"`; 
        
        conn.query(query, (err, data) => {
            if(err) reject(false);
            
            console.log("Livro removido com sucesso!");
            resolve(JSON.stringify(data));
        });
    })
    .then(result => JSON.parse(result))
    .catch(__ => []);
        
    return await getBooks();
}


module.exports = {
    conn, 
    getUsers,
    getUserById,
    getBooks,
    getUserBooksById,
    addBook, 
    updateBook, 
    removeBook
};