const errorHandlerMiddleware = async (err, req, res, next) => {
    console.log(err);
    return res.status(500).json({msg: err.message}); // something went wrong
};

module.exports = errorHandlerMiddleware;
