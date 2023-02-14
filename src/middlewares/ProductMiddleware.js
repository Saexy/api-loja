const validateProduct = (req, res, next) => {
    if(req.body.name === undefined || req.body.name === ''){
        return res.status(400).json({ message: "O método 'name' precisa ser passado com um valor." });
    }
    if(req.body.price === undefined || req.body.price === ''){
        return res.status(400).json({ message: "O método 'price' precisa ser passado com um valor." });
    }
    next();
};

module.exports = {
    validateProduct
};