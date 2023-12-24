const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error); // sends error to error handler middleware if there is not, built-in error handler will run.
        }
    };
};

module.exports = asyncWrapper;
