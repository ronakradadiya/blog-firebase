const { Router } = require('express')
const router = Router();
const {getBlogById, createBlog, updateBlogById, deleteBlogById} = require("../controller")

router.get("/:id", getBlogById)
router.post("/", createBlog)
router.put("/:id", updateBlogById)
router.delete("/:id", deleteBlogById)

module.exports = router