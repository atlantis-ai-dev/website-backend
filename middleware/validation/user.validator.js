const { check, validationResult } = require('express-validator');
const { createResponse } = require('../../utils/responseHandler');

const validateUserRegistration = [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 1 }).withMessage('Password must be at least 1 characters long'),
    check('username').isLength({ min: 1 }).withMessage('Username must be at least 1 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(createResponse(false, "Missing required fields", errors.array()));
        }
        next();
    }
];

const validateUserLogin = [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 1 }).withMessage('Password must be at least 1 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(createResponse(false, "Missing required fields", errors.array()));
        }
        next();
    }
];

module.exports = { validateUserRegistration, validateUserLogin };