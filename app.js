const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Product = require('./feed/product');
// const addProduct = require('./feed/product');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/views/static'));

app.set('view engine', 'ejs');

app.get('/', (_, res) => {
    res.send('Welcome To your Express Application!');
});

app.get('/feed', (_, res) => {
    Product.getProducts()
        .then((products) => {
            console.log(products)
            res.render('feed', {products});
        })
})

app.get('/feed/new', (req, res) => {
    res.render('new-post');
})

app.post('/feed', (req, res) => {
    if(req.body) {
        try {
            Product.addProduct(req.body);
        } catch(e) {
            throw new Error('Something went wrong adding to database', e);
        }
    }
    res.redirect('/feed');
})

app.post('/likes', (req, res) => {
    Product.addLikes(req.body.likes)
        .then(() => {
            res.redirect('/feed');
        })
        .catch((e) => {
            throw 'Error updating likes' + e;
        })
    
})

app.listen(port, () => console.log(`Listening on port ${port}`));