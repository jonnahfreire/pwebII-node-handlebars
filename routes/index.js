const express = require('express');
const mysqlService = require('../services');
const router = express.Router();


const getBookFromBody = (body) => {
    const { id, title, author, pages } = body;
    return { id, title, author, pages };
}


router.get('/', async (_, res) => {
    res.render('login', {
        title: "Login",
    });    
});

router.get('/signup-screen', async (_, res) => {
    res.render('signup', { title: "Cadastro" });    
});

router.get('/signup', async (_, res) => {
    
});

router.get('/user/books', async (_, res) => {
    const books = await mysqlService.getBooks();

    res.render('index', {
        title: "Meus livros",
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