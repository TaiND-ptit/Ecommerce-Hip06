const router = require("express").Router();
const ctrls = require("../controllers/blog");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/", ctrls.getBlogs);
router.get("/:bid", ctrls.getBlog);
router.post("/", verifyAccessToken, isAdmin, ctrls.createBlog);
router.put("/:bid", verifyAccessToken, isAdmin, ctrls.updateBlog);
router.delete("/:bid", verifyAccessToken, isAdmin, ctrls.deleteBlog);
router.put("/like/:bid", verifyAccessToken, ctrls.likeBlog);
router.put("/dislike/:bid", verifyAccessToken, ctrls.dislikeBlog);

module.exports = router;
