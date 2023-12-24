const jwt = require('jsonwebtoken');

const createJWT = ({payload}) => {
    return jwt.sign(payload, process.env.JWT_SECRET);
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({res, user, refreshToken}) => { // return the token to front-end
    const accessTokenJWT = createJWT({payload: {user}});
    const refreshTokenJWT = createJWT({payload: {user, refreshToken}});

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('accessToken', accessTokenJWT, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        maxAge: 1000
    });
    res.cookie('refreshToken', refreshTokenJWT, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    });
};

// const attachSingleCookiesToResponse = ({res, user}) => { // return the token to front-end
//     const token = createJWT({payload: user});
//
//     const oneDay = 1000 * 60 * 60 * 24;
//
//     res.cookie('token', token, {
//         httpOnly: true,
//         expires: new Date(Date.now() + oneDay),
//         secure: process.env.NODE_ENV === 'production',
//         signed: true,
//     });
// };

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
};
