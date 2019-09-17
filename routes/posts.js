const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Post = require("../models/Post");

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({
      date: -1
    });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/:id
// @desc    Get a single post
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/posts/:id
// @desc    Update post
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { title, body } = req.body;

  // Build post object
  const postFields = {};
  if (title) postFields.title = title;
  if (body) postFields.body = body;

  try {
    let post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "Post not found" });

    // Make sure user owns post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: postFields },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "Post not found" });

    // Make sure user owns post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Post.findByIdAndRemove(req.params.id);

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
