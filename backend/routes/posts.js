const express= require("express");

const checkAuth= require('../middleware/check-auth');
const PostController= require('../controllers/posts');
const extractFile= require('../middleware/file');
const router= express.Router();




router.post("", checkAuth, extractFile , PostController.createPost );

router.get("" , PostController.getPosts);

router.get("/:id" , PostController.getPost);

router.put("/:id", checkAuth, extractFile, PostController.updatePost );

router.delete("/:id", checkAuth, PostController.deletePost );
	
	

module.exports= router;