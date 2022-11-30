const express = require('express');
const mysqlService = require('../services');
const router = express.Router();


const getBookFromBody = (body) => {
    const { id, title, author, pages } = body;
    return { id, title, author, pages };
}


router.get('/', async (_, res) => {
    const books = await mysqlService.getBooks();

    res.render('index', {
        title: "Biblioteca",
        books: books
    });    
});

router.post('/add-book', (req, res) => {
    const book = getBookFromBody(req.body);

    mysqlService.addBook(book);
    res.redirect('/');
});

router.post('/update-book', (req, res) => {
    const book = getBookFromBody(req.body);

    mysqlService.updateBook(book);
    res.redirect('/');
});

router.post('/remove-book', (req, res) => {
    const { id } = req.body;

    mysqlService.removeBook(id);
    res.redirect('/');
});


module.exports = router;