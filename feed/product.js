const mongoose = require('../db/init.js');

const productSchema = new mongoose.Schema({
    name: String,
    imageURL: String,
    imageDescription: String,
    likes: Number
});

const Product = module.exports = mongoose.model('Product', productSchema);

module.exports.getProducts = (_) => {
   return Product.find({}, _);
}

module.exports.addProduct = (product) => {
    product.likes = 0;
    Product.create(product)
        .then(() => console.log('Product created'))
            .catch(e => console.log(e));
}

module.exports.addLikes = (id) => {
    return Product.findByIdAndUpdate(id, {$inc: {likes: 0.5}}, (e) => {
        if (e) console.log(e);
    });
}