const Blog = require("../models/blog.model.js");

exports.Blog = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const { title, description } = req.body;
  if (!title || !description)
    return res.status(404).send("write the title and description");

  try {
    req.body.image = file.filename;
    const BlogAdd = await Blog.create(req.body);
    res.status(200).send(BlogAdd);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
exports.getBlog = async (req, res) => {
  try {
    const BlogList = await Blog.find({});
    return res.status(200).json({ BlogList });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
exports.BlogTitle = async (req, res) => {
  try {
    const title = req.params.title;
    const BlogList = await Blog.find({ title });
    return res.status(200).json({ BlogList });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
