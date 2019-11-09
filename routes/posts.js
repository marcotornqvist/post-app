const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Post = require("../models/Post");
const User = require("../models/User");

// @route   GET api/posts
// @desc    Get 10 of the latest posts
// @access  Public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({
        date: -1
      })
      .limit(10);
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

    if (!post) return res.status(404).json({ msg: "Post not found" });

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/posts
// @desc    Add new post
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id).select("username");

    const { title, text } = req.body;

    try {
      const newPost = new Post({
        title,
        text,
        user: req.user.id,
        username: user.username
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/posts/:id
// @desc    Update post
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { title, text } = req.body;

  // Build post object
  const postFields = {};
  if (title) postFields.title = title;
  if (text) postFields.text = text;

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

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    // Get remove index
    const removeIndex = post.dislikes
      .map(dislike => dislike.user.toString())
      .indexOf(req.user.id);

    post.dislikes.splice(removeIndex, 1);

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/dislike/:id
// @desc     Dislike a post
// @access   Private
router.put("/dislike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been disliked
    if (
      post.dislikes.filter(dislike => dislike.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Post already disliked" });
    }

    post.dislikes.unshift({ user: req.user.id });

    // Get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.dislikes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    REMOVE api/posts/like/:id/:like_user
// @desc     Remove like
// @access   Private
router.delete("/like/:id/:like_user", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out like
    const like = post.likes.find(
      like => like.user.toString() === req.params.like_user
    );

    // Make sure like exists
    if (!like) {
      return res.status(404).json({ msg: "Like does not exist" });
    }

    // Check user
    if (like.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = post.likes
      .map(like => like.id)
      .indexOf(req.params.like_user);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    REMOVE api/posts/dislike/:id/:dislike_user
// @desc     Remove dislike
// @access   Private
router.delete("/dislike/:id/:dislike_user", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out dislike
    const dislike = post.dislikes.find(
      dislike => dislike.user.toString() === req.params.dislike_user
    );

    // Make sure dislike exists
    if (!dislike) {
      return res.status(404).json({ msg: "Dislike does not exist" });
    }

    // Check user
    if (dislike.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = post.dislikes
      .map(dislike => dislike.user.toString())
      .indexOf(req.params.dislike_user);

    post.dislikes.splice(removeIndex, 1);

    await post.save();

    res.json(post.dislikes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        user: req.user.id,
        text: req.body.text,
        username: user.username
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = post.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
