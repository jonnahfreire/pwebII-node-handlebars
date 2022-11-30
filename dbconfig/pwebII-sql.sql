INSERT INTO books (author, title, pages, createdAt) VALUES ("Holy Black", "O Príncipe Cruel", 374, now());

UPDATE books SET author = "Author tal", title = "Livro 1", pages = 12 WHERE id = 6;

SELECT * FROM books;

DELETE FROM books WHERE id =  8;

DELETE FROM books;