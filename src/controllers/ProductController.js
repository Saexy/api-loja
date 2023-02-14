const Product = require('../models/Product');

const getProducts = async (req, res) => {
    const tasks = await Product.getProducts();
    res.status(200).json(tasks);
};

const addProduct = async (req, res) => {
    const createdTask = await Product.addProduct(req.body);
    res.status(200).json(createdTask);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.deleteProduct(id);
    res.status(200).json(deletedProduct);
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedProduct = await Product.updateProduct(id, req.body);
    res.status(200).json(updatedProduct);
};

module.exports = {
    getProducts,
    addProduct,
    deleteProduct,
    updateProduct
};