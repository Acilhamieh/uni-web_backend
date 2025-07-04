import express from "express";
import { handleGetAllNews ,handleAddNews} from "../controllers/newsController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// GET all news
router.get("/", handleGetAllNews);
// POST add news with image upload
router.post("/", upload.single("image"), handleAddNews);

export default router;
