const Product = require('../models/product');


const getAllProductsStatic = async (req, res) => {
    const search = 'ab';
    const products = await Product.find({price: {$gt: 30}}).sort('price').select('name price').limit(23);
    res.status(200).json({products, nbHits: products.length});
};

const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, fields, numericFilters} = req.query; // should be corresponded to models
    const queryObject = {};

    if (featured) queryObject.featured = featured === 'true';
    if (company) queryObject.company = company;
    if (name) queryObject.name = {$regex: name, $options: 'i'}; // query operators: $regex $option. i means insensitive.

    if (numericFilters) {
        const operatorMap = {'>': '$gt', '>=': '$gte', '=': '$eq', '<': '$lt', '<=': '$lte'};
        const regEx = /\b(>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(regEx, match => `-${operatorMap[match]}-`);
        console.log(filters);

        const options = ['price', 'rating'];
        filters = filters.split(',');
        filters.forEach(item => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) queryObject[field] = {[operator]: Number(value)};
        });
    }
    console.log(queryObject);

    let result = Product.find(queryObject);
    if (sort) {
        const sortList = sort.split(',').join(' '); // sort method
        result = result.sort(sortList);
    } else result.sort('createdAt');

    if (fields) {
        const fieldsList = fields.split(',').join(' '); // select method
        result = result.select(fieldsList);
    }

    // important!
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({products, nbHits: products.length});
};

module.exports = {getAllProductsStatic, getAllProducts};