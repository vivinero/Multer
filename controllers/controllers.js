const userModel = require("../models/models");
const fs = require("fs")

exports.signUp = async (req, res)=> {
    try {
        const {fullName, stack, profilePicture}= req.body;
        const file = req.file.filename

        const profile = await userModel.create({fullName, stack, profilePicture: file})
        if (!profile) {
            return res.status(400).json({
                message: `unable to signup`
            })
        }
        return res.json({
            message: `successfully signedup`,
            profile
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getOne = async (req, res) => {
    try {
        const id = req.params.id
        const profile = await userModel.findById(id)
        if (!profile) {
            return res.status(404).json({
                message: `unable to get user`
            })
        }
        return res.status(200).json({
            message: `successfully gotten one student`,
            profile
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getAll = async (req, res)=> {
    try {
        const profile = await userModel.find()
        if (profile.length === 0) {
            return res.status(200).json({
                message: `Users not found`
            })
        }
        return res.status(200).json({
            status: "Success",
            message: `These are the users`,
            data: profile

        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateUser = async (req, res)=> {
    try {
        const id = req.params.id
        const{ fullName, stack }= req.body

        const profile = await userModel.findById(id);
        if (!profile) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found"
            })
        }
        //check the instance of what the user is updating
        const data = {
            fullName: fullName || profile.fullName,
            stack: stack || profile.stack,
            profile: profile.profilePicture
        }

        //create the variable to hold the path of the image
        const oldPath = `./uploads/${profile.profilePicture}`

        //check if the user is passing a new image
        if (req.file) {
            //check if there is an image in the path

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath)
            }

            data.profilePicture = req.file.filename
        }
        const newProfile = await userModel.findByIdAndUpdate(id, data, {new: true})

        if (newProfile) {
            return res.status(200).json({
                status: "success",
                message: "Profile updated successfully",
                newProfile
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteUser = async (req, res)=>{
    try {
        const id = req.params.id
        const profile = await userModel.findById(id)

        const oldPath = `./uploads/${profile.profilePicture}`
        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath)
        }


        const user = await userModel.findByIdAndDelete(id)
        if (!user) {
            return res.status(400).json({
                message: `unable to delete user`
            })
        }
        return res.status(200).json({
            message: `Deleted successfully`
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}