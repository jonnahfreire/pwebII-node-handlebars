-- BOOKS
INSERT INTO books (author, title, pages, idowner) VALUES ("Holy Black", "O Príncipe Cruel", 374, 1);

UPDATE books SET author = "Author tal", title = "Livro 1", pages = 12 WHERE id = 6;

SELECT * FROM books;

DELETE FROM books WHERE id =  8;

DELETE FROM books;

-- USERS 
INSERT INTO users (name, email, password) VALUES ("Cláudia Talita", "claudia.talita@gmail.com", "123456");

INSERT INTO users (name, email, password) VALUES ("Leilanny Nascimento", "leilanny.nascimento@gmail.com", "123456");

UPDATE users SET email = "leilanny.nascimento@gmail.com" WHERE id = 2;

SELECT * FROM users;

SELECT * FROM books WHERE idowner = 1;

DELETE FROM users;


