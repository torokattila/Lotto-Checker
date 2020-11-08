const express = require('express');
const bodyParser = require('body-parser');
const PORT = (process.env.PORT || 3000);
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Content-Length, X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

app.use(express.static(__dirname + '/static'));
app.use(express.static('controller'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {

    res.render('index');
});

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
});