const express = require('express');
const mysqlService = require("./services/index");
const { engine } = require('express-handlebars');

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes');
const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/public', express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(routes);

const port = process.env.PORT || 3000;

if(mysqlService.conn) {
    console.log(`MySql Connected`);
    
    app.listen(port, () => {
        console.log(`Express started at http://localhost:${port}`)
    });

} else {
    console.log(`Houve um erro ao iniciar o serviço.`)
}