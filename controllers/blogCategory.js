const BlogCategory = require("../models/blogCategory");
const asyncHandler = require("express-async-handler");

const createBlogCategory = asyncHandler(async (req, res) => {
  const response = await BlogCategory.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdBlogCategory: response ? response : "Cannot create new category",
  });
});

const getBlogCategory = asyncHandler(async (req, res) => {
  const response = await BlogCategory.find().select("title _id");
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : "Cannot get category",
  });
});

const updateBlogCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updateBlogCategory: response ? response : "Cannot update category",
  });
});

const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await BlogCategory.findByIdAndDelete(bcid);
  return res.status(200).json({
    success: response ? true : false,
    deleteBlogCategory: response ? response : "Cannot delete category",
  });
});
module.exports = {
  createBlogCategory,
  getBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
