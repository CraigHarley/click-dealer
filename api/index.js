const express    = require('express');
const makeRoutes = require('./routes');
const app        = express();
const mysql      = require('promise-mysql');
const cors       = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mysql.createConnection({
    host:     'localhost',
    user:     'root',
    database: 'click-dealer'
}).then((conn) => {
    app.use('/', makeRoutes(conn));

    app.listen(3000);
    console.log('success, api running');
});