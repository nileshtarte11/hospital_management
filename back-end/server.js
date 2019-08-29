const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;

const app = express();

const login_register = require('./routes/api')
const admin = require('./routes/admin');

app.use(bodyParser.json());

app.use(cors());


app.use('/', login_register);
app.use('/admin', admin);

app.listen(PORT, function () {
    console.log('server running on localhost :' + PORT)
})