const express = require('express');

const practice = require('../models/practice.model');

const authMiddleware = require('../middleware/practice.middleware');

const router = express.Router();

router.post('/create/post', authMiddleware, async (req, res) => {
    try {
        const { Category, Title, Role, Community, Benifits, Verified, Region, Source, Description} = req.body;

        const newPost = new practice({
            Category,
            Title,
            Role,
            Community,
            Benifits,
            Verified,
            Region,
            Source,
            Description,
            CreatedBy: req.user.id
        })
        await newPost.save();
        return res.status(201).json({ message: "Post created successfully!!!", post: newPost });
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message })
    }
});
router.get('/get-post', async (req, res) => {
    try {
        const postList = await practice.find();
        return res.status(200).json({ message: "Post list fetched successfully ", postList });
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message })

    }

});
router.get('/get-post/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await practice.findOne({ _id: postId });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

    
        return res.status(200).json({ message: "Post fetched successfully ", post });
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message })
    }
});
router.patch('/update-post/:id', authMiddleware, async (req, res) => {
    try {
        const updatedPost = await practice.findOneAndUpdate({_id : req.params.id, CreatedBy:req.user.id}, req.body, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ message: "Not authorized or Post not found" });
        }


        return res.status(200).json({ message: "Post updated successfully", updatedPost });
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }

});

router.delete('/delete-post/:id', authMiddleware, async (req, res) => {
    try {

        const deletedPost = await practice.findOneAndDelete({_id :req.params.id, CreatedBy:req.user.id});

        if (!deletedPost) {
            return res.status(404).json({ message: "Not authorized or Post not found" });
        }


        return res.status(200).json({ message: "Post deleted successfully", deletedPost });
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
});



module.exports = router;
