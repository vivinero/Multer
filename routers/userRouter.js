const express = require("express");
const router = express.Router();
const { signUp, getOne, getAll, updateUser, deleteUser }= require("../controllers/controllers");
const upload = require("../utils/multer");


router.post("/signup", upload.single('profilePicture'), signUp)
router.get("/getone/:id" , getOne)
router.get("/getall" , getAll)
router.patch("/updateuser/:id", upload.single('profilePicture'), updateUser)
router.delete("/delete/:id", deleteUser)


module.exports = router