module.exports.registerValidate = async (req, res, next) => {
    if (!req.body.email) {
        res.json({
            code: 402,
            message: "Email must not be empty."
        })
        return;
    }
    if (!req.body.userName) {
        res.json({
            code: 402,
            message: "Email must not be empty."
        })
        return;
    }
    if (!req.body.password) {
        res.json({
            code: 402,
            message: "Email must not be empty."
        })
        return;
    }
    if (!req.body.phone && req.body.phone.length > 0 && req.body.phone.length < 11) {
        res.json({
            code: 402,
            message: "Phone must not be empty."
        })
        return;
    }
    if (!req.body.address) {
        res.json({
            code: 402,
            message: "Address must not be empty."
        })
        return;
    }

    next();
}
module.exports.loginValidate = async (req, res, next) => {
    if (!req.body.email) {
        res.json({
            code: 402,
            message: "Email must not be empty."
        })
        return;
    }
    if (!req.body.password) {
        res.json({
            code: 402,
            message: "Password must not be empty."
        })
        return;
    }
    next();
}

module.exports.resetPasswordValidate = async (req, res, next) => {
    if (!req.body.password) {
        res.json({
            code: 402,
            message: "Password must not be empty."
        })
        return;
    }
    if (!req.body.confirmPassword) {
        res.json({
            code: 402,
            message: "Confirm Password must not be empty."
        })
        return;
    }
    if (req.body.confirmPassword !== req.body.password) {
        res.json({
            code: 402,
            message: "Confirm Password Not Match With Password"
        })
        return;
    }
    next();
}