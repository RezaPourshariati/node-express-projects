const authorize = (req, res, next) => {
    const {user} = req.query;
    if (user === 'john') {
        req.user = {name: 'john', id: 3};
        next();
    }

    else res.status(401).send('Unauthorized');
};

module.exports = authorize;

// John: This is just a demonstration, normally what you are going to do, you'll check for the JSON Web Token(JWT)
// and then i the token exists, then we communicate with database and actually get the user, then this is coming up
// for the time being. and now we're simply hard coding values such as {user:john id:3} .