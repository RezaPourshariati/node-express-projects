const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {attachCookiesToResponse, createTokenUser, sendVerificationEmail} = require('../utils');
const crypto = require('crypto');
const Token = require("../models/Token");
const sendEmail = require("../utils/sendEmail");


const register = async (req, res) => {
    const {email, name, password} = req.body;

    const userAlreadyExists = await User.findOne({email});
    if (userAlreadyExists) {
        throw new CustomError.BadRequestError('This email already in use');
    }

    // first registered user is an admin
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const verificationToken = crypto.randomBytes(40).toString('hex'); // Create Verification Token

    const user = await User.create({name, email, password, role, verificationToken});

    const origin = 'http://localhost:3000';

    // const newOrigin = 'https://react-node-user-workflow-front-end.netlify.app';

    // const tempOrigin = req.get('origin');
    // const protocol = req.protocol;
    // const host = req.get('host');
    // const forwardedHost = req.get('x-forwarded-host');
    // const forwardedProtocol = req.get('x-forwarded-proto');

    // await sendVerificationEmail({
    //     name: user.name,
    //     email: user.email,
    //     verificationToken: user.verficationToken,
    //     origin
    // });

    // Send verification token back only while testing in postman!!
    res.status(StatusCodes.CREATED).json({
        message: "Success! Please check your email to verify account",
        verificationToken: user.verificationToken
    });
};

const verifyEmail = async (req, res) => {
    const {verificationToken, email} = req.body;
    const user = await User.findOne({email});

    if (!user) throw new CustomError.UnauthenticatedError("Verification Failed");
    if (user.verificationToken !== verificationToken) throw new CustomError.UnauthenticatedError("Verification Failed");

    user.isVerified = true;
    user.verified = Date.now();
    user.verificationToken = ''; // the second request won't work anymore
    await user.save();

    res.status(StatusCodes.OK).json({message: "Email Verified."});
};

const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) throw new CustomError.BadRequestError('Please provide email and password');

    const user = await User.findOne({email});

    if (!user) throw new CustomError.UnauthenticatedError('Invalid Credentials');
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) throw new CustomError.UnauthenticatedError('Invalid Credentials');
    if (!user.isVerified) throw new CustomError.UnauthenticatedError('Please verify your email');
    const tokenUser = createTokenUser(user);

    // create refresh token
    let refreshToken = '';
    // check for existing token
    const existingToken = await Token.findOne({user: user._id});

    if (existingToken) {
        const {isValid} = existingToken;
        if (!isValid) {
            throw new CustomError.UnauthenticatedError('Invalid Credentials');
        }
        refreshToken = existingToken.refreshToken;
        attachCookiesToResponse({res, user: tokenUser, refreshToken});
        res.status(StatusCodes.OK).json({user: tokenUser});
        return;
    }

    refreshToken = crypto.randomBytes(40).toString('hex');
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;
    const userToken = {refreshToken, ip, userAgent, user: user._id};

    await Token.create(userToken);

    attachCookiesToResponse({res, user: tokenUser, refreshToken});

    res.status(StatusCodes.OK).json({user: tokenUser});
};

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });
    res.status(StatusCodes.OK).json({msg: 'user logged out!'});
};

module.exports = {
    register,
    login,
    logout,
    verifyEmail
};
