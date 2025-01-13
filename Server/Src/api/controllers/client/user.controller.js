const Users = require("../../models/user")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const generalOtp = require('../../../helper/generateRandom');
const ForgotPassword = require("../../models/fogot-password");
const sendMailHelper = require('../../../helper/sendEmail')
const verifyEmail = require("../../models/verify-email");


// [POST] api/user/register
module.exports.register = async (req, res) => {
    try {
        const { email } = req.body;
        const emailExits = await Users.findOne({
            email: email,
            deleted: false
        })

        if (emailExits) {
            res.status(409).json({ message: "Email is Exits" })
        } else {
            req.body.password = md5(req.body.password)
            const user = new Users(req.body)
            await user.save();
            res.status(201).json({
                message: "Register successfully",
                userId: user.id
            })
            const otp = generalOtp.generateOtp(6);
            const objVrtify = {
                email: email,
                otp: otp,
                "expireAt": Date.now()
            }
            const vertifyEmail = new VertifyEmail(objVrtify);
            await vertifyEmail.save();

            const subject = "Your One-Time Password (OTP) for Account Verification";
            const html = `
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        line-height: 1.6;
                                        color: #333;
                                        background-color: #f9f9f9;
                                        padding: 20px;
                                    }
                                    .email-container {
                                        max-width: 600px;
                                        margin: 0 auto;
                                        background: #ffffff;
                                        border: 1px solid #ddd;
                                        border-radius: 8px;
                                        overflow: hidden;
                                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                    }
                                    .email-header {
                                        background: #4caf50;
                                        color: #ffffff;
                                        text-align: center;
                                        padding: 20px;
                                        font-size: 24px;
                                    }
                                    .email-body {
                                        padding: 20px;
                                        text-align: left;
                                    }
                                    .email-body h3 {
                                        color: #4caf50;
                                    }
                                    .email-footer {
                                        text-align: center;
                                        padding: 10px;
                                        background: #f1f1f1;
                                        color: #555;
                                        font-size: 12px;
                                    }
                                    .otp {
                                        font-size: 24px;
                                        font-weight: bold;
                                        color: #333;
                                        background: #f4f4f4;
                                        padding: 10px;
                                        border-radius: 8px;
                                        display: inline-block;
                                        margin: 10px 0;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="email-container">
                                    <div class="email-header">
                                        Account Verification
                                    </div>
                                    <div class="email-body">
                                        <p>Dear User,</p>
                                        <p>To complete the verification process for your account, please use the following One-Time Password (OTP):</p>
                                        <h3 class="otp">${otp}</h3>
                                        <p>This OTP is valid for the next <strong>3 minutes</strong>. For your security, please do not share this OTP with anyone.</p>
                                        <p>If you did not request this, please ignore this email or contact our support team immediately.</p>
                                        <p>Thank you,<br>The BoBeoFood Team</p>
                                    </div>
                                    <div class="email-footer">
                                        © 2025 BoBeoFood. All rights reserved.
                                    </div>
                                </div>
                            </body>
                            </html>
                            `;
            sendEmail.sendEmail(email, subject, html)
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

// [POST] api/user/login
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({
            email: email,
            status: "active",
        })

        if (!user) {
            res.json({
                code: 402,
                message: "The email address you entered does not exist."
            })
        } else {
            if (user.status !== "active") {
                res.json({
                    code: 402,
                    message: "Your account has been deactivated."
                })
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                res.json({
                    code: 402,
                    message: "The password not correct."
                })
            } else {
                res.cookie('token', user.token)
                res.json({
                    code: 200,
                    token: user.token,
                    id: user.id,
                    message: "Login Successful."
                })
            }
        }

    } catch (error) {
        console.log(error);
    }
}
// [POST] api/forgot-password
module.exports.forgot = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Users.findOne({
            email: email,
            status: "active"
        })
        if (!user) {
            return res.status(401).json({
                message: "Email Not Exits"
            })
        }
        res.status(200).json({ email, message: "Email is correct" })
        const otp = generalOtp.generateOtp(6);
        const objVrtify = {
            email: email,
            otp: otp,
            "expireAt": Date.now()
        }
        const vertifyEmail = new VertifyEmail(objVrtify);
        await vertifyEmail.save();
        const subject = "Your One-Time Password (OTP) for Account Verification";
        const html = `
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        line-height: 1.6;
                                        color: #333;
                                        background-color: #f9f9f9;
                                        padding: 20px;
                                    }
                                    .email-container {
                                        max-width: 600px;
                                        margin: 0 auto;
                                        background: #ffffff;
                                        border: 1px solid #ddd;
                                        border-radius: 8px;
                                        overflow: hidden;
                                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                    }
                                    .email-header {
                                        background: #4caf50;
                                        color: #ffffff;
                                        text-align: center;
                                        padding: 20px;
                                        font-size: 24px;
                                    }
                                    .email-body {
                                        padding: 20px;
                                        text-align: left;
                                    }
                                    .email-body h3 {
                                        color: #4caf50;
                                    }
                                    .email-footer {
                                        text-align: center;
                                        padding: 10px;
                                        background: #f1f1f1;
                                        color: #555;
                                        font-size: 12px;
                                    }
                                    .otp {
                                        font-size: 24px;
                                        font-weight: bold;
                                        color: #333;
                                        background: #f4f4f4;
                                        padding: 10px;
                                        border-radius: 8px;
                                        display: inline-block;
                                        margin: 10px 0;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="email-container">
                                    <div class="email-header">
                                        Account Verification
                                    </div>
                                    <div class="email-body">
                                        <p>Dear User,</p>
                                        <p>To complete the verification process for your account, please use the following One-Time Password (OTP):</p>
                                        <h3 class="otp">${otp}</h3>
                                        <p>This OTP is valid for the next <strong>3 minutes</strong>. For your security, please do not share this OTP with anyone.</p>
                                        <p>If you did not request this, please ignore this email or contact our support team immediately.</p>
                                        <p>Thank you,<br>The BoBeoFood Team</p>
                                    </div>
                                    <div class="email-footer">
                                        © 2025 BoBeoFood. All rights reserved.
                                    </div>
                                </div>
                            </body>
                            </html>
                    `;
        sendEmail.sendEmail(email, subject, html)
    } catch (error) {
        res.status(500).json(error)
    }
}


//['POST']api/user/verify
module.exports.vertifyEmail = async (req, res) => {
    try {
        const { otp, userId } = req.body;
        const optCorrect = await VertifyEmail.findOne({
            otp: otp
        })
        if (!optCorrect) {
            return res.status(400).json({ message: "OTP Not Correct" })
        }
        await Users.updateOne({
            _id: userId
        }, {
            status: "active"
        })
        res.status(201).json({
            message: "Vertify Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports.verifyToken = async (req, res) => {
    try {
        const { token } = req.params;

        // Giải mã token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;

        const user = await Users.findOne({ email });
        if (!user) {
            return res.json({
                code: 404,
                message: "User not found.",
            });
        }

        // Cập nhật trạng thái người dùng
        await Users.updateOne({ email }, { status: "active" });

        res.json({
            code: 200,
            message: "Email verified successfully.",
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            code: 400,
            message: "Invalid or expired token.",
        });
    }
};



// [POST] api/user/otp
module.exports.otp = async (req, res) => {
    try {
        const { otp, email } = req.body;
        const otpExits = await VertifyEmail.findOne({
            email: email,
            otp: otp
        })
        if (!otpExits) {
            return res.status(400).json({ message: "OTP Not Correct" })
        }
        const user = await Users.findOne({
            email: email
        })
        if (!user) {
            return res.status(401).json({ message: "Email Not Correct" })
        }
        res.status(200).json({
            token: user.token,
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// [POST] api/user/reset-password
module.exports.reset = async (req, res) => {
    const token = req.body.token;
    const newPassword = md5(req.body.password);
    if (!token) {
        return res.status(401).json({
            message: "User Not Found"
        })
    }
    await Users.updateOne({ token: token }, { password: newPassword })
    res.status(200).json({
        message: "Reset Password Successfully"
    })
}


// api/user/user-profile
module.exports.profile = async (req, res) => {
    try {
        const authHeader = req.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        if (token) {
            const user = await Users.findOne({
                token: token
            })
            if (user) {
                res.json({
                    code: 200,
                    user: user
                })
            }
        } else {
            res.json({
                code: 403,
                message: "Token Found"
            })
        }
    } catch (error) {
        console.log(error)
    }
}
// api/user/edit-profile
module.exports.editProfile = async (req, res) => {
    try {
        const authHeader = req.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        const userName = req.body.userName;
        if (token) {
            const user = await Users.updateOne({
                token: token
            }, { userName: userName })
            res.json({
                code: 200,
                message: "Update Successfull."
            })
        }
    } catch (error) {
        console.log(error)
    }
}