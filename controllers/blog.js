const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");

const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) throw new Error("Missing inputs");
  const response = await Blog.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdBlog: response ? response : "Cannot create new blog",
  });
});

const getBlogs = asyncHandler(async (req, res) => {
  const response = await Blog.find();
  return res.status(200).json({
    success: response ? true : false,
    dataBlogs: response ? response : "Cannot get category",
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await Blog.findByIdAndUpdate(bid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updateBlog: response ? response : "Cannot update blog",
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Blog.findByIdAndDelete(bid);
  return res.status(200).json({
    success: response ? true : false,
    deleteBlog: response ? response : "Cannot delete category",
  });
});

/* Khi người dùng like 1 bào blog thì:
 1. Check xem người đó trc đó có dislike hay không => bỏ dislike
 2. Check xem người đó trc đó có like hay không => bỏ like / thêm like
*/

const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Missing inputs");
  const blog = await Blog.findById(bid);
  const alreadyDisliked = blog?.disLikes?.find((el) => el.toString() === _id);
  if (alreadyDisliked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { disLikes: _id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      data: response,
    });
  }
  const isLiked = blog?.likes?.find((el) => el.toString() === _id);
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { likes: _id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      data: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $push: { likes: _id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      data: response,
    });
  }
});

const dislikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Missing inputs");
  const blog = await Blog.findById(bid);
  const alreadyLiked = blog?.likes?.find((el) => el.toString() === _id);
  if (alreadyLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { likes: _id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      data: response,
    });
  }
  const isDisLiked = blog?.disLikes?.find((el) => el.toString() === _id);
  if (isDisLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { disLikes: _id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      data: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $push: { disLikes: _id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      data: response,
    });
  }
});
const excludedFields = "-refreshToken -password -role -createdAt -updatedAt";
const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numberViews: 1} }, {new: true})
    .populate("likes", excludedFields)
    .populate("disLikes", excludedFields);
  return res.status(200).json({
    success: blog ? true : false,
    data: blog,
  });
});

module.exports = {
  createBlog,
  getBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
};
