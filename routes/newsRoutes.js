import express from "express";
import { handleGetAllNews } from "../controllers/newsController.js";

const router = express.Router();

// GET all news
router.get("/", handleGetAllNews);

export default router;
