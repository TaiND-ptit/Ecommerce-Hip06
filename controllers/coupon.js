const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expiry } = req.body;
  if (!name || !discount || !expiry) throw new Error("Missing inputs");
  const response = await Coupon.create({
    ...req.body,
    expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    success: response ? true : false,
    createdCoupon: response ? response : "Cannot create new coupon",
  });
});

const getCoupon = asyncHandler(async (req, res) => {
  const response = await Coupon.find().select("-createdAt -updatedAt");
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : "Cannot get coupon",
  });
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await Coupon.findByIdAndUpdate(
    cid,
    {
      ...req.body,
      expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
    },
    {
      new: true,
    }
  );
  return res.status(200).json({
    success: response ? true : false,
    updateCoupon: response ? response : "Cannot update coupon",
  });
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await Coupon.findByIdAndDelete(cid);
  return res.status(200).json({
    success: response ? true : false,
    deleteCoupon: response ? response : "Cannot delete coupon",
  });
});
module.exports = {
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};
