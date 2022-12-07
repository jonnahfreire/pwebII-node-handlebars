const express = require('express');
const mysqlService = require('../services');
const router = express.Router();


const getBookFromBody = (body) => {
    return { 
        id: body.id, 
        title: body.title, 
        author: body.author, 
        pages: body.pages, 
        owner: body.owner 
    };
}

class State {
    state = {};
    
    constructor(state) {
        this.state = state;
    }

    static current() {return this.state;}

    setState(newState) {
        if(this.state === undefined) return;
        const stateKeys = Object.keys(this.state);
        
        for (let key of Object.keys(newState)) {
            if(stateKeys.includes(key)) {
                if(typeof this.state[key] == "object") {                    
                    for (let _key of Object.keys(newState[key])) {
                        if(Object.keys(this.state[key]).includes(_key)) {
                                this.state[key][_key] = newState[key][_key];
                        }
                    }

                } else {
                    this.state[key] = newState[key];
                }
            }
        }
    }

    clearState() {
        this.state = {};
    }
}

const userState = new State({
    isLogged: false,
    current: {
        id: '',
        name: '',
        email: '',
        books: []
    },
});

router.get('/', async (_, res) => {
    res.render('login', 
    { 
        title: "Login", 
        style: "../../public/css/auth-style.css",
    });    
});

router.get('/signup-screen', async (_, res) => {
    res.render('signup', 
    { 
        title: "Cadastro", 
        style: "../../public/css/auth-style.css",
    });    
});

router.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;
    const users = await mysqlService.getUsers();

    const user = users.filter(
        user => user.email == email 
        && user.password == password
    )[0];
        
    if(user !== undefined) {
        const books = await mysqlService.getUserBooksById(user.id);

        userState.setState({
            isLogged: true,
            current: {
                id: user.id,
                name: user.name,
                email: user.email,
                books: books
            }
        });
        
        next();
    } else {
        res.render('login', {
            title: "Login",
            error: "Email ou senha inválidos",
            style: "../../public/css/auth-style.css"
        }); 
    }    
}, async (__, res) => {
    res.redirect(`/user/${userState.state?.current?.id}/books`);
});

router.get('/user/:id/books', async (__, res, next) => {
    if(userState.state?.isLogged) next();
    
    else res.redirect("/");

}, (__, res) => {    
    res.render('index', {
        title: "Meus Livros",
        user: userState.state?.current,
        books: userState.state?.current?.books,
        style: "../../public/css/index.css"
    });    
});

router.post('/signup', async (req, res, next) => {
    const { username, email, password, confpassword } = req.body;
    const users = await mysqlService.getUsers();
    
    const emailAlreadyExists = users.filter(user => user.email == email)[0];
    
    const response = {
        title: "Cadastro",
        error: "Este email já está em uso",
        style: "../../public/css/auth-style.css",
    };
    if(emailAlreadyExists !== undefined) {
        response.error = "Este email já está em uso";
        res.render('signup', response);
        
    } else if(password !== confpassword) {
        response.error = "Senhas não conferem";
        res.render('signup', response);

    } else {
        const result = await mysqlService.createUser({
            name: username, email, password,
        });

        if(result) next();
        else {
            response.error = "Houve um erro ao cadastrar.";
            res.render('signup', response);
        }
    }

}, (__, res) => {
    res.render('signup', {
        title: "Cadastro",
        success: true,
        style: "../../public/css/auth-style.css"
    });
});

router.post('/logout', async (_, res) => {
    userState.clearState();

    res.redirect("/");
});

router.post('/add-book', async (req, res) => {
    const book = getBookFromBody(req.body);
    const books = await mysqlService.addBook(book);

    userState.setState({
        current: { books: books }
    });
    
    res.redirect(`/user/${userState.state?.current?.id}/books`);
});

router.post('/update-book', async (req, res) => {
    const book = getBookFromBody(req.body);
    const books = await mysqlService.updateBook(book);
    
    userState.setState({
        current: { books: books }
    });
    
    res.redirect(`/user/${userState.state?.current?.id}/books`);
});

router.post('/remove-book', async (req, res) => {
    const { id } = req.body;
    const books = await mysqlService.removeBook(id);

    userState.setState({
        current: { books: books }
    })
    res.redirect(`/user/${userState.state?.current?.id}/books`);
});


module.exports = router;