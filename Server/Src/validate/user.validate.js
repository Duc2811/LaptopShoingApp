const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return passwordRegex.test(password);
};

const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
};

module.exports.registerValidate = async (req, res, next) => {
    if (!req.body.email) {
        res.json({
            code: 402,
            message: "Email must not be empty."
        });
        return;
    }
    if (!req.body.userName) {
        res.json({
            code: 402,
            message: "Username must not be empty."
        });
        return;
    }
    if (!req.body.password || !validatePassword(req.body.password)) {
        res.json({
            code: 402,
            message: "Password must be at least 8 characters long, include letters, numbers, and at least one special character."
        });
        return;
    }
    if (!req.body.phone || !validatePhone(req.body.phone)) {
        res.json({
            code: 402,
            message: "Phone must be exactly 10 digits."
        });
        return;
    }
    if (!req.body.address) {
        res.json({
            code: 402,
            message: "Address must not be empty."
        });
        return;
    }

    next();
};

module.exports.loginValidate = async (req, res, next) => {
    if (!req.body.email) {
        res.json({
            code: 402,
            message: "Email must not be empty."
        });
        return;
    }
    if (!req.body.password || !validatePassword(req.body.password)) {
        res.json({
            code: 402,
            message: "Password must be at least 8 characters long, include letters, numbers, and at least one special character."
        });
        return;
    }
    next();
};

module.exports.resetPasswordValidate = async (req, res, next) => {
    if (!req.body.password || !validatePassword(req.body.password)) {
        res.json({
            code: 402,
            message: "Password must be at least 8 characters long, include letters, numbers, and at least one special character."
        });
        return;
    }
    if (!req.body.confirmPassword) {
        res.json({
            code: 402,
            message: "Confirm Password must not be empty."
        });
        return;
    }
    if (req.body.confirmPassword !== req.body.password) {
        res.json({
            code: 402,
            message: "Confirm Password does not match the Password."
        });
        return;
    }
    next();
};
