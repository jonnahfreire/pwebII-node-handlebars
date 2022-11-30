const express = require('express');
const mysqlService = require('../services');
const router = express.Router();


router.get('/', async (_, res) => {
    const books = await mysqlService.getBooks();

    res.render('index', {
        title: "Biblioteca",
        books: books
    });    
});

router.post('/add-book', (req, res) => {
    const { title, author, pages, tag } = req.body;

    const book = {
        title,
        author,
        pages,
        tag: tag !== undefined ? tag : "--"
    };
    console.log(book);

    mysqlService.addBook(book);
    res.redirect('/');
});

router.post('/update-book', (req, res) => {
    const { id, title, author, pages, tag } = req.body;

    const book = {
        id,
        title,
        author,
        pages,
        tag: tag !== undefined ? tag : "--"
    };

    mysqlService.updateBook(book);
    res.redirect('/');
});

router.post('/remove-book', (req, res) => {
    const { id } = req.body;

    mysqlService.removeBook(id);
    res.redirect('/');
});


module.exports = router;