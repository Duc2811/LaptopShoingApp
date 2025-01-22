const { model } = require('mongoose')
const User = require('../../models/user')

//[GET]/api/admin/getAllUser
module.exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

//[PUT]/api/admin/changeRole/:id
module.exports.changeRoleById = async (req, res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }

        const admin = await User.findOne({ token: token })
        if (!admin || admin.role !== 'admin') {
            return res.status(401).json({ message: 'User not authorized to change role or User not found!!!' });
        }


        const { id } = req.params
        const { newRole } = req.body
        const newUser = await User.findByIdAndUpdate(id, { role: newRole }, { new: true })
        await newUser.save()
        res.status(200).json({ code: 200, message: 'Role changed successfully', user })
    } catch (error) {
        res.status(500).json(error)
    }
}

//[PUT]/api/admin/changeStatus/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid!' });
        }

        const admin = await User.findOne({ token: token })
        if (!admin || admin.role !== 'admin') {
            return res.status(401).json({ message: 'User not authorized to change status or User not found!!!' });
        }
        const { id } = req.params
        const { status } = req.body
        const user = await User.findByIdAndUpdate(id, { status: status }, { new: true })
        await user.save()
        res.status(200).json({ code: 200, message: 'Status changed successfully', user })
    } catch (error) {
        res.status(500).json({ code: 500, message: error.message })
    }
}
