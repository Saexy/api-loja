const connection = require('./Connection');

const getProducts = async () => {
    const [products] = await connection.execute('SELECT * FROM products');
    return products;
};

const addProduct = async (product) => {
    const query = 'INSERT INTO products (name, price) VALUES(?, ?)';
    const { name, price } = product;
    const [createdProduct] = await connection.execute(query, [name, price]);
    return createdProduct;
};

const deleteProduct = async (id) => {
    const query = 'DELETE FROM products WHERE id = ?';
    const [deletedProduct] = await connection.execute(query, [id]);
    return deletedProduct;
};

const updateProduct = async (id, product) => {
    const query = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    const { name, price } = product;
    const [updatedProduct] = await connection.execute(query, [name, price, id]);
    return updatedProduct;
}

module.exports = {
    getProducts,
    addProduct,
    deleteProduct,
    updateProduct
};