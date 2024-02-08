const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const verifyToken = require("../VerifyToken");
const router = express.Router();


//create
router.post("/create", verifyToken,async (req, res) => {
    try {
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    }
    catch (err) {
        res.status(500).json(err)
    }
})


//update
router.put("/:id",verifyToken, async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedComment)
    }
    catch (err) {
        res.status(500).json(err)
    }
})


//delete
router.delete("/:id", verifyToken,async (req, res, next) => {
    try {
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json("Comment has been deleted successfully")
    } catch (err) {
        res.status(500).json(err)
    }
})




//get post comment

router.get("/post/:postId", async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId })
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router