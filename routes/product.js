const router = require("express").Router();
const ctrls = require("../controllers/product");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const fileUploader = require("../configs/uploadImage");

router.post("/", verifyAccessToken, isAdmin, ctrls.createProduct);
router.get("/", ctrls.getAllProduct);
router.put("/ratings", verifyAccessToken, ctrls.ratings);
router.put("/:pid", verifyAccessToken, isAdmin, ctrls.updateProduct);
router.put("/upload-image/:pid", verifyAccessToken, isAdmin,fileUploader.single('images'), ctrls.uploadImages);
router.get("/:pid", ctrls.getProduct);
router.delete("/:pid", ctrls.deleteProduct);

module.exports = router;
