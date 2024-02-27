const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");

const createBrand = asyncHandler(async (req, res) => {
  const response = await Brand.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdBrand: response ? response : "Cannot create brand",
  });
});

const getBrand = asyncHandler(async (req, res) => {
  const response = await Brand.find();
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : "Cannot get brand",
  });
});

const updateBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Brand.findByIdAndUpdate(bid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updateBrand: response ? response : "Cannot update brand",
  });
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Brand.findByIdAndDelete(bid);
  return res.status(200).json({
    success: response ? true : false,
    deleteBrand: response ? response : "Cannot delete brand",
  });
});
module.exports = {
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};
